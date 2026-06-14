"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Map, 
  Network, 
  AlertTriangle, 
  Wind, 
  FileText,
  Settings,
  Satellite
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Road Extraction", href: "/road-extraction", icon: Map },
  { name: "Network Graph", href: "/network-graph", icon: Network },
  { name: "Criticality Analysis", href: "/criticality-analysis", icon: AlertTriangle },
  { name: "Disaster Simulation", href: "/disaster-simulation", icon: Wind },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 glass-panel border-r border-glass-border flex flex-col justify-between z-50">
      <div>
        {/* Logo Area */}
        <div className="p-6 flex items-center space-x-3">
          <Satellite className="w-8 h-8 text-isro" />
          <h1 className="text-xl font-bold text-white tracking-wider">
            ROUTE
            <span className="text-isro block text-sm font-medium tracking-widest">RESILIENCE</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={clsx(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 relative group",
                    isActive ? "text-white" : "text-gray-400 hover:text-white hover:bg-glass"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-isro/20 rounded-lg border border-isro/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={clsx("w-5 h-5 z-10", isActive && "text-isro")} />
                  <span className="font-medium z-10">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area */}
      <div className="p-4">
        <div className="glass rounded-xl p-4 flex flex-col space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-isro flex items-center justify-center text-white font-bold">
              IS
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Cmdr. Sharma</p>
              <p className="text-xs text-cyan">ISRO Analyst</p>
            </div>
          </div>
          <div className="w-full h-px bg-glass-border my-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">System Status</span>
            <span className="flex items-center text-success">
              <span className="w-2 h-2 rounded-full bg-success mr-1 animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
