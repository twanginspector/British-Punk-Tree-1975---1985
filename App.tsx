
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  Search, Info, X, Music, User, Loader2, RefreshCcw, Youtube, 
  PlayCircle, ExternalLink, Filter, Calendar, Camera, 
  Image as ImageIcon, Disc, Globe, MapPin, Wand2, 
  Upload, Mic, FileVideo, FileAudio, CheckCircle2,
  ChevronDown, ChevronUp, Camera as CameraIcon
} from 'lucide-react';
import { PunkNode, PunkData } from './types';
import { INITIAL_PUNK_DATA } from './constants';
import GraphView from './components/GraphView';
import { 
  getEnrichedPunkData, getMediaLinks, getPhotos, getDiscography, 
  generatePunkPoster, analyzeMedia, transcribeMicrophone,
  MediaLink, DiscographyItem 
} from './services/geminiService';

const ASPECT_RATIOS = ["1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9"];

const parseYears = (yearStr: string | undefined): [number, number] => {
  if (!yearStr) return [1970, 2025];
  const currentYear = new Date().getFullYear();
  const normalized = yearStr.replace('–', '-').replace('—', '-');
  const parts = normalized.split('-').map(p => p.trim());
  let start = parseInt(parts[0]);
  let end = start;
  if (parts.length > 1) {
    const endStr = parts[1].toLowerCase();
    if (endStr.includes('heden') || endStr.includes('present') || endStr.includes('now')) {
      end = currentYear;
    } else {
      const parsedEnd = parseInt(parts[1]);
      end = isNaN(parsedEnd) ? start : parsedEnd;
    }
  }
  return [isNaN(start) ? 1970 : start, end];
};

