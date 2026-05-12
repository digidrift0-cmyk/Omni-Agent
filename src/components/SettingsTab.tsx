import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Shield, Settings, Download, Info } from 'lucide-react';

export function SettingsTab({ lowStimulus, setLowStimulus }: any) {
  const { logs, spatialMemory, notify, cloudSynced, proactiveEnabled, setProactiveEnabled } = useContext(AppContext);

  const handleExport = () => {
    const data = JSON.stringify({ logs, spatialMemory }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'omni-agent-export.json';
    a.click();
    URL.revokeObjectURL(url);
    notify('Data exported successfully.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="flex items-center gap-4">
        <Settings className={`w-8 h-8 ${lowStimulus ? 'text-zinc-500' : 'text-cyan-400'}`} />
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest">Settings</h2>
      </div>

      <div className={`p-6 border ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/10 bg-white/[0.02]'} space-y-6`}>
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Shield className="w-5 h-5 text-white/50" />
          <h3 className="font-bold uppercase tracking-widest text-sm">Consent & Privacy</h3>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">SSOT Status</h4>
            <p className="text-xs text-white/50 mt-1">Single Source of Truth storage backend.</p>
          </div>
          <button className={`px-4 py-2 border text-xs font-bold uppercase transition-colors min-w-[100px] min-h-[44px] ${cloudSynced ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-zinc-700 bg-zinc-800 text-white'}`}>
            {cloudSynced ? 'Cloud Synced' : 'Local Fallback'}
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Spatial Data Logging</h4>
            <p className="text-xs text-white/50 mt-1">Allow Omni-Agent to securely retain local environmental memory.</p>
          </div>
          <button className={`px-4 py-2 border text-xs font-bold uppercase transition-colors min-w-[100px] min-h-[44px] ${lowStimulus ? 'border-zinc-700 bg-zinc-800 text-white' : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'}`}>
            Enabled
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Cloud Processing</h4>
            <p className="text-xs text-white/50 mt-1">Use LLM APIs for advanced reasoning tasks.</p>
          </div>
          <button className={`px-4 py-2 border text-xs font-bold uppercase transition-colors min-w-[100px] min-h-[44px] ${lowStimulus ? 'border-zinc-700 bg-zinc-800 text-white' : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'}`}>
            Enabled
          </button>
        </div>
      </div>

      <div className={`p-6 border ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/10 bg-white/[0.02]'} space-y-6`}>
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Settings className="w-5 h-5 text-white/50" />
          <h3 className="font-bold uppercase tracking-widest text-sm">Accessibility Preferences</h3>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Low Stimulus Mode</h4>
            <p className="text-xs text-white/50 mt-1">Reduces animations, mutes colors, hides non-essential data.</p>
          </div>
          <button 
            onClick={() => {
              setLowStimulus(!lowStimulus);
              notify(lowStimulus ? 'Low stimulus bypassed.' : 'Low stimulus active.');
            }}
            className={`px-4 py-2 border text-xs font-bold uppercase transition-colors min-w-[100px] min-h-[44px] ${lowStimulus ? 'border-zinc-500 bg-white text-black' : 'border-white/20 hover:bg-white/10'}`}>
            {lowStimulus ? 'Active' : 'Enable'}
          </button>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Font Scaling</h4>
            <p className="text-xs text-white/50 mt-1">Increase base typography size.</p>
          </div>
          <button className={`px-4 py-2 border text-xs font-bold uppercase transition-colors min-w-[100px] min-h-[44px] ${lowStimulus ? 'border-zinc-700 text-zinc-300' : 'border-white/20 text-white/50'}`} disabled aria-disabled="true">
            Default
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Proactive Suggestions</h4>
            <p className="text-xs text-white/50 mt-1">Agent occasionally surfaces context-aware recommendations.</p>
          </div>
          <button 
            onClick={() => {
              if (setProactiveEnabled) {
                 setProactiveEnabled(!proactiveEnabled);
                 notify(proactiveEnabled ? 'Proactive suggestions disabled.' : 'Proactive suggestions enabled.');
              }
            }}
            className={`px-4 py-2 border text-xs font-bold uppercase transition-colors min-w-[100px] min-h-[44px] ${
              proactiveEnabled 
                ? (lowStimulus ? 'border-zinc-500 bg-white text-black' : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400') 
                : 'border-white/20 hover:bg-white/10'}`}>
            {proactiveEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>

      <div className={`p-6 border ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/10 bg-white/[0.02]'} space-y-6`}>
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Download className="w-5 h-5 text-white/50" />
          <h3 className="font-bold uppercase tracking-widest text-sm">Data Export</h3>
        </div>
        <p className="text-xs text-white/50">Download a JSON snapshot of your current spatial context, memory graph, and intent logs.</p>
        <button onClick={handleExport} className={`px-6 py-2 border text-[10px] font-black uppercase tracking-widest transition-colors min-h-[44px] ${lowStimulus ? 'border-zinc-700 hover:bg-zinc-800' : 'border-white/20 hover:bg-white/10'}`}>
          Export Memory Snapshot
        </button>
      </div>

      <div className={`p-6 border ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/10 bg-white/[0.02]'} space-y-6`}>
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Info className="w-5 h-5 text-white/50" />
          <h3 className="font-bold uppercase tracking-widest text-sm">About Omni-Agent</h3>
        </div>
        <p className="text-xs text-white/50 leading-relaxed max-w-2xl">
          Omni-Agent is an accessibility-first proactive platform. Built to minimize cognitive load while maximizing agentic autonomy. Version 1.0.0-beta.
        </p>
      </div>

    </div>
  );
}
