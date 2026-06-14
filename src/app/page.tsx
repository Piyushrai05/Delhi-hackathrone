"use client";

import { motion } from "framer-motion";
import { Road, Network, Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import dynamic from "next/dynamic";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { useEffect, useState } from "react";

// Dynamically import map to avoid SSR issues
const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

const chartData = [
  { name: 'Mon', resilience: 0.82 },
  { name: 'Tue', resilience: 0.84 },
  { name: 'Wed', resilience: 0.81 },
  { name: 'Thu', resilience: 0.85 },
  { name: 'Fri', resilience: 0.87 },
  { name: 'Sat', resilience: 0.86 },
  { name: 'Sun', resilience: 0.89 },
];

export default function Dashboard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Route Resilience Command Center</h1>
          <p className="text-cyan mt-1">Satellite-Powered Urban Mobility Intelligence</p>
        </div>
        <div className="flex gap-4 text-sm font-mono text-gray-400 glass px-4 py-2 rounded-lg">
          <div>City: <span className="text-white">Bengaluru</span></div>
          <div className="w-px bg-glass-border"></div>
          <div>Time: <span className="text-white">{time}</span></div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Road Length", value: "5,842", unit: "km", icon: Road, color: "text-isro" },
          { label: "Connectivity Score", value: "92", unit: "%", icon: Network, color: "text-cyan" },
          { label: "Resilience Index", value: "0.87", unit: "", icon: Shield, color: "text-success" },
          { label: "Critical Nodes", value: "143", unit: "", icon: AlertTriangle, color: "text-danger" },
        ].map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group hover:bg-white/5 transition-colors cursor-default border border-glass-border hover:border-isro/50 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-isro/10 transition-colors" />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-sm font-medium text-gray-400">{kpi.label}</p>
                  <h3 className="text-3xl font-bold text-white mt-2">
                    {kpi.value}
                    <span className="text-lg text-gray-500 ml-1">{kpi.unit}</span>
                  </h3>
                </div>
                <div className={`p-3 rounded-lg bg-glass ${kpi.color}`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Map & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[500px] p-0 overflow-hidden relative border border-glass-border group">
          <div className="absolute top-4 left-4 z-[400] flex gap-2">
             <div className="glass px-3 py-1.5 rounded text-xs font-semibold text-white uppercase tracking-wider backdrop-blur-md">
               Live Map View
             </div>
             <div className="glass px-3 py-1.5 rounded text-xs font-semibold text-danger uppercase tracking-wider backdrop-blur-md flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
               Critical Alerts
             </div>
          </div>
          <DynamicMap />
        </Card>

        <div className="space-y-6 flex flex-col">
          <Card className="flex-1 flex flex-col border border-glass-border">
            <h3 className="text-lg font-semibold text-white mb-4">Resilience Trend</h3>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorResilience" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={['auto', 'auto']} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(8, 18, 41, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#22c55e' }}
                  />
                  <Area type="monotone" dataKey="resilience" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorResilience)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="border border-glass-border">
            <h3 className="text-lg font-semibold text-white mb-4">System Alerts</h3>
            <div className="space-y-3">
              {[
                { time: "10:42 AM", msg: "Connectivity reduced in Sector 4", type: "warning" },
                { time: "09:15 AM", msg: "Road extraction complete for Zone A", type: "success" },
                { time: "08:30 AM", msg: "Critical node detected at MG Rd", type: "danger" },
              ].map((alert, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-gray-500 whitespace-nowrap">{alert.time}</span>
                  <span className={
                    alert.type === 'danger' ? 'text-danger' : 
                    alert.type === 'warning' ? 'text-warning' : 'text-success'
                  }>
                    {alert.msg}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
