import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Activity, Target, Zap, Check } from 'lucide-react';

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-[#050505] border border-white/10 shadow-2xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute -top-40 -right-20 text-[200px] font-black opacity-[0.02] select-none tracking-tighter leading-none pointer-events-none z-0">
          OMNI
        </div>

        <div className="relative z-10 space-y-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white mb-4">Welcome to Omni.</h1>
            <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
              An accessibility-first proactive agentic platform designed to minimize cognitive load and empower your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 border border-white/5 bg-white/[0.02]">
              <Eye className="w-6 h-6 text-cyan-400 shrink-0" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-1">Vision</h3>
                <p className="text-[10px] text-white/50 uppercase leading-relaxed">Spatial awareness & Environmental Mapping.</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 border border-white/5 bg-white/[0.02]">
              <Activity className="w-6 h-6 text-cyan-400 shrink-0" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-1">Flow</h3>
                <p className="text-[10px] text-white/50 uppercase leading-relaxed">Agent orchestration & Task Autonomy.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-white/5 bg-white/[0.02]">
              <Target className="w-6 h-6 text-cyan-400 shrink-0" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-1">Focus</h3>
                <p className="text-[10px] text-white/50 uppercase leading-relaxed">Cognitive guards & Low Stimulus settings.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-white/5 bg-white/[0.02]">
              <Zap className="w-6 h-6 text-cyan-400 shrink-0" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-1">Connect</h3>
                <p className="text-[10px] text-white/50 uppercase leading-relaxed">Ecosystem integrations & Hardware sync.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Required Training: Try these commands</h3>
            <div className="flex flex-col gap-2">
              <code className="text-xs text-white/90 bg-black p-3 border border-zinc-800 rounded-sm select-all">"Prepare an accessibility audit for my workspace"</code>
              <code className="text-xs text-white/90 bg-black p-3 border border-zinc-800 rounded-sm select-all">"Summarize recent intents and suggest low stimulus"</code>
              <code className="text-xs text-white/90 bg-black p-3 border border-zinc-800 rounded-sm select-all">"Engage deep work mode"</code>
            </div>
            <p className="text-[10px] text-white/40 uppercase mt-2">Tap/click to select text, then paste into the CMD bar below.</p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="flex items-center gap-3 text-xs text-white/40 uppercase tracking-widest font-bold">
              <Check className="w-4 h-4 text-green-500" /> WCAG 2.2 AA Compliant
            </div>
            <button 
              onClick={onComplete}
              className="w-full md:w-auto px-8 py-3 min-h-[44px] bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              Initialize System
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
