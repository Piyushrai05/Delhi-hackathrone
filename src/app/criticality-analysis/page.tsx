"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Map as MapIcon, ShieldAlert, Target, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

const rankingData = [
  { rank: 1, id: "ND-8492", betweenness: 0.89, risk: "Critical", impact: "42%" },
  { rank: 2, id: "ND-1102", betweenness: 0.82, risk: "High", impact: "35%" },
  { rank: 3, id: "ND-5541", betweenness: 0.76, risk: "High", impact: "28%" },
  { rank: 4, id: "ND-9920", betweenness: 0.65, risk: "Moderate", impact: "19%" },
  { rank: 5, id: "ND-3321", betweenness: 0.58, risk: "Moderate", impact: "14%" },
  { rank: 6, id: "ND-7743", betweenness: 0.45, risk: "Low", impact: "8%" },
];

export default function CriticalityAnalysis() {
  const [selectedNode, setSelectedNode] = useState<typeof rankingData[0] | null>(rankingData[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Criticality Analysis</h1>
        <p className="text-cyan mt-1">Network Vulnerability & Heatmap Visualization</p>
      </div>

      {/* Risk Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Critical", count: 12, color: "text-danger", border: "border-danger/30", bg: "bg-danger/10" },
          { label: "High Risk", count: 34, color: "text-isro", border: "border-isro/30", bg: "bg-isro/10" },
          { label: "Moderate Risk", count: 89, color: "text-warning", border: "border-warning/30", bg: "bg-warning/10" },
          { label: "Low Risk", count: 421, color: "text-success", border: "border-success/30", bg: "bg-success/10" },
        ].map((risk) => (
          <Card key={risk.label} className={`border ${risk.border} ${risk.bg} flex items-center justify-between`}>
            <span className={`font-semibold ${risk.color}`}>{risk.label}</span>
            <span className={`text-2xl font-bold ${risk.color}`}>{risk.count}</span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Map with Heatmap Placeholder */}
        <Card className="xl:col-span-2 h-[600px] p-0 border border-glass-border overflow-hidden relative group">
          <div className="absolute top-4 left-4 z-[400] flex gap-2">
             <div className="glass px-3 py-1.5 rounded text-xs font-semibold text-isro uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
               <MapIcon className="w-4 h-4" />
               Vulnerability Heatmap
             </div>
          </div>
          <DynamicMap />
          {/* Heatmap Overlay Simulation */}
          <div className="absolute inset-0 pointer-events-none z-[300]" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.2) 0%, transparent 40%), radial-gradient(circle at 30% 60%, rgba(255, 122, 0, 0.2) 0%, transparent 30%)',
            mixBlendMode: 'screen'
          }} />
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card className="border border-glass-border">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan" />
              Top Gatekeeper Nodes
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 bg-white/5 uppercase">
                  <tr>
                    <th className="px-4 py-2 rounded-tl-lg">Rank</th>
                    <th className="px-4 py-2">Node ID</th>
                    <th className="px-4 py-2">Risk</th>
                    <th className="px-4 py-2 rounded-tr-lg">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingData.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => setSelectedNode(row)}
                      className={`border-b border-white/5 cursor-pointer transition-colors ${
                        selectedNode?.id === row.id ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-gray-400">#{row.rank}</td>
                      <td className="px-4 py-3 font-mono text-white">{row.id}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          row.risk === 'Critical' ? 'bg-danger/20 text-danger' :
                          row.risk === 'High' ? 'bg-isro/20 text-isro' :
                          row.risk === 'Moderate' ? 'bg-warning/20 text-warning' :
                          'bg-success/20 text-success'
                        }`}>
                          {row.risk}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-cyan">{row.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Node Details Panel */}
          <AnimatePresence mode="wait">
            {selectedNode && (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border border-cyan/30 bg-cyan/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h3 className="text-lg font-bold text-white font-mono">{selectedNode.id}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <MapIcon className="w-3 h-3" /> 12.9716° N, 77.5946° E
                      </p>
                    </div>
                    <div className="p-2 bg-glass rounded-lg border border-glass-border">
                      <ShieldAlert className={`w-5 h-5 ${
                        selectedNode.risk === 'Critical' ? 'text-danger' :
                        selectedNode.risk === 'High' ? 'text-isro' :
                        selectedNode.risk === 'Moderate' ? 'text-warning' : 'text-success'
                      }`} />
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Betweenness Centrality</span>
                      <span className="font-mono font-medium text-white">{selectedNode.betweenness}</span>
                    </div>
                    <div className="w-full bg-glass-border h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan" style={{ width: `${selectedNode.betweenness * 100}%` }} />
                    </div>

                    <div className="flex justify-between items-center text-sm pt-2 border-t border-white/10">
                      <span className="text-gray-400">Connected Roads</span>
                      <span className="font-mono text-white">4</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Failure Impact</span>
                      <span className="font-mono text-danger">{selectedNode.impact} Loss</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Alternate Routes</span>
                      <span className="font-mono text-warning">Limited (1)</span>
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-cyan/10 hover:bg-cyan/20 border border-cyan/50 text-cyan py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                    <TrendingUp className="w-4 h-4" />
                    Simulate Failure
                  </button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