const App: React.FC = () => {
  const [data, setData] = useState<PunkData>(INITIAL_PUNK_DATA);
  const [selectedNode, setSelectedNode] = useState<PunkNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [mediaLinks, setMediaLinks] = useState<MediaLink[]>([]);
  const [isSearchingMedia, setIsSearchingMedia] = useState(false);
  const [isMediaExpanded, setIsMediaExpanded] = useState(true);
  const [photoLinks, setPhotoLinks] = useState<MediaLink[]>([]);
  const [isSearchingPhotos, setIsSearchingPhotos] = useState(false);
  const [isPhotosExpanded, setIsPhotosExpanded] = useState(true);
  const [discoLinks, setDiscoLinks] = useState<DiscographyItem[]>([]);
  const [isSearchingDisco, setIsSearchingDisco] = useState(false);
  const [isDiscoExpanded, setIsDiscoExpanded] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [yearRange, setYearRange] = useState<[number, number]>([1975, 1985]);

  // AI Lab States
  const [genPrompt, setGenPrompt] = useState('');
  const [genAspectRatio, setGenAspectRatio] = useState('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const checkProKey = async () => {
    if (!(window as any).aistudio?.hasSelectedApiKey()) {
      await (window as any).aistudio?.openSelectKey();
    }
  };

  const filteredData = useMemo(() => {
    const [fStart, fEnd] = yearRange;
    const nodes = data.nodes.filter(node => {
      const [nStart, nEnd] = parseYears(node.activeYears);
      return nStart <= fEnd && nEnd >= fStart;
    });
    const nodeIds = new Set(nodes.map(n => n.id));
    const links = data.links.filter(link => {
      const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id;
      const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id;
      return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });
    return { nodes, links };
  }, [data, yearRange]);

  const handleFetchMedia = async (name: string) => {
    setIsSearchingMedia(true);
    try {
      const results = await getMediaLinks(name);
      setMediaLinks(results);
    } catch (err) {
      console.error("Media Fetch Error:", err);
    }
    setIsSearchingMedia(false);
  };

  const handleFetchPhotos = async (name: string) => {
    setIsSearchingPhotos(true);
    try {
      const results = await getPhotos(name);
      setPhotoLinks(results);
    } catch (err) {
      console.error("Photos Fetch Error:", err);
    }
    setIsSearchingPhotos(false);
  };

  const handleFetchDisco = async (name: string) => {
    setIsSearchingDisco(true);
    try {
      const results = await getDiscography(name);
      setDiscoLinks(results);
    } catch (err) {
      console.error("Disco Fetch Error:", err);
      setError("Failed to fetch discography.");
    }
    setIsSearchingDisco(false);
  };

  const handleNodeClick = useCallback((node: PunkNode) => {
    setSelectedNode(node);
    setShowFilterPanel(false);
    setMediaLinks([]);
    setPhotoLinks([]);
    setDiscoLinks([]);
    setIsDiscoExpanded(true);
    setIsPhotosExpanded(true);
    setIsMediaExpanded(true);

    // Fetch dynamic archival content automatically for bands and persons
    handleFetchMedia(node.name);
    handleFetchPhotos(node.name);
    handleFetchDisco(node.name);
  }, []);

  const handleGenerate = async () => {
    if (!genPrompt) return;
    await checkProKey();
    setIsGenerating(true);
    const img = await generatePunkPoster(genPrompt, genAspectRatio);
    setGeneratedImage(img);
    setIsGenerating(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeMedia(file, "Analyze this media item (photo, video, or audio) in the context of British Punk history. What does it show or sound like? Describe the style and significance.");
      setAnalysisResult(result);
    } catch (err) {
      setError("Analysis failed.");
    }
    setIsAnalyzing(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = (reader.result as string).split(',')[1];
          setTranscription("Transcribing...");
          const text = await transcribeMicrophone(base64);
          setTranscription(text);
        };
        reader.readAsDataURL(audioBlob);
      };
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      setError("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // Check local data first
    const existing = data.nodes.find(n => n.name.toLowerCase() === searchTerm.toLowerCase());
    
    setIsSearching(true);
    const newData = await getEnrichedPunkData(searchTerm);
    if (newData) {
      setData(prev => ({
        nodes: [...prev.nodes, ...newData.nodes.filter(n => !prev.nodes.some(en => en.id === n.id))],
        links: [...prev.links, ...newData.links]
      }));
      
      const found = newData.nodes.find(n => n.name.toLowerCase().includes(searchTerm.toLowerCase())) || newData.nodes[0];
      if (found) handleNodeClick(found);
    } else if (existing) {
      handleNodeClick(existing);
    }
    setIsSearching(false);
  };

  const getConnections = (nodeId: string) => filteredData.links.filter(l => {
    const s = typeof l.source === 'string' ? l.source : (l.source as any).id;
    const t = typeof l.target === 'string' ? l.target : (l.target as any).id;
    return s === nodeId || t === nodeId;
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-white relative">
      {/* Top Bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 flex gap-2">
        <form onSubmit={handleSearch} className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search band, artist, or movement..."
            className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-none px-5 py-3 pr-12 text-lg focus:border-red-600 focus:outline-none transition-colors typewriter"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
            {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
          </button>
        </form>
        <button onClick={() => setShowFilterPanel(!showFilterPanel)} className={`px-4 py-3 border-2 transition-all font-bold ${showFilterPanel ? 'bg-red-600 border-red-600' : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500'}`}>
          <Filter size={20} />
        </button>
      </div>

      {/* Main Graph */}
      <main className="flex-1 relative">
        <GraphView data={filteredData} selectedId={selectedNode?.id || null} onNodeClick={handleNodeClick} />
        <div className="absolute bottom-6 left-6 z-10">
          <h1 className="punk-font text-5xl md:text-7xl text-red-600 uppercase tracking-tighter opacity-80 leading-none">
            BRITISH PUNK TREE<br/>
            <span className="text-white text-3xl md:text-4xl typewriter">{yearRange[0]} - {yearRange[1]}</span>
          </h1>
        </div>
      </main>

      {/* Detail Sidebar */}
      {(selectedNode || showFilterPanel) && (
        <aside className="absolute top-0 right-0 h-full w-full md:w-96 bg-zinc-950/95 border-l-2 border-red-600 z-30 shadow-2xl transition-transform duration-300 flex flex-col">
          <button onClick={() => { setSelectedNode(null); setShowFilterPanel(false); }} className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-full z-40">
            <X size={24} />
          </button>

          <div className="p-8 h-full overflow-y-auto space-y-12 pb-24">
            {showFilterPanel ? (
              <div className="space-y-8 pt-8">
                <div className="flex items-center gap-2 text-red-600">
                  <Filter size={24} /> <h2 className="punk-font text-4xl uppercase">Timeline Filter</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input type="number" value={yearRange[0]} onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])} className="w-full bg-zinc-900 border border-zinc-700 p-3 typewriter" />
                    <span>TO</span>
                    <input type="number" value={yearRange[1]} onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])} className="w-full bg-zinc-900 border border-zinc-700 p-3 typewriter" />
                  </div>
                </div>

                {/* AI Creation Tool */}
                <div className="space-y-4 pt-8 border-t border-zinc-800">
                   <div className="flex items-center gap-2 text-red-500 uppercase font-bold text-sm tracking-widest"><Wand2 size={18}/> Punk Poster Lab</div>
                   <textarea 
                    value={genPrompt} 
                    onChange={e => setGenPrompt(e.target.value)} 
                    placeholder="Describe a punk poster (e.g. 'The Clash at the Roxy 1977')..."
                    className="w-full h-24 bg-zinc-900 border border-zinc-700 p-2 text-sm typewriter outline-none focus:border-red-600"
                   />
                   <div className="flex flex-wrap gap-1">
                    {ASPECT_RATIOS.map(ar => (
                      <button 
                        key={ar} 
                        onClick={() => setGenAspectRatio(ar)}
                        className={`text-[10px] px-2 py-1 border border-zinc-700 ${genAspectRatio === ar ? 'bg-red-600 border-red-600' : 'bg-zinc-800'}`}
                      >
                        {ar}
                      </button>
                    ))}
                   </div>
                   <button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 font-bold uppercase flex items-center justify-center gap-2"
                   >
                     {isGenerating ? <Loader2 className="animate-spin" size={18} /> : 'Generate Poster'}
                   </button>
                   {generatedImage && (
                    <div className="mt-4 border-2 border-red-600 overflow-hidden">
                      <img src={generatedImage} alt="AI Generated" className="w-full" />
                      <button onClick={() => setGeneratedImage(null)} className="w-full py-1 bg-zinc-800 text-[10px] uppercase">Clear</button>
                    </div>
                   )}
                </div>

                {/* Analysis Lab */}
                <div className="space-y-4 pt-8 border-t border-zinc-800">
                   <div className="flex items-center gap-2 text-red-500 uppercase font-bold text-sm tracking-widest"><ImageIcon size={18}/> Analysis Lab</div>
                   <div className="grid grid-cols-2 gap-2">
                     <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center p-4 bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-all gap-2">
                       <Upload size={20} /> <span className="text-[10px] uppercase font-bold tracking-widest">Media File</span>
                     </button>
                     <button 
                      onClick={isRecording ? stopRecording : startRecording} 
                      className={`flex flex-col items-center justify-center p-4 border transition-all gap-2 ${isRecording ? 'bg-red-900 border-red-600' : 'bg-zinc-900 border-zinc-800 hover:border-red-600'}`}
                     >
                       <Mic size={20} className={isRecording ? 'animate-pulse' : ''} /> 
                       <span className="text-[10px] uppercase font-bold tracking-widest">{isRecording ? 'STOP REC' : 'PUNK MIC'}</span>
                     </button>
                   </div>
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*,audio/*" onChange={handleFileUpload} />
                   
                   {(analysisResult || isAnalyzing || transcription) && (
                    <div className="p-4 bg-zinc-900 border border-zinc-800 text-xs typewriter leading-relaxed">
                      {isAnalyzing ? <div className="flex items-center gap-2"><Loader2 className="animate-spin" size={14}/> Cracking file...</div> : null}
                      {analysisResult && <div><div className="font-bold text-red-500 mb-2 uppercase tracking-widest">Archive Report:</div>{analysisResult}</div>}
                      {transcription && <div className="mt-2 pt-2 border-t border-zinc-800"><div className="font-bold text-red-500 mb-1 uppercase tracking-widest">Transcription:</div>{transcription}</div>}
                      <button onClick={() => { setAnalysisResult(null); setTranscription(null); }} className="mt-4 text-[10px] underline uppercase">Clear</button>
                    </div>
                   )}
                </div>
              </div>
            ) : selectedNode && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="pt-4">
                  <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase mb-2 inline-block">
                    {selectedNode.type}
                  </span>
                  <h2 className="punk-font text-5xl mb-1 text-white leading-tight">{selectedNode.name}</h2>
                  
                  {selectedNode.imageUrl && (
                    <div className="my-4 border-4 border-zinc-800 shadow-xl overflow-hidden relative group bg-zinc-900">
                      <img 
                        src={selectedNode.imageUrl} 
                        alt={selectedNode.name} 
                        className="w-full grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                      <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 text-[8px] uppercase tracking-widest typewriter text-zinc-400">
                        Primary Archive Photo // {selectedNode.activeYears || 'Era Unknown'}
                      </div>
                    </div>
                  )}

                  {selectedNode.websiteUrl && (
                    <a 
                      href={selectedNode.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs transition-all shadow-lg group"
                    >
                      <Globe size={16} /> Official Website / Archive <ExternalLink size={12} className="ml-auto group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>

                <div className="border-l-4 border-red-600 pl-4 py-2 bg-zinc-900/40">
                  <p className="text-zinc-300 leading-relaxed italic typewriter text-sm">{selectedNode.description}</p>
                </div>

                {/* Dynamic Content Sections */}
                <div className="space-y-6">
                  {/* Video Archive Section */}
                  <section className="bg-zinc-900/20 border border-zinc-800/50 rounded-sm">
                    <div 
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/30 transition-colors group"
                      onClick={() => setIsMediaExpanded(!isMediaExpanded)}
                    >
                      <h3 className="uppercase font-bold text-xs tracking-widest text-zinc-400 flex items-center gap-2 group-hover:text-white transition-colors">
                        <FileVideo size={14} className="text-red-500" /> Video Archive
                      </h3>
                      <div className="flex items-center gap-3">
                        {isMediaExpanded ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
                      </div>
                    </div>
                    
                    {isMediaExpanded && (
                      <div className="p-3 pt-0 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        {isSearchingMedia ? (
                          <div className="py-12 flex flex-col items-center justify-center text-zinc-600 gap-3">
                            <Loader2 className="animate-spin text-red-600" size={24} />
                            <span className="text-[10px] uppercase tracking-widest animate-pulse">Retrieving Video Spools...</span>
                          </div>
                        ) : mediaLinks.length > 0 ? (
                          <div className="grid grid-cols-1 gap-3">
                            {mediaLinks.map((item, i) => (
                              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="block p-3 bg-zinc-900/80 hover:bg-red-950/20 transition-all border border-zinc-800 hover:border-red-900 group">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] bg-red-600 px-1 text-white font-bold uppercase">Footage</span>
                                  <ExternalLink size={10} className="text-zinc-600 group-hover:text-white"/>
                                </div>
                                <div className="text-xs typewriter uppercase font-bold text-zinc-100 truncate">{item.title}</div>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="py-4 text-center border-t border-zinc-800/50">
                            <p className="text-[10px] text-zinc-600 italic">No video footage indexed.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </section>

                  {/* Archival Photos Section */}
                  <section className="bg-zinc-900/20 border border-zinc-800/50 rounded-sm">
                    <div 
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/30 transition-colors group"
                      onClick={() => setIsPhotosExpanded(!isPhotosExpanded)}
                    >
                      <h3 className="uppercase font-bold text-xs tracking-widest text-zinc-400 flex items-center gap-2 group-hover:text-white transition-colors">
                        <CameraIcon size={14} className="text-red-500" /> Archival Photos
                      </h3>
                      <div className="flex items-center gap-3">
                        {isPhotosExpanded ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
                      </div>
                    </div>
                    
                    {isPhotosExpanded && (
                      <div className="p-3 pt-0 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        {isSearchingPhotos ? (
                          <div className="py-12 flex flex-col items-center justify-center text-zinc-600 gap-3">
                            <Loader2 className="animate-spin text-red-600" size={24} />
                            <span className="text-[10px] uppercase tracking-widest animate-pulse">Retrieving Negative Files...</span>
                          </div>
                        ) : photoLinks.length > 0 ? (
                          <div className="grid grid-cols-2 gap-3">
                            {photoLinks.map((item, i) => (
                              <a 
                                key={i} 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group relative block p-1 bg-white border border-zinc-300 shadow-md hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                                style={{ transform: `rotate(${i % 2 === 0 ? '-2' : '2'}deg)` }}
                              >
                                <div className="aspect-square bg-zinc-200 overflow-hidden relative">
                                  {item.thumbnail ? (
                                    <img 
                                      src={item.thumbnail} 
                                      alt={item.title} 
                                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                                      onError={(e) => {
                                        (e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-zinc-800"><span class="text-[8px] text-zinc-500 uppercase typewriter p-2 text-center">Image Load Failed</span></div>');
                                      }}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 border border-zinc-800">
                                      <Camera className="text-zinc-700" size={24} />
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="mt-2 text-[8px] typewriter text-black font-bold truncate leading-tight h-4 px-1">
                                  {item.title}
                                </div>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="py-4 text-center border-t border-zinc-800/50">
                            <p className="text-[10px] text-zinc-600 italic">No additional photos found.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </section>

                  {/* Discography Section */}
                  <section className="bg-zinc-900/20 border border-zinc-800/50 rounded-sm">
                    <div 
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/30 transition-colors group"
                      onClick={() => setIsDiscoExpanded(!isDiscoExpanded)}
                    >
                      <h3 className="uppercase font-bold text-xs tracking-widest text-zinc-400 flex items-center gap-2 group-hover:text-white transition-colors">
                        <Disc size={14} className="text-red-500" /> Discography
                      </h3>
                      <div className="flex items-center gap-3">
                        {isDiscoExpanded ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
                      </div>
                    </div>
                    
                    {isDiscoExpanded && (
                      <div className="p-3 pt-0 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        {isSearchingDisco ? (
                          <div className="py-12 flex flex-col items-center justify-center text-zinc-600 gap-3">
                            <Loader2 className="animate-spin text-red-600" size={24} />
                            <span className="text-[10px] uppercase tracking-widest animate-pulse">Scanning Fanzine Archives...</span>
                          </div>
                        ) : discoLinks.length > 0 ? (
                          discoLinks.map((item, i) => (
                            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="block p-3 bg-zinc-900/80 hover:bg-red-950/20 transition-all border border-zinc-800 hover:border-red-900 group">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] bg-red-600 px-1 text-white font-bold">{item.year || 'N/A'}</span>
                                <ExternalLink size={10} className="text-zinc-600 group-hover:text-white"/>
                              </div>
                              <div className="text-xs typewriter uppercase font-bold text-zinc-100">{item.title}</div>
                            </a>
                          ))
                        ) : (
                          <div className="py-4 text-center border-t border-zinc-800/50">
                            <p className="text-[10px] text-zinc-600 italic">No releases indexed.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                </div>

                <div className="pt-8 space-y-4">
                  <h3 className="uppercase font-bold text-xs tracking-widest text-zinc-500 border-b border-zinc-800 pb-2">Family Tree Connections</h3>
                  <div className="space-y-3">
                    {getConnections(selectedNode.id).map((link, idx) => {
                      const sid = typeof link.source === 'string' ? link.source : (link.source as any).id;
                      const tid = typeof link.target === 'string' ? link.target : (link.target as any).id;
                      const other = data.nodes.find(n => n.id === (sid === selectedNode.id ? tid : sid));
                      return other ? (
                        <div key={idx} onClick={() => handleNodeClick(other)} className="group flex items-center gap-4 p-3 bg-zinc-900 border border-zinc-800 hover:border-red-600 cursor-pointer transition-all">
                          <div className="w-10 h-10 flex items-center justify-center bg-zinc-800 group-hover:bg-red-900 transition-colors overflow-hidden">
                            {other.imageUrl ? (
                              <img src={other.imageUrl} alt={other.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                            ) : (
                              other.type === 'band' ? <Music size={18} /> : <User size={18} />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white group-hover:text-red-500 leading-none mb-1">{other.name}</div>
                            {link.role && <div className="text-[10px] text-zinc-500 uppercase typewriter">{link.role}</div>}
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            )}
            
            <button onClick={() => { setData(INITIAL_PUNK_DATA); setSelectedNode(null); setShowFilterPanel(false); }} className="w-full flex items-center justify-center gap-2 text-zinc-600 hover:text-white text-xs transition-colors typewriter py-8">
              <RefreshCcw size={14} /> RESTORE ORIGINAL TREE
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default App;
