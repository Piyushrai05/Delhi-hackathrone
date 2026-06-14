"use client";

import { Card } from "@/components/ui/Card";
import { FileText, Download, FileJson, Map, Network, AlertTriangle, Printer, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const downloads = [
  { title: "Executive Summary PDF", format: "PDF", icon: FileText, size: "2.4 MB", color: "text-isro" },
  { title: "Network Topology Data", format: "GeoJSON", icon: FileJson, size: "14.1 MB", color: "text-cyan" },
  { title: "Segmented Road Masks", format: "TIFF", icon: Map, size: "842 MB", color: "text-success" },
  { title: "Graph Statistics Report", format: "CSV", icon: Network, size: "1.2 MB", color: "text-white" },
  { title: "Vulnerability Assessment", format: "PDF", icon: AlertTriangle, size: "5.6 MB", color: "text-warning" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Report Center</h1>
          <p className="text-cyan mt-1">Export & Share Intelligence Data</p>
        </div>
        <div className="flex gap-2">
          <button className="glass px-4 py-2 rounded-lg flex items-center gap-2 text-sm text-white hover:bg-white/10 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="glass px-4 py-2 rounded-lg flex items-center gap-2 text-sm text-white hover:bg-white/10 transition-colors">
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Downloads */}
        <div className="space-y-4">
          {downloads.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border border-glass-border hover:border-isro/50 transition-colors group cursor-pointer flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-white/5 group-hover:bg-isro/10 transition-colors ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span className="px-2 py-0.5 rounded bg-white/10">{item.format}</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Right Column - Report Preview */}
        <Card className="xl:col-span-2 border border-glass-border h-[calc(100vh-12rem)] flex flex-col p-0 overflow-hidden bg-white">
          {/* Mock PDF Viewer Header */}
          <div className="bg-gray-100 border-b border-gray-300 p-3 flex justify-between items-center text-gray-600 shrink-0">
            <div className="text-sm font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" /> ISRO_Urban_Mobility_Report_BLR.pdf
            </div>
            <div className="text-xs">Page 1 of 42</div>
          </div>
          
          {/* Mock PDF Content (ISRO Styled) */}
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-gray-50 flex justify-center">
            <div className="w-full max-w-[800px] bg-white shadow-lg border border-gray-200 p-12 text-gray-800">
              {/* Report Header */}
              <div className="border-b-2 border-[#ff7a00] pb-6 mb-8 flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-[#081229]">Route Resilience Assessment</h1>
                  <h2 className="text-xl font-serif text-gray-600 mt-2">Bengaluru Metropolitan Area</h2>
                  <p className="text-sm text-gray-500 mt-4">Generated: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-16 bg-[#ff7a00] rounded-full flex items-center justify-center text-white font-bold text-xl ml-auto mb-2">
                    ISRO
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Classified // Internal</p>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#081229] uppercase tracking-wider mb-4 border-l-4 border-[#ff7a00] pl-3">1.0 Executive Summary</h3>
                <p className="text-sm leading-relaxed mb-4 text-justify">
                  This report details the comprehensive geospatial analysis of the Bengaluru urban mobility network, utilizing high-resolution satellite imagery processed via advanced segmentation models. The primary objective is to evaluate network resilience, identify critical "gatekeeper" nodes, and simulate disaster impact scenarios to assist the Smart Cities Mission and NDMA in proactive urban planning.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-50 p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase">Total Road Extracted</p>
                    <p className="text-2xl font-bold text-[#081229]">5,842 <span className="text-sm font-normal">km</span></p>
                  </div>
                  <div className="bg-gray-50 p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase">Network Resilience Index</p>
                    <p className="text-2xl font-bold text-[#081229]">0.87 <span className="text-sm font-normal text-green-600">(Optimal)</span></p>
                  </div>
                </div>
              </div>

              {/* Critical Nodes */}
              <div>
                <h3 className="text-lg font-bold text-[#081229] uppercase tracking-wider mb-4 border-l-4 border-[#ff7a00] pl-3">2.0 Top Critical Vulnerabilities</h3>
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Rank</th>
                      <th className="border border-gray-300 px-4 py-2">Location ID</th>
                      <th className="border border-gray-300 px-4 py-2">Failure Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold text-red-600">1</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono">ND-8492 (Koramangala)</td>
                      <td className="border border-gray-300 px-4 py-2 text-red-600">-42% Connectivity</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold text-orange-600">2</td>
                      <td className="border border-gray-300 px-4 py-2 font-mono">ND-1102 (MG Road)</td>
                      <td className="border border-gray-300 px-4 py-2 text-orange-600">-35% Connectivity</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
