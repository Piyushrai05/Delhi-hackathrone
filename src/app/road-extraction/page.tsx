"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Layers, Play, CheckCircle2, ChevronRight, Settings2 } from "lucide-react";

export default function RoadExtraction() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Image Loaded",
    "Preprocessing",
    "Inference",
    "Post Processing",
    "Road Mask Generated",
    "Completed"
  ];

  const metrics = [
    { label: "IoU Score", value: "0.89", color: "text-success" },
    { label: "Dice Score", value: "0.94", color: "text-cyan" },
    { label: "Precision", value: "0.91", color: "text-white" },
    { label: "Recall", value: "0.96", color: "text-white" },
    { label: "F1 Score", value: "0.93", color: "text-isro" }
  ];

  const handleStartExtraction = () => {
    setIsProcessing(true);
    setActiveStep(0);
    
    // Simulate pipeline steps
    steps.forEach((_, i) => {
      setTimeout(() => {
        setActiveStep(i);
        if (i === steps.length - 1) setIsProcessing(false);
      }, (i + 1) * 1000);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Road Extraction</h1>
        <p className="text-cyan mt-1">AI-Powered Satellite Imagery Segmentation</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Viewer */}
        <Card className="xl:col-span-3 p-0 overflow-hidden relative min-h-[600px] border border-glass-border">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
             <div className="glass px-4 py-2 rounded-lg flex items-center gap-2">
               <Layers className="w-4 h-4 text-isro" />
               <span className="text-sm font-semibold text-white">Satellite vs Segmented</span>
             </div>
          </div>

          {/* Slider Container */}
          <div 
            className="relative w-full h-full min-h-[600px] cursor-ew-resize select-none overflow-hidden bg-space"
            onMouseMove={(e) => {
              if (e.buttons === 1) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const touch = e.touches[0];
              const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
              setSliderPosition((x / rect.width) * 100);
            }}
          >
            {/* Background Image (Original) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504681869696-d977211a5f4c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
            
            {/* Foreground Image (Segmented Mask - Using a filter to simulate) */}
            <div 
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504681869696-d977211a5f4c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`, filter: 'sepia(1) hue-rotate(180deg) saturate(3) brightness(0.8)' }}
            />

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-isro cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-isro rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,122,0,0.5)]">
                <div className="w-6 h-6 bg-space rounded-full flex items-center justify-center">
                  <div className="w-1 h-3 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card className="border border-glass-border">
            <div className="flex items-center gap-2 mb-4">
              <Settings2 className="w-5 h-5 text-cyan" />
              <h3 className="font-semibold text-white">Model Selection</h3>
            </div>
            <select className="w-full bg-space border border-glass-border rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-isro transition-colors appearance-none">
              <option>DeepLabV3+</option>
              <option>U-Net</option>
              <option>SegFormer</option>
              <option>SAM (Segment Anything)</option>
            </select>

            <button 
              onClick={handleStartExtraction}
              disabled={isProcessing}
              className="mt-4 w-full bg-isro/10 hover:bg-isro/20 border border-isro/50 text-isro py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-isro border-t-transparent rounded-full animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isProcessing ? "Processing..." : "Run Inference"}
            </button>
          </Card>

          <Card className="border border-glass-border">
            <h3 className="font-semibold text-white mb-4">Metrics</h3>
            <div className="space-y-4">
              {metrics.map((metric, i) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{metric.label}</span>
                    <span className={`font-mono font-medium ${metric.color}`}>{metric.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-glass-border rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${metric.color.replace('text-', 'bg-')}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Number(metric.value) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      style={{ backgroundColor: metric.color === 'text-white' ? '#fff' : undefined }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border border-glass-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-isro/5 rounded-full blur-2xl" />
            <h3 className="font-semibold text-white mb-4 relative z-10">Processing Status</h3>
            <div className="space-y-0 relative z-10">
              {steps.map((step, i) => {
                const isCompleted = i < activeStep;
                const isActive = i === activeStep;
                const isPending = i > activeStep;

                return (
                  <div key={step} className="flex items-start">
                    <div className="flex flex-col items-center mr-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-success/20 text-success' : 
                        isActive ? 'bg-isro/20 text-isro' : 'bg-glass-border text-gray-500'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                      </div>
                      {i !== steps.length - 1 && (
                        <div className={`w-px h-6 ${isCompleted ? 'bg-success' : 'bg-glass-border'}`} />
                      )}
                    </div>
                    <div className={`text-sm py-0.5 ${
                      isCompleted ? 'text-gray-300' : 
                      isActive ? 'text-white font-medium animate-pulse' : 'text-gray-500'
                    }`}>
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
