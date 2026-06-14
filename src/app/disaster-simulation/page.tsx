"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { AlertOctagon, Activity, PowerOff, ShieldAlert, BarChart3, Clock, Users } from "lucide-react";
import dynamic from "next/dynamic";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

const scenarios = [
  "Flood",
  "Earthquake",
  "Road Closure",
  "Construction Blockage",
  "Accident Scenario"
];

export default function DisasterSimulation() {
  const [selectedScenario, setSelectedScenario] = useState("Flood");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);

  // Dynamic KPIs based on simulation state
  const resilienceIndex = isSimulating ? 0.72 : (simulationComplete ? 0.62 : 0.87);
  const travelTimeInc = simulationComplete ? "+34%" : "+0%";
  const connectivityLoss = simulationComplete ? "-28%" : "0%";
  const populationImpact = simulationComplete ? "1.2M" : "0";

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 3000); // 3 second simulation
  };

  const impactData = [
    { name: 'Zone A', pre: 95, post: simulationComplete ? 45 : 95 },
    { name: 'Zone B', pre: 88, post: simulationComplete ? 60 : 88 },
    { name: 'Zone C', pre: 92, post: simulationComplete ? 30 : 92 },
    { name: 'Zone D', pre: 85, post: simulationComplete ? 80 : 85 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Disaster Impact Simulation</h1>
          <p className="text-cyan mt-1">Real-time Network Stress Testing & Rerouting</p>
        </div>
        <div className="glass px-4 py-2 rounded-lg flex items-center gap-3">
          <span className="text-gray-400 text-sm">Resilience Index</span>
          <div className="flex items-center gap-2">
            <motion.span 
              key={resilienceIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-2xl font-bold font-mono ${simulationComplete ? 'text-danger' : 'text-success'}`}
            >
              {resilienceIndex}
            </motion.span>
            {simulationComplete && <span className="text-danger text-sm">(-0.25)</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Sidebar - Controls */}
        <div className="space-y-6">
          <Card className="border border-glass-border">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-isro" />
              Scenario Control
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Event Type</label>
                <select 
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  disabled={isSimulating}
                  className="w-full bg-space border border-glass-border rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-isro transition-colors appearance-none disabled:opacity-50"
                >
                  {scenarios.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Selected Target</label>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">Node ND-8492</div>
                    <div className="text-xs text-gray-500">Koramangala Axis</div>
                  </div>
                  <TargetIcon />
                </div>
              </div>

              <button 
                onClick={handleSimulate}
                disabled={isSimulating}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isSimulating 
                    ? 'bg-danger/20 text-danger border border-danger/50'
                    : 'bg-isro hover:bg-[#ff8f2e] text-white'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Activity className="w-5 h-5 animate-pulse" />
                    Simulating Impact...
                  </>
                ) : (
                  <>
                    <PowerOff className="w-5 h-5" />
                    DISABLE NODE & SIMULATE
                  </>
                )}
              </button>
            </div>
          </Card>

          {/* Impact KPIs */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border border-glass-border">
              <Clock className="w-5 h-5 text-warning mb-2" />
              <div className="text-xs text-gray-400">Travel Time</div>
              <motion.div 
                key={travelTimeInc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xl font-bold mt-1 ${simulationComplete ? 'text-warning' : 'text-white'}`}
              >
                {travelTimeInc}
              </motion.div>
            </Card>
            <Card className="p-4 border border-glass-border">
              <ShieldAlert className="w-5 h-5 text-danger mb-2" />
              <div className="text-xs text-gray-400">Connectivity</div>
              <motion.div 
                key={connectivityLoss}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xl font-bold mt-1 ${simulationComplete ? 'text-danger' : 'text-white'}`}
              >
                {connectivityLoss}
              </motion.div>
            </Card>
            <Card className="p-4 border border-glass-border col-span-2 flex items-center justify-between">
              <div>
                <Users className="w-5 h-5 text-cyan mb-2" />
                <div className="text-xs text-gray-400">Est. Population Impact</div>
              </div>
              <motion.div 
                key={populationImpact}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-2xl font-bold ${simulationComplete ? 'text-cyan' : 'text-gray-600'}`}
              >
                {populationImpact}
              </motion.div>
            </Card>
          </div>
        </div>

        {/* Center Map */}
        <Card className="xl:col-span-2 h-[600px] p-0 border border-glass-border overflow-hidden relative">
           <div className="absolute top-4 right-4 z-[400]">
             <div className="glass px-3 py-1.5 rounded text-xs font-semibold text-white uppercase tracking-wider backdrop-blur-md">
               Live Rerouting Engine
             </div>
           </div>
           
           <DynamicMap />

           {/* Simulation Effects Overlay */}
           <AnimatePresence>
             {isSimulating && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 z-[300] pointer-events-none"
               >
                 <div className="absolute inset-0 bg-danger/10 mix-blend-overlay" />
                 {/* Expanding shockwave effect */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border-2 border-danger rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                 </div>
               </motion.div>
             )}
             
             {simulationComplete && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute inset-0 z-[300] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]"
               />
             )}
           </AnimatePresence>
        </Card>

        {/* Right Sidebar - Analytics */}
        <div className="space-y-6">
          <Card className="border border-glass-border h-[288px] flex flex-col">
            <h3 className="font-semibold text-white mb-4 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan" />
              Zonal Connectivity Pre vs Post
            </h3>
            <div className="flex-1 min-h-0 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(8, 18, 41, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="pre" name="Pre-Event" fill="rgba(34, 197, 94, 0.5)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="post" name="Post-Event" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="border border-glass-border h-[288px] flex flex-col">
            <h3 className="font-semibold text-white mb-4 text-sm">System Recovery Projection</h3>
            <div className="flex-1 min-h-0 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { time: '0h', val: 0.62 },
                  { time: '2h', val: 0.65 },
                  { time: '4h', val: 0.70 },
                  { time: '8h', val: 0.78 },
                  { time: '12h', val: 0.82 },
                  { time: '24h', val: 0.85 },
                ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis domain={['auto', 'auto']} stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(8, 18, 41, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="val" stroke="#ff7a00" strokeWidth={2} dot={{ r: 3, fill: '#ff7a00' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg className="w-5 h-5 text-isro" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
