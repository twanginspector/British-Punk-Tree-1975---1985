import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { PunkNode, PunkLink, PunkData } from '../types';

interface GraphViewProps {
  data: PunkData;
  selectedId: string | null;
  onNodeClick: (node: PunkNode) => void;
}

const GraphView: React.FC<GraphViewProps> = ({ data, selectedId, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll("*").remove();

    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Optimized forces for large number of nodes
    const simulation = d3.forceSimulation<PunkNode>(data.nodes)
      .force('link', d3.forceLink<PunkNode, PunkLink>(data.links).id((d) => d.id).distance(180))
      .force('charge', d3.forceManyBody().strength((d) => d.type === 'band' ? -800 : -400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d) => d.type === 'band' ? 100 : 60))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    const link = g.append('g')
      .attr('stroke', '#333')
      .attr('stroke-opacity', 0.4)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', 1.5);

    const node = g.append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .attr('class', (d) => `node-group ${d.id === selectedId ? 'node-selected' : ''}`)
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, PunkNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }) as any)
      .on('click', (event, d) => onNodeClick(d));

    // Circles/Shapes for nodes
    node.append('circle')
      .attr('r', (d) => d.type === 'band' ? 22 : 14)
      .attr('fill', (d) => {
        if (d.id === selectedId) return '#ff0000'; // Red highlight
        return d.type === 'band' ? '#fff' : '#666';
      })
      .attr('stroke', (d) => d.id === selectedId ? '#ff0000' : '#111')
      .attr('stroke-width', (d) => d.id === selectedId ? 3 : 1.5);

    // Labels
    node.append('text')
      .text((d) => d.name)
      .attr('x', (d) => d.type === 'band' ? 28 : 20)
      .attr('y', 4)
      .attr('fill', (d) => d.id === selectedId ? '#ff0000' : '#fff')
      .style('font-family', "'Special Elite', cursive")
      .style('font-weight', (d) => d.id === selectedId ? 'bold' : 'normal')
      .style('font-size', (d) => {
        if (d.id === selectedId) return d.type === 'band' ? '18px' : '15px';
        return d.type === 'band' ? '14px' : '11px';
      })
      .style('pointer-events', 'none')
      .style('text-shadow', '2px 2px 4px #000');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Auto-center and zoom out on load to accommodate more nodes
    if (data.nodes.length > 50) {
        svg.transition().duration(1000).call(
            zoom.transform,
            d3.zoomIdentity.translate(width / 4, height / 4).scale(0.5)
        );
    }

    return () => simulation.stop();
  }, [data, selectedId, onNodeClick]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default GraphView;