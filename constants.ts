
import { PunkData } from './types';

export const INITIAL_PUNK_DATA: PunkData = {
  nodes: [
    // Sex Pistols
    { 
      id: 'sex-pistols', 
      name: 'Sex Pistols', 
      type: 'band', 
      activeYears: '1975–1978', 
      description: 'The band that ignited the punk revolution in the UK.',
      websiteUrl: 'https://en.wikipedia.org/wiki/Sex_Pistols',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Sex_Pistols_1977.jpg'
    },
    { 
      id: 'johnny-rotten', 
      name: 'Johnny Rotten', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/John_Lydon_1977.jpg', 
      description: 'Lead singer of the Sex Pistols and later Public Image Ltd.',
      links: [
        { source: 'johnny-rotten', target: 'sex-pistols', role: 'Vocals' },
        { source: 'johnny-rotten', target: 'pil', role: 'Vocals' }
      ]
    },
    { 
      id: 'steve-jones', 
      name: 'Steve Jones', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Steve_Jones_Sex_Pistols.jpg',
      links: [{ source: 'steve-jones', target: 'sex-pistols', role: 'Guitar' }]
    },
    { 
      id: 'paul-cook', 
      name: 'Paul Cook', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Paul_Cook_1977.jpg',
      links: [{ source: 'paul-cook', target: 'sex-pistols', role: 'Drums' }]
    },
    { 
      id: 'glen-matlock', 
      name: 'Glen Matlock', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Glen_Matlock_Live.jpg',
      links: [{ source: 'glen-matlock', target: 'sex-pistols', role: 'Bass' }]
    },
    { 
      id: 'sid-vicious', 
      name: 'Sid Vicious', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Sid_Vicious_1978.jpg',
      links: [{ source: 'sid-vicious', target: 'sex-pistols', role: 'Bass' }]
    },

    // The Clash
    { 
      id: 'the-clash', 
      name: 'The Clash', 
      type: 'band', 
      activeYears: '1976–1986', 
      description: "Known as 'The Only Band That Matters', they combined punk with reggae, dub, and rockabilly.",
      websiteUrl: 'https://en.wikipedia.org/wiki/The_Clash',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/The_Clash_1980.jpg'
    },
    { 
      id: 'joe-strummer', 
      name: 'Joe Strummer', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Joe_Strummer_1982.jpg',
      links: [{ source: 'joe-strummer', target: 'the-clash', role: 'Vocals' }]
    },
    { 
      id: 'mick-jones', 
      name: 'Mick Jones', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Mick_Jones_1980.jpg',
      links: [{ source: 'mick-jones', target: 'the-clash', role: 'Guitar' }]
    },
    { 
      id: 'paul-simonon', 
      name: 'Paul Simonon', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Paul_Simonon_1980.jpg',
      links: [{ source: 'paul-simonon', target: 'the-clash', role: 'Bass' }]
    },
    { 
      id: 'topper-headon', 
      name: 'Topper Headon', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Topper_Headon_1980.jpg',
      links: [{ source: 'topper-headon', target: 'the-clash', role: 'Drums' }]
    },

    // Public Image Ltd (PiL)
    {
      id: 'pil',
      name: 'Public Image Ltd',
      type: 'band',
      activeYears: '1978–present',
      description: 'The experimental post-punk project formed by John Lydon after the Sex Pistols.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/PIL_1979.jpg'
    },
    { 
      id: 'keith-levene', 
      name: 'Keith Levene', 
      type: 'person', 
      description: 'Innovative guitarist and founding member of both The Clash and PiL.',
      links: [{ source: 'keith-levene', target: 'pil', role: 'Guitar' }]
    },
    { 
      id: 'jah-wobble', 
      name: 'Jah Wobble', 
      type: 'person', 
      description: 'Legendary bassist known for his deep, dub-influenced sound in early PiL.',
      links: [{ source: 'jah-wobble', target: 'pil', role: 'Bass' }]
    },
    { 
      id: 'jim-walker', 
      name: 'Jim Walker', 
      type: 'person', 
      description: 'The original drummer for Public Image Ltd.',
      links: [{ source: 'jim-walker', target: 'pil', role: 'Drums' }]
    },

    // Buzzcocks
    {
      id: 'buzzcocks',
      name: 'Buzzcocks',
      type: 'band',
      activeYears: '1976–present',
      description: 'Pioneers of the Manchester punk scene, known for their high-energy pop-punk melodies.'
    },
    { 
      id: 'pete-shelley', 
      name: 'Pete Shelley', 
      type: 'person', 
      description: 'Lead singer, guitarist, and primary songwriter for Buzzcocks.',
      links: [{ source: 'pete-shelley', target: 'buzzcocks', role: 'Vocals/Guitar' }]
    },
    { 
      id: 'steve-diggle', 
      name: 'Steve Diggle', 
      type: 'person', 
      description: 'Guitarist and long-time member of Buzzcocks.',
      links: [{ source: 'steve-diggle', target: 'buzzcocks', role: 'Guitar/Vocals' }]
    },
    { 
      id: 'howard-devoto', 
      name: 'Howard Devoto', 
      type: 'person', 
      description: 'Original vocalist of Buzzcocks who left to form Magazine.',
      links: [{ source: 'howard-devoto', target: 'buzzcocks', role: 'Vocals' }]
    },
    { 
      id: 'john-maher', 
      name: 'John Maher', 
      type: 'person', 
      description: 'Drummer for the classic Buzzcocks lineup.',
      links: [{ source: 'john-maher', target: 'buzzcocks', role: 'Drums' }]
    },

    // The Damned
    { 
      id: 'the-damned', 
      name: 'The Damned', 
      type: 'band', 
      activeYears: '1976–present', 
      description: 'The first UK punk band to release a single (New Rose), an album, and tour the US.',
      websiteUrl: 'https://en.wikipedia.org/wiki/The_Damned_(band)',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/The_Damned_1977.jpg'
    },
    { 
      id: 'dave-vanian', 
      name: 'Dave Vanian', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Dave_Vanian_1977.jpg',
      links: [{ source: 'dave-vanian', target: 'the-damned', role: 'Vocals' }]
    },
    { 
      id: 'captain-sensible', 
      name: 'Captain Sensible', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Captain_Sensible_1980.jpg',
      links: [{ source: 'captain-sensible', target: 'the-damned', role: 'Guitar/Bass' }]
    },
    { 
      id: 'rat-scabies', 
      name: 'Rat Scabies', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Rat_Scabies_1977.jpg',
      links: [{ source: 'rat-scabies', target: 'the-damned', role: 'Drums' }]
    },
    { 
      id: 'brian-james', 
      name: 'Brian James', 
      type: 'person', 
      description: 'Original guitarist and songwriter for The Damned.',
      links: [
        { source: 'brian-james', target: 'the-damned', role: 'Guitar' },
        { source: 'brian-james', target: 'brian-james-brains', role: 'Guitar' }
      ]
    },
    { 
      id: 'algy-ward', 
      name: 'Algy Ward', 
      type: 'person', 
      description: 'Bassist for The Damned (1978–1980) and later founder of Tank.',
      links: [{ source: 'algy-ward', target: 'the-damned', role: 'Bass' }]
    },

    // The Adicts
    { id: 'the-adicts', name: 'The Adicts', type: 'band', activeYears: '1975–present', description: 'Famous for their distinctive "Clockwork Orange" Droog image.' },
    { 
      id: 'monkey-adicts', 
      name: 'Keith "Monkey" Warren', 
      type: 'person', 
      description: 'Distinctive lead vocalist of The Adicts.',
      links: [{ source: 'monkey-adicts', target: 'the-adicts', role: 'Vocals' }]
    },
    { 
      id: 'pete-dee', 
      name: 'Pete Dee', 
      type: 'person', 
      description: 'Guitarist for The Adicts.',
      links: [{ source: 'pete-dee', target: 'the-adicts', role: 'Guitar' }]
    },
    { 
      id: 'kid-dee', 
      name: 'Kid Dee', 
      type: 'person', 
      description: 'Drummer for The Adicts.',
      links: [{ source: 'kid-dee', target: 'the-adicts', role: 'Drums' }]
    },

    // Crass
    { id: 'crass', name: 'Crass', type: 'band', activeYears: '1977–1984', description: 'The seminal anarcho-punk band.' },
    { 
      id: 'steve-ignorant', 
      name: 'Steve Ignorant', 
      type: 'person', 
      description: 'Co-founder and lead singer of Crass.',
      links: [{ source: 'steve-ignorant', target: 'crass', role: 'Vocals' }]
    },
    { 
      id: 'penny-rimbaud', 
      name: 'Penny Rimbaud', 
      type: 'person', 
      description: 'Co-founder, drummer and writer for Crass.',
      links: [{ source: 'penny-rimbaud', target: 'crass', role: 'Drums' }]
    },
    { 
      id: 'gee-vaucher', 
      name: 'Gee Vaucher', 
      type: 'person', 
      description: 'Artist responsible for the iconic Crass aesthetic.',
      links: [{ source: 'gee-vaucher', target: 'crass', role: 'Art/Design' }]
    },
    { 
      id: 'eve-libertine', 
      name: 'Eve Libertine', 
      type: 'person', 
      description: 'Vocalist for Crass.',
      links: [{ source: 'eve-libertine', target: 'crass', role: 'Vocals' }]
    },

    // The Lurkers
    { id: 'the-lurkers', name: 'The Lurkers', type: 'band', activeYears: '1976–present', description: 'The "British Ramones", they were the first band on Beggars Banquet Records.' },
    { 
      id: 'howard-wall', 
      name: 'Howard Wall', 
      type: 'person', 
      description: 'Vocalist for The Lurkers.',
      links: [{ source: 'howard-wall', target: 'the-lurkers', role: 'Vocals' }]
    },
    { 
      id: 'pete-stride', 
      name: 'Permanent Marker Pete Stride', 
      type: 'person', 
      description: 'Guitarist and main songwriter for The Lurkers.',
      links: [{ source: 'pete-stride', target: 'the-lurkers', role: 'Guitar' }]
    },
    { 
      id: 'arturo-bassick', 
      name: 'Arturo Bassick', 
      type: 'person', 
      description: 'Bassist for The Lurkers and later 999.',
      links: [{ source: 'arturo-bassick', target: 'the-lurkers', role: 'Bass' }]
    },

    // Albertos Y Lost Trio Paranoias
    {
      id: 'albertos',
      name: 'Albertos Y Lost Trio Paranoias',
      type: 'band',
      activeYears: '1973–1982',
      description: 'A comedy rock band that parodied the punk scene with hits like "Kill".'
    },
    { 
      id: 'cp-lee', 
      name: 'C.P. Lee', 
      type: 'person', 
      description: 'Frontman and comedian of Albertos Y Lost Trio Paranoias.',
      links: [{ source: 'cp-lee', target: 'albertos', role: 'Vocals' }]
    },
    { 
      id: 'jimmy-hibbert', 
      name: 'Jimmy Hibbert', 
      type: 'person', 
      description: 'Member of Albertos Y Lost Trio Paranoias and noted voice actor.',
      links: [{ source: 'jimmy-hibbert', target: 'albertos', role: 'Vocals' }]
    },
    { 
      id: 'bob-harding', 
      name: 'Bob Harding', 
      type: 'person', 
      description: 'Guitarist and vocalist for Albertos Y Lost Trio Paranoias.',
      links: [{ source: 'bob-harding', target: 'albertos', role: 'Guitar' }]
    },

    // Alternative TV (ATV)
    {
      id: 'alternative-tv',
      name: 'Alternative TV',
      type: 'band',
      activeYears: '1977–present',
      description: 'Formed by Mark Perry, the founder of the first punk fanzine Sniffin\' Glue.'
    },
    { 
      id: 'mark-perry', 
      name: 'Mark Perry', 
      type: 'person', 
      description: 'Influential figure in the punk scene; founder of Sniffin\' Glue and ATV.',
      links: [{ source: 'mark-perry', target: 'alternative-tv', role: 'Vocals' }]
    },
    { 
      id: 'alex-fergusson', 
      name: 'Alex Fergusson', 
      type: 'person', 
      description: 'Guitarist for ATV and later Psychic TV.',
      links: [{ source: 'alex-fergusson', target: 'alternative-tv', role: 'Guitar' }]
    },
    { 
      id: 'dennis-burns', 
      name: 'Dennis Burns', 
      type: 'person', 
      description: 'Bassist for Alternative TV.',
      links: [{ source: 'dennis-burns', target: 'alternative-tv', role: 'Bass' }]
    },

    // Angelic Upstarts
    { id: 'angelic-upstarts', name: 'Angelic Upstarts', type: 'band', activeYears: '1977–2022', description: 'Working-class socialist punk band from South Shields.' },
    { 
      id: 'mensi', 
      name: 'Thomas "Mensi" Mensforth', 
      type: 'person', 
      description: 'Outspoken frontman of Angelic Upstarts.',
      links: [{ source: 'mensi', target: 'angelic-upstarts', role: 'Vocals' }]
    },
    { 
      id: 'mond-upstarts', 
      name: 'Ray "Mond" Cowie', 
      type: 'person', 
      description: 'Original guitarist for Angelic Upstarts.',
      links: [{ source: 'mond-upstarts', target: 'angelic-upstarts', role: 'Guitar' }]
    },
    { 
      id: 'decca-wade', 
      name: 'Decca Wade', 
      type: 'person', 
      description: 'Original drummer for Angelic Upstarts.',
      links: [{ source: 'decca-wade', target: 'angelic-upstarts', role: 'Drums' }]
    },

    // Basement 5
    {
      id: 'basement-5',
      name: 'Basement 5',
      type: 'band',
      activeYears: '1978–1981',
      description: 'A black British punk band that fused punk with reggae and dub influences.'
    },
    { 
      id: 'leo-williams', 
      name: 'Leo Williams', 
      type: 'person', 
      description: 'Bassist for Basement 5 and later Big Audio Dynamite.',
      links: [{ source: 'leo-williams', target: 'basement-5', role: 'Bass' }]
    },
    { 
      id: 'richard-dudanski', 
      name: 'Richard Dudanski', 
      type: 'person', 
      description: 'Drummer who played with Basement 5 and The 101ers.',
      links: [{ source: 'richard-dudanski', target: 'basement-5', role: 'Drums' }]
    },
    { 
      id: 'jr-jeffery-rice', 
      name: 'Jeffery Rice (J.R.)', 
      type: 'person', 
      description: 'The original vocalist of Basement 5.',
      links: [{ source: 'jr-jeffery-rice', target: 'basement-5', role: 'Vocals' }]
    },

    // The Boomtown Rats
    {
      id: 'boomtown-rats',
      name: 'The Boomtown Rats',
      type: 'band',
      activeYears: '1975–present',
      description: 'Irish band that transitioned from punk to new wave stardom.'
    },
    { 
      id: 'bob-geldof', 
      name: 'Bob Geldof', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Bob_Geldof_1981.jpg', 
      description: 'Frontman of The Boomtown Rats and organizer of Live Aid.',
      links: [{ source: 'bob-geldof', target: 'boomtown-rats', role: 'Vocals' }]
    },
    { 
      id: 'garry-roberts', 
      name: 'Garry Roberts', 
      type: 'person', 
      description: 'Guitarist for The Boomtown Rats.',
      links: [{ source: 'garry-roberts', target: 'boomtown-rats', role: 'Guitar' }]
    },
    { 
      id: 'pete-briquette', 
      name: 'Pete Briquette', 
      type: 'person', 
      description: 'Bassist for The Boomtown Rats.',
      links: [{ source: 'pete-briquette', target: 'boomtown-rats', role: 'Bass' }]
    },

    // The Boys
    {
      id: 'the-boys',
      name: 'The Boys',
      type: 'band',
      activeYears: '1976–present',
      description: 'Often called "The Beatles of Punk", known for their power-pop influence.'
    },
    { 
      id: 'matt-dangerfield', 
      name: 'Matt Dangerfield', 
      type: 'person', 
      description: 'Guitarist and vocalist for The Boys.',
      links: [{ source: 'matt-dangerfield', target: 'the-boys', role: 'Guitar' }]
    },
    { 
      id: 'honest-john-plain', 
      name: 'Honest John Plain', 
      type: 'person', 
      description: 'Guitarist and founding member of The Boys.',
      links: [{ source: 'honest-john-plain', target: 'the-boys', role: 'Guitar' }]
    },
    { 
      id: 'casino-steel', 
      name: 'Casino Steel', 
      type: 'person', 
      description: 'Keyboardist for The Boys and formerly of Hollywood Brats.',
      links: [{ source: 'casino-steel', target: 'the-boys', role: 'Keyboards' }]
    },

    // Brian James Brains
    {
      id: 'brian-james-brains',
      name: 'Brian James Brains',
      type: 'band',
      activeYears: '1979–1980',
      description: 'Post-Damned project of Brian James.'
    },
    { 
      id: 'geoff-kyson', 
      name: 'Geoff Kyson', 
      type: 'person', 
      description: 'Drummer for Brian James Brains.',
      links: [{ source: 'geoff-kyson', target: 'brian-james-brains', role: 'Drums' }]
    },
    { 
      id: 'mark-taylor', 
      name: 'Mark Taylor', 
      type: 'person', 
      description: 'Bassist for Brian James Brains.',
      links: [{ source: 'mark-taylor', target: 'brian-james-brains', role: 'Bass' }]
    },

    // The Bullets
    {
      id: 'the-bullets',
      name: 'The Bullets',
      type: 'band',
      activeYears: '1977–1978',
      description: 'An early London punk band that featured future members of several notable groups.'
    },
    { 
      id: 'steve-wright-bullets', 
      name: 'Steve Wright', 
      type: 'person', 
      description: 'Vocalist for The Bullets.',
      links: [{ source: 'steve-wright-bullets', target: 'the-bullets', role: 'Vocals' }]
    },
    { 
      id: 'roy-morgan-bullets', 
      name: 'Roy Morgan', 
      type: 'person', 
      description: 'Bassist for The Bullets.',
      links: [{ source: 'roy-morgan-bullets', target: 'the-bullets', role: 'Bass' }]
    },
    { 
      id: 'colin-griffiths-bullets', 
      name: 'Colin Griffiths', 
      type: 'person', 
      description: 'Guitarist for The Bullets.',
      links: [{ source: 'colin-griffiths-bullets', target: 'the-bullets', role: 'Guitar' }]
    },

    // The Adverts
    { 
      id: 'the-adverts', 
      name: 'The Adverts', 
      type: 'band', 
      activeYears: '1976–1979', 
      description: 'One of the first bands to emerge in the 1970s London punk scene.' 
    },
    { 
      id: 'tv-smith', 
      name: 'TV Smith', 
      type: 'person', 
      description: 'Songwriter and frontman for The Adverts.',
      links: [{ source: 'tv-smith', target: 'the-adverts', role: 'Vocals' }]
    },
    { 
      id: 'gaye-advert', 
      name: 'Gaye Advert', 
      type: 'person', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Gaye_Advert_1978.jpg', 
      description: 'One of punk\'s first female icons and bassist for The Adverts.',
      links: [{ source: 'gaye-advert', target: 'the-adverts', role: 'Bass' }]
    },
    { 
      id: 'howard-pickup', 
      name: 'Howard Pickup', 
      type: 'person', 
      description: 'Guitarist for The Adverts.',
      links: [{ source: 'howard-pickup', target: 'the-adverts', role: 'Guitar' }]
    },

    // Chelsea
    {
      id: 'chelsea',
      name: 'Chelsea',
      type: 'band',
      activeYears: '1976–present',
      description: 'Founded by Gene October, Chelsea was a pillar of the early London punk scene.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Chelsea_Punk_Band.jpg'
    },
    {
      id: 'gene-october',
      name: 'Gene October',
      type: 'person',
      description: 'Iconic frontman and founding member of Chelsea.',
      links: [{ source: 'gene-october', target: 'chelsea', role: 'Vocals' }]
    },
    {
      id: 'james-stevenson',
      name: 'James Stevenson',
      type: 'person',
      description: 'Long-serving guitarist for Chelsea and member of Generation X.',
      links: [
        { source: 'james-stevenson', target: 'chelsea', role: 'Guitar' },
        { source: 'james-stevenson', target: 'generation-x', role: 'Guitar' }
      ]
    },
    {
      id: 'billy-idol',
      name: 'Billy Idol',
      type: 'person',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Billy_Idol_1984.jpg',
      description: 'Started in Chelsea before forming and leading Generation X to commercial success.',
      links: [
        { source: 'billy-idol', target: 'chelsea', role: 'Guitar/Vocals' },
        { source: 'billy-idol', target: 'generation-x', role: 'Vocals' }
      ]
    },
    {
      id: 'tony-james',
      name: 'Tony James',
      type: 'person',
      description: 'Bassist who transitioned from Chelsea to Generation X and later Sigue Sigue Sputnik.',
      links: [
        { source: 'tony-james', target: 'chelsea', role: 'Bass' },
        { source: 'tony-james', target: 'generation-x', role: 'Bass' }
      ]
    },
    {
      id: 'john-towe',
      name: 'John Towe',
      type: 'person',
      description: 'Drummer who played in the original lineups of Chelsea, Generation X, and Alternative TV.',
      links: [
        { source: 'john-towe', target: 'chelsea', role: 'Drums' },
        { source: 'john-towe', target: 'generation-x', role: 'Drums' },
        { source: 'john-towe', target: 'alternative-tv', role: 'Drums' }
      ]
    },

    // Generation X
    {
      id: 'generation-x',
      name: 'Generation X',
      type: 'band',
      activeYears: '1976–1981',
      description: 'One of the first punk bands to appear on Top of the Pops, featuring Billy Idol.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5a/GenerationXBand.jpg'
    }
  ],
  links: [
    // Sex Pistols
    { source: 'johnny-rotten', target: 'sex-pistols', role: 'Vocals' },
    { source: 'steve-jones', target: 'sex-pistols', role: 'Guitar' },
    { source: 'paul-cook', target: 'sex-pistols', role: 'Drums' },
    { source: 'glen-matlock', target: 'sex-pistols', role: 'Bass' },
    { source: 'sid-vicious', target: 'sex-pistols', role: 'Bass' },

    // The Clash
    { source: 'joe-strummer', target: 'the-clash', role: 'Vocals' },
    { source: 'mick-jones', target: 'the-clash', role: 'Guitar' },
    { source: 'paul-simonon', target: 'the-clash', role: 'Bass' },
    { source: 'topper-headon', target: 'the-clash', role: 'Drums' },

    // Public Image Ltd
    { source: 'johnny-rotten', target: 'pil', role: 'Vocals' },
    { source: 'keith-levene', target: 'pil', role: 'Guitar' },
    { source: 'jah-wobble', target: 'pil', role: 'Bass' },
    { source: 'jim-walker', target: 'pil', role: 'Drums' },

    // Buzzcocks
    { source: 'pete-shelley', target: 'buzzcocks', role: 'Vocals/Guitar' },
    { source: 'steve-diggle', target: 'buzzcocks', role: 'Guitar/Vocals' },
    { source: 'howard-devoto', target: 'buzzcocks', role: 'Vocals' },
    { source: 'john-maher', target: 'buzzcocks', role: 'Drums' },

    // The Damned
    { source: 'dave-vanian', target: 'the-damned', role: 'Vocals' },
    { source: 'captain-sensible', target: 'the-damned', role: 'Guitar/Bass' },
    { source: 'rat-scabies', target: 'the-damned', role: 'Drums' },
    { source: 'brian-james', target: 'the-damned', role: 'Guitar' },
    { source: 'algy-ward', target: 'the-damned', role: 'Bass' },

    // The Adicts
    { source: 'monkey-adicts', target: 'the-adicts', role: 'Vocals' },
    { source: 'pete-dee', target: 'the-adicts', role: 'Guitar' },
    { source: 'kid-dee', target: 'the-adicts', role: 'Drums' },

    // The Adverts
    { source: 'tv-smith', target: 'the-adverts', role: 'Vocals' },
    { source: 'gaye-advert', target: 'the-adverts', role: 'Bass' },
    { source: 'howard-pickup', target: 'the-adverts', role: 'Guitar' },

    // Angelic Upstarts
    { source: 'mensi', target: 'angelic-upstarts', role: 'Vocals' },
    { source: 'mond-upstarts', target: 'angelic-upstarts', role: 'Guitar' },
    { source: 'decca-wade', target: 'angelic-upstarts', role: 'Drums' },

    // Crass
    { source: 'steve-ignorant', target: 'crass', role: 'Vocals' },
    { source: 'penny-rimbaud', target: 'crass', role: 'Drums' },
    { source: 'gee-vaucher', target: 'crass', role: 'Art/Design' },
    { source: 'eve-libertine', target: 'crass', role: 'Vocals' },

    // The Lurkers
    { source: 'howard-wall', target: 'the-lurkers', role: 'Vocals' },
    { source: 'pete-stride', target: 'the-lurkers', role: 'Guitar' },
    { source: 'arturo-bassick', target: 'the-lurkers', role: 'Bass' },

    // Albertos
    { source: 'cp-lee', target: 'albertos', role: 'Vocals' },
    { source: 'jimmy-hibbert', target: 'albertos', role: 'Vocals' },
    { source: 'bob-harding', target: 'albertos', role: 'Guitar' },

    // Alternative TV
    { source: 'mark-perry', target: 'alternative-tv', role: 'Vocals' },
    { source: 'alex-fergusson', target: 'alternative-tv', role: 'Guitar' },
    { source: 'dennis-burns', target: 'alternative-tv', role: 'Bass' },

    // Basement 5
    { source: 'leo-williams', target: 'basement-5', role: 'Bass' },
    { source: 'richard-dudanski', target: 'basement-5', role: 'Drums' },
    { source: 'jr-jeffery-rice', target: 'basement-5', role: 'Vocals' },

    // The Boomtown Rats
    { source: 'bob-geldof', target: 'boomtown-rats', role: 'Vocals' },
    { source: 'garry-roberts', target: 'boomtown-rats', role: 'Guitar' },
    { source: 'pete-briquette', target: 'boomtown-rats', role: 'Bass' },

    // The Boys
    { source: 'matt-dangerfield', target: 'the-boys', role: 'Guitar' },
    { source: 'honest-john-plain', target: 'the-boys', role: 'Guitar' },
    { source: 'casino-steel', target: 'the-boys', role: 'Keyboards' },

    // Brian James Brains
    { source: 'brian-james', target: 'brian-james-brains', role: 'Guitar' },
    { source: 'geoff-kyson', target: 'brian-james-brains', role: 'Drums' },
    { source: 'mark-taylor', target: 'brian-james-brains', role: 'Bass' },

    // The Bullets
    { source: 'steve-wright-bullets', target: 'the-bullets', role: 'Vocals' },
    { source: 'roy-morgan-bullets', target: 'the-bullets', role: 'Bass' },
    { source: 'colin-griffiths-bullets', target: 'the-bullets', role: 'Guitar' },

    // Chelsea & Generation X connections
    { source: 'gene-october', target: 'chelsea', role: 'Vocals' },
    { source: 'james-stevenson', target: 'chelsea', role: 'Guitar' },
    { source: 'james-stevenson', target: 'generation-x', role: 'Guitar' },
    { source: 'billy-idol', target: 'chelsea', role: 'Guitar/Vocals' },
    { source: 'billy-idol', target: 'generation-x', role: 'Vocals' },
    { source: 'tony-james', target: 'chelsea', role: 'Bass' },
    { source: 'tony-james', target: 'generation-x', role: 'Bass' },
    { source: 'john-towe', target: 'chelsea', role: 'Drums' },
    { source: 'john-towe', target: 'generation-x', role: 'Drums' }
  ]
};
