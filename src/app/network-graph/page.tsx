"use client";

import { Card } from "@/components/ui/Card";
import { useCallback } from "react";
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  Connection,
  Edge
} from "reactflow";
import "reactflow/dist/style.css";
import { Network, Activity, Zap, ShieldAlert, GitMerge } from "lucide-react";

// Initial Nodes
const initialNodes = [
  { id: '1', position: { x: 250, y: 50 }, data: { label: 'Node 1 (HQ)' }, style: { background: '#081229', color: '#fff', border: '1px solid #ff7a00', borderRadius: '8px', padding: '10px' } },
  { id: '2', position: { x: 100, y: 150 }, data: { label: 'Node 2 (Critical)' }, style: { background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
  { id: '3', position: { x: 400, y: 150 }, data: { label: 'Node 3' }, style: { background: '#081229', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px' } },
  { id: '4', position: { x: 250, y: 250 }, data: { label: 'Node 4 (Gateway)' }, style: { background: '#081229', color: '#fff', border: '1px solid #00d4ff', borderRadius: '8px', padding: '10px' } },
  { id: '5', position: { x: 100, y: 350 }, data: { label: 'Node 5' }, style: { background: '#081229', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px' } },
  { id: '6', position: { x: 400, y: 350 }, data: { label: 'Node 6' }, style: { background: '#081229', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px' } },
];

// Initial Edges
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', style: { stroke: '#00d4ff', strokeWidth: 1 } },
  { id: 'e2-4', source: '2', target: '4', style: { stroke: '#ff7a00', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', style: { stroke: '#00d4ff', strokeWidth: 1 } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: '#00d4ff', strokeWidth: 1 } },
  { id: 'e4-6', source: '4', target: '6', style: { stroke: '#00d4ff', strokeWidth: 1 } },
];

export default function NetworkGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, style: { stroke: '#00d4ff' } }, eds)), [setEdges]);

  const stats = [
    { label: "Total Nodes", value: "1,245", icon: Network },
    { label: "Total Edges", value: "3,892", icon: GitMerge },
    { label: "Connected Components", value: "3", icon: Activity },
    { label: "Graph Density", value: "0.005", icon: Zap },
    { label: "Network Diameter", value: "24", icon: ShieldAlert },
  ];

  return (
    <div className="space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Network Graph Analysis</h1>
        <p className="text-cyan mt-1">Topology & Connectivity Assessment</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Main Graph Viewer */}
        <Card className="xl:col-span-3 p-0 border border-glass-border overflow-hidden relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-space"
          >
            <Controls className="bg-glass-panel border border-glass-border fill-white" />
            <MiniMap 
              nodeColor={(node) => {
                switch (node.style?.background) {
                  case '#ef4444': return '#ef4444';
                  case '#081229': return '#ff7a00';
                  default: return '#00d4ff';
                }
              }}
              maskColor="rgba(8, 18, 41, 0.7)"
              className="bg-space border border-glass-border rounded-lg"
            />
            <Background color="#ffffff" gap={16} size={1} opacity={0.05} />
          </ReactFlow>
        </Card>

        {/* Right Sidebar Stats */}
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <Card className="border border-glass-border">
            <h3 className="font-semibold text-white mb-4">Graph Statistics</h3>
            <div className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-isro/10 text-isro">
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                  <span className="font-mono font-medium text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border border-glass-border">
            <h3 className="font-semibold text-white mb-4">Component Analysis</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-danger/10 border border-danger/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-danger">Critical Corridor Identified</span>
                  <span className="text-xs font-mono text-danger">Risk: High</span>
                </div>
                <p className="text-xs text-gray-400">Nodes 2 through 4 exhibit high betweenness centrality. A failure here partitions the network.</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-warning">Network Bottleneck</span>
                  <span className="text-xs font-mono text-warning">Risk: Mod</span>
                </div>
                <p className="text-xs text-gray-400">Node 6 has degree 1, forming a bridge to a vulnerable leaf cluster.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
