import { Eye, Activity, Target, Zap, Settings } from 'lucide-react';
import { motion } from 'motion/react';

const TABS = [
  { id: 'vision', label: 'Vision', icon: Eye, desc: 'Spatial & Env' },
  { id: 'flow', label: 'Flow', icon: Activity, desc: 'Task & Autonomy' },
  { id: 'focus', label: 'Focus', icon: Target, desc: 'Cognitive Load' },
  { id: 'connect', label: 'Connect', icon: Zap, desc: 'Ecosystem Sync' },
  { id: 'settings', label: 'Settings', icon: Settings, desc: 'System Config' },
];

export function Sidebar({ activeTab, setActiveTab, lowStimulus }: any) {
  return (
    <aside className={`w-full md:w-48 shrink-0 flex flex-col justify-center border-r transition-colors duration-500 z-50 px-6 md:px-10 ${lowStimulus ? 'bg-black border-zinc-900' : 'border-white/10 bg-[#050505]/50 backdrop-blur'}`}>
      <nav className="flex-1 flex py-6 md:py-0 overflow-x-auto md:flex-col md:justify-center gap-6 md:gap-12 items-center md:items-start md:overflow-visible md:my-auto scrollbar-hide">
        {TABS.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-opacity shrink-0 ${
                isActive ? 'opacity-100' : 'opacity-30 hover:opacity-75'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`font-black text-[10px] md:text-xs mb-1 tracking-widest flex items-center gap-2 ${isActive && !lowStimulus ? 'text-cyan-400' : 'text-white'}`}>
                {String(idx + 1).padStart(2, '0')}
                {isActive && !lowStimulus && (
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                )}
              </div>
              <div className={`text-xl md:text-4xl font-black leading-none transition-colors uppercase ${isActive && !lowStimulus ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`}>
                {tab.label}
              </div>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
