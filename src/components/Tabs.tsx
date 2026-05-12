import React, { useContext, useState, useEffect } from 'react';
import { 
  Camera, Map, Users, Settings, 
  GitCommit, ShieldAlert, Cpu, Bot, CheckCircle2, 
  Brain, AlignLeft, Filter, BellOff, ZapOff,
  Watch, Glasses, MonitorSmartphone, Share2, Users2, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppContext } from '../App';

export function VisionTab({ lowStimulus }: any) {
  const { spatialConfidence, spatialMemory } = useContext(AppContext);
  const [lidarHeights, setLidarHeights] = useState([50, 75, 33, 100, 66]);
  const [intentApproved, setIntentApproved] = useState(false);

  useEffect(() => {
    if (lowStimulus) return;
    const interval = setInterval(() => {
      setLidarHeights(prev => prev.map(h => {
        const diff = (Math.random() - 0.5) * 20;
        return Math.min(Math.max(h + diff, 10), 100);
      }));
    }, 320);
    return () => clearInterval(interval);
  }, [lowStimulus]);

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full space-y-8 pb-12 md:pb-0 relative">
      <div className="flex justify-between items-start">
        <div className="max-w-md">
          <p className="text-xs font-mono tracking-[0.3em] mb-4 uppercase text-cyan-400">Active Module: Vision LLM + LiDAR Fusion</p>
          <h2 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-8 italic uppercase">
            See.<br/>Flow.<br/>Focus.<br/>Act.
          </h2>
          <p className="text-sm leading-relaxed text-white/60">
            Proactive spatial intelligence detected 3 navigation obstacles and 1 collaborative opportunity in current environmental scene graph.
          </p>
        </div>
        <div className="text-right">
          <div className="font-mono text-3xl md:text-5xl font-light text-white/90">{spatialConfidence.toFixed(1)}<span className="text-xl opacity-40">%</span></div>
          <div className="text-[10px] font-bold uppercase tracking-widest hidden md:block text-cyan-400">Confidence Score</div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:h-64 h-auto">
        <div className={`p-6 flex flex-col border ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/20 bg-white/[0.02]'}`}>
          <span className={`text-[10px] font-bold uppercase tracking-widest mb-auto ${lowStimulus ? 'text-zinc-500' : 'text-white/40'}`}>Environmental Scene Graph</span>
          <div className="flex items-end space-x-1 h-24 my-4 group cursor-crosshair">
            {lidarHeights.map((h, i) => (
              <motion.div 
                key={i} 
                animate={{ height: `${h}%` }} 
                whileHover={{ height: '100%', scaleY: 1.1 }}
                className={`w-full origin-bottom rounded-t-sm transition-colors ${lowStimulus ? 'bg-zinc-600 group-hover:bg-zinc-500' : 'bg-cyan-500/80 group-hover:bg-cyan-400'}`}
              />
            ))}
          </div>
          <div className={`font-mono text-[10px] uppercase mt-auto ${lowStimulus ? 'text-zinc-600' : 'text-white/60'}`}>LIDAR: Polling (320Hz)</div>
        </div>
        
        <div className={`p-6 flex flex-col border ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/20 bg-white/[0.02]'}`}>
          <span className={`text-[10px] font-bold uppercase tracking-widest mb-auto ${lowStimulus ? 'text-zinc-500' : 'text-white/40'}`}>Spatial Memory</span>
          <div className="space-y-4 mt-4 overflow-y-auto pr-2 scrollbar-hide">
            {spatialMemory.slice(0, 4).map((item: any) => (
              <div key={item.id} className="flex flex-col border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold uppercase ${lowStimulus ? 'text-zinc-400' : 'text-white'}`}>{item.label}</span>
                  <span className={`text-[10px] font-mono ${lowStimulus ? 'text-zinc-500' : 'text-cyan-400'}`}>{item.confidence}%</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] text-white/40 uppercase">{item.utility}</span>
                  <span className="text-[9px] text-white/30 uppercase font-mono">{item.lastSeen}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 flex flex-col relative border ${lowStimulus ? 'border-zinc-900 bg-black' : intentApproved ? 'border-green-500/40 bg-green-500/10' : 'border-cyan-500/40 bg-cyan-500/10'} transition-colors duration-500`}>
          <div className={`absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse ${lowStimulus ? 'bg-zinc-500' : intentApproved ? 'bg-green-400' : 'bg-cyan-400'}`}></div>
          <span className={`text-[10px] font-bold uppercase tracking-widest mb-auto ${lowStimulus ? 'text-zinc-500' : intentApproved ? 'text-green-400' : 'text-cyan-400'}`}>Intent Suggestion</span>
          <p className={`text-xs leading-snug font-bold italic mt-4 ${lowStimulus ? 'text-zinc-300' : 'text-white'}`}>
            {intentApproved 
               ? '"Intent approved. Scaffolding deployed to active workspace."' 
               : '"Surface technical scaffolding for React Native workspace? Detected intent: Cross-platform deployment."'}
          </p>
          <div className="mt-6 flex space-x-2">
            {!intentApproved ? (
               <>
                 <button onClick={() => setIntentApproved(true)} className={`px-3 py-1 text-[10px] font-black uppercase transition-colors ${lowStimulus ? 'bg-zinc-200 text-black hover:bg-white' : 'bg-white text-black hover:bg-cyan-100'}`}>Approve</button>
                 <button className={`px-3 py-1 text-[10px] font-black uppercase transition-colors border ${lowStimulus ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-white/20 text-white hover:bg-white/10'}`}>Details</button>
               </>
            ) : (
               <span className="text-[10px] font-black uppercase text-green-400 mt-1 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> System Updated</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({title, icon: Icon, desc, lowStimulus}: any) {
  return (
    <div className={`p-6 border flex flex-col gap-3 min-h-[140px] focus-within:ring-2 focus-within:ring-cyan-500 transition-colors ${lowStimulus ? 'bg-black border-zinc-900' : 'bg-white/[0.02] border-white/20 hover:border-white/40'}`}>
       <div className="flex items-center gap-3 text-white">
         <Icon className="w-5 h-5 text-white/50" />
         <h3 className="font-bold text-sm uppercase tracking-wider">{title}</h3>
       </div>
       <p className="text-xs text-white/60 leading-relaxed mt-auto font-mono">{desc}</p>
    </div>
  )
}

export function FlowTab({ lowStimulus }: any) {
  const { logs, addLog } = useContext(AppContext);
  const [gateApproved, setGateApproved] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const statuses = ['Idle', 'Working', 'Complete'];
  const [agent1Status, setAgent1Status] = useState(0);
  const [agent2Status, setAgent2Status] = useState(1);
  const [agent3Status, setAgent3Status] = useState(2);

  useEffect(() => {
     if (lowStimulus) return;
     const timer = setInterval(() => {
        if(Math.random() > 0.5) setAgent1Status(s => (s + 1) % 3);
        if(Math.random() > 0.3) setAgent2Status(s => (s + 1) % 3);
        if(Math.random() > 0.7) setAgent3Status(s => (s + 1) % 3);
     }, 3000);
     return () => clearInterval(timer);
  }, [lowStimulus]);

  const handleApproveGate = () => {
     setGateApproved(true);
     addLog('success', 'File system write approved (`Button.tsx`).');
     setTimeout(() => setGateApproved(false), 3000);
  };
  
  const filteredLogs = filter === 'all' ? logs : logs.filter((l: any) => l.level === filter);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
       <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
             <div className="flex items-center gap-4">
               <h2 className="text-lg font-semibold tracking-tight">Reasoning Console</h2>
               <div className="flex gap-2 text-[10px] font-mono tracking-widest uppercase">
                  {['all', 'info', 'reasoning', 'success', 'action', 'error'].map(f => (
                     <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-2 py-1 border transition-colors ${filter === f ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/20 hover:text-white'}`}
                     >
                        {f}
                     </button>
                  ))}
               </div>
             </div>
             <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider hidden md:inline-block">Sub-Agent Swarm Active</span>
          </div>
          
          <div className={`border p-1 ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/20 bg-white/[0.02]'}`}>
             <div className="flex flex-col text-sm font-mono h-[300px] overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {filteredLogs.length === 0 ? (
                    <div className="text-white/30 text-xs italic">No logs found for this filter.</div>
                  ) : filteredLogs.map((log: any) => (
                    <motion.div
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       key={log.id}
                    >
                       <LogItem time={log.time} level={log.level} msg={log.msg} pending={log.pending} />
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
          </div>

          <div className="flex items-center justify-between mt-8 mb-4">
             <h2 className="text-lg font-semibold tracking-tight">Intent Gates</h2>
          </div>
          <div className={`p-5 border ${lowStimulus ? 'bg-black border-zinc-900' : gateApproved ? 'bg-green-500/10 border-green-500/40' : 'bg-cyan-500/10 border-cyan-500/40'} flex flex-col sm:flex-row items-start justify-between gap-4 transition-colors duration-500`}>
             <div className="flex gap-4">
               <div className={`w-10 h-10 bg-black border flex items-center justify-center shrink-0 mt-1 ${gateApproved ? 'text-green-400 border-green-500/40' : 'text-cyan-400 border-cyan-500/40'}`}>
                  {gateApproved ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
               </div>
               <div>
                  <h3 className="font-bold uppercase tracking-widest text-xs text-white mb-2">{gateApproved ? 'Write Completed' : 'Write to File System'}</h3>
                  <p className="text-xs text-white/60">Agent wants to create <code className="text-cyan-400 bg-black border border-white/10 px-1 py-0.5 font-mono">src/components/ui/Button.tsx</code> and update <code className="text-cyan-400 bg-black border border-white/10 px-1 py-0.5 font-mono">package.json</code>.</p>
                  <p className="text-[10px] text-white/40 mt-3 font-mono uppercase tracking-wider">Confidence: 99.2% | Impact: Low Risk</p>
               </div>
             </div>
             {!gateApproved && (
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                   <button className="flex-1 sm:flex-none px-4 py-2 min-h-[44px] text-[10px] font-black uppercase text-white hover:bg-white/10 border border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">Deny</button>
                   <button onClick={handleApproveGate} className="flex-1 sm:flex-none px-6 py-2 min-h-[44px] text-[10px] font-black uppercase bg-white text-black hover:bg-cyan-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">Approve</button>
                </div>
             )}
          </div>
       </div>
       
       <div className="space-y-6">
           <h2 className="text-lg font-semibold tracking-tight">Orchestrator</h2>
           <div className={`border p-5 space-y-5 ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/20 bg-white/[0.02]'}`}>
              <AgentCard name="Main Planner" status={statuses[agent1Status]} icon={Cpu} active={agent1Status === 1} />
              <AgentCard name="UI Scaffolder" status={statuses[agent2Status]} icon={Bot} active={agent2Status === 1} />
              <AgentCard name="A11y Auditor" status={statuses[agent3Status]} icon={CheckCircle2} active={agent3Status === 1} />
              <AgentCard name="Git Manager" status="Idle" icon={GitCommit} />
           </div>
       </div>
    </div>
  )
}

function LogItem({time, level, msg, pending}: any) {
  const colors = {
    info: 'text-zinc-400',
    reasoning: 'text-blue-400',
    success: 'text-emerald-400',
    action: 'text-amber-400',
    error: 'text-red-500'
  };
  return (
     <div className="flex items-start gap-4">
       <span className="text-zinc-600 shrink-0">{time}</span>
       <span className={`${colors[level as keyof typeof colors]} leading-relaxed flex-1`}>
         {msg}
         {pending && <span className="ml-2 inline-block w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />}
       </span>
     </div>
  )
}

function AgentCard({name, status, icon: Icon, active}: any) {
  return (
    <div className="flex items-center gap-3">
       <div className={`p-2 border ${active ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400' : 'border-white/10 bg-black text-white/50'}`}>
          <Icon className="w-4 h-4" />
       </div>
       <div className="flex flex-col">
          <span className={`text-xs font-bold tracking-widest uppercase ${active ? 'text-white' : 'text-white/60'}`}>{name}</span>
          <span className={`text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 ${active ? 'text-cyan-400' : 'text-white/40'}`}>
            {active && <span className="w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />}
            {status}
          </span>
       </div>
    </div>
  )
}

export function FocusTab({ lowStimulus, setLowStimulus }: any) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
       <div className={`relative overflow-hidden border p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between transition-colors duration-500 ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/20 bg-white/[0.02]'}`}>
          {!lowStimulus && (
             <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
          )}
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-2 text-white">Cognitive Load Manager</h2>
            <p className="text-white/60 leading-relaxed text-sm font-mono tracking-tight mt-4">
              Current task density is high. The distillation engine has collapsed 14 unread messages and 2 documents into key action items. 
            </p>
          </div>
          <div className="relative z-10 shrink-0 w-full md:w-auto">
             <button 
                onClick={() => setLowStimulus(!lowStimulus)}
                className={`w-full md:w-auto flex justify-center items-center gap-3 px-6 py-4 min-h-[44px] text-xs font-black uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 border ${
                  lowStimulus 
                    ? 'bg-black border-white/20 text-white hover:bg-white/10' 
                    : 'bg-white border-transparent text-black hover:bg-cyan-100'
                }`}
             >
                <ZapOff className="w-4 h-4" />
                {lowStimulus ? 'Disable Low Stimulus' : 'Enable Low Stimulus Mode'}
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 border ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-white/20 bg-white/[0.02]'}`}>
             <div className="flex items-center gap-3 mb-6 text-white">
               <AlignLeft className="w-5 h-5 text-white/50" />
               <h3 className="font-bold uppercase tracking-widest text-sm">Distillation Engine</h3>
             </div>
             
             <div className="space-y-4">
                <div className={`p-4 border ${lowStimulus ? 'border-zinc-900' : 'border-white/10 bg-black'}`}>
                   <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-3">Executive Summary</h4>
                   <p className="text-xs text-white/70 leading-relaxed font-mono">
                     The design system PR is ready but lacks ARIA labels on the new Modal component. The marketing team meeting was rescheduled to 3 PM.
                   </p>
                </div>
                <div className={`p-4 border ${lowStimulus ? 'border-zinc-900' : 'border-white/10 bg-black'}`}>
                   <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-3">Action Items (2)</h4>
                   <ul className="text-xs text-white/70 font-mono space-y-2">
                     <li className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">{">"}</span>
                        Approve ARIA label scaffolding in Flow Tab.
                     </li>
                     <li className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">{">"}</span>
                        Acknowledge 3 PM meeting shift.
                     </li>
                   </ul>
                </div>
             </div>
          </div>
          
          <div className="space-y-6">
             <FeatureRow title="Attention Guardrails" desc="Intelligent notification filtering active. Deep-work mode engaged for 45m." icon={BellOff} low={lowStimulus} />
             <FeatureRow title="Fatigue Alerts" desc="Eye-tracking indicates standard blink rate. No intervention required." icon={Brain} low={lowStimulus} />
             <KnowledgeGraphPanel low={lowStimulus} />
          </div>
       </div>
    </div>
  )
}

function KnowledgeGraphPanel({ low }: any) {
  const { logs = [], spatialMemory = [] } = useContext(AppContext);
  
  const successLogs = logs.filter((l: any) => l.level === 'success').slice().reverse();
  const recentAction = successLogs[0] ? (successLogs[0].msg.substring(0, 15).replace('Omni Core: ', '') + '...') : 'Context';
  
  const nodes = [
    { id: 1, label: 'Me', x: '50%', y: '50%' },
    { id: 2, label: spatialMemory[0]?.label || 'Workspace', x: '20%', y: '20%' },
    { id: 3, label: spatialMemory[1]?.label || 'Design Sync', x: '80%', y: '30%' },
    { id: 4, label: 'Omni Agent', x: '50%', y: '80%' },
    { id: 5, label: recentAction, x: '25%', y: '75%' }
  ];

  return (
    <div className={`p-5 border flex flex-col ${low ? 'border-zinc-900 bg-black' : 'border-white/20 bg-white/[0.02]'}`}>
       <div className="flex items-center gap-3 mb-4 text-white">
          <Filter className="w-5 h-5 text-white/50" />
          <h3 className="font-bold uppercase tracking-widest text-sm">Personal Knowledge Graph</h3>
       </div>
       <div className={`relative h-44 w-full border overflow-hidden ${low ? 'border-zinc-900 bg-black' : 'border-white/10 bg-[#020202]'}`}>
          <svg className={`absolute inset-0 w-full h-full pointer-events-none ${low ? 'opacity-10' : 'opacity-20'}`}>
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="white" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="white" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="white" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="white" strokeWidth="1" />
            <line x1="50%" y1="80%" x2="25%" y2="75%" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
          <AnimatePresence>
            {nodes.map((node, i) => (
              <motion.div 
                key={node.id + '-' + node.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 text-[9px] font-bold uppercase tracking-wider border shadow-lg ${low ? 'bg-black border-zinc-700 text-zinc-300' : node.id === 1 ? 'bg-white border-white text-black' : 'bg-black border-cyan-500/30 text-cyan-400'}`}
                style={{ left: node.x, top: node.y }}
              >
                {node.label.length > 15 ? node.label.substring(0, 15) + '...' : node.label}
              </motion.div>
            ))}
          </AnimatePresence>
       </div>
    </div>
  )
}

function FeatureRow({title, desc, icon: Icon, low}: any) {
  return (
    <div className={`p-5 border flex gap-4 items-start ${low ? 'border-zinc-900 bg-black' : 'border-white/20 bg-white/[0.02]'}`}>
       <div className={`p-3 border ${low ? 'bg-zinc-900 border-zinc-800' : 'border-white/10 bg-black'} text-white/50 shrink-0`}>
          <Icon className="w-4 h-4" />
       </div>
       <div>
         <h4 className="font-bold uppercase tracking-widest text-[11px] text-white">{title}</h4>
         <p className="text-xs text-white/50 mt-2 font-mono leading-relaxed">{desc}</p>
       </div>
    </div>
  )
}

export function ConnectTab({ lowStimulus }: any) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 space-y-6">
              <h2 className="text-lg font-black tracking-widest uppercase text-white mb-6">Active Peripherals</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PeripheralCard name="AR Glasses (Primary)" status="Connected" lat="12ms" active icon={Glasses} low={lowStimulus} />
                <PeripheralCard name="Haptic Vest" status="Standby" lat="4ms" active icon={Watch} low={lowStimulus} />
                <PeripheralCard name="Desktop Client" status="Syncing" lat="--" icon={MonitorSmartphone} low={lowStimulus} />
             </div>

             <div className="mt-8 pt-8 border-t border-white/10">
               <h2 className="text-lg font-black tracking-widest uppercase text-white mb-6">Ecosystem Integrations</h2>
               <div className="space-y-4">
                  <IntegrationRow name="Enterprise Calendar" status="Synced 2m ago" icon={Building2} />
                  <IntegrationRow name="Collaborative State" status="3 peers active" icon={Share2} />
                  <IntegrationRow name="Proximity Radar" status="Detecting nearby encrypted beacons" icon={Users2} />
               </div>
             </div>
          </div>
          
          <div className="col-span-1 border-t border-white/10 pt-8 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-6 lg:border-white/10">
             <h2 className="text-lg font-black tracking-widest uppercase text-white mb-6">Live Collab Session</h2>
             <div className={`p-6 border ${lowStimulus ? 'border-zinc-900 bg-black' : 'border-cyan-500/40 bg-cyan-500/10'} space-y-5`}>
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                     <Avatar initials="JD" color="bg-white text-black" />
                     <Avatar initials="AM" color="bg-cyan-500 text-black" />
                     <div className="w-8 h-8 rounded-full border border-white/20 bg-black flex items-center justify-center text-[10px] font-bold text-white">+1</div>
                   </div>
                   <span className="text-sm font-bold tracking-widest uppercase text-cyan-400">Design Sync</span>
                </div>
                <p className="text-[11px] font-mono text-white/70 leading-relaxed uppercase">Agent is mediating constraints. Hand-off ready in 2m.</p>
                <div className="w-full h-1 bg-black border border-white/10 overflow-hidden">
                   <div className="w-3/4 h-full bg-cyan-500" />
                </div>
                <button className="w-full min-h-[44px] bg-white hover:bg-cyan-100 text-black font-black uppercase text-[10px] tracking-widest mt-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
                  Join Session
                </button>
             </div>
          </div>
       </div>
    </div>
  )
}

function PeripheralCard({name, status, lat, active, icon: Icon, low}: any) {
  return (
    <div className={`p-5 border flex flex-col gap-3 ${active ? (low ? 'border-zinc-700 bg-zinc-900/50' : 'border-cyan-500/40 bg-cyan-500/10') : (low ? 'border-zinc-900 bg-black' : 'border-white/10 bg-white/[0.02]')} transition-colors focus-within:ring-2 focus-within:ring-cyan-500`}>
       <div className="flex items-center justify-between">
          <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : 'text-white/40'}`} />
          <span className={`text-[10px] font-mono px-2 py-0.5 border ${active ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-black text-white/40 border-white/10'}`}>
            {lat}
          </span>
       </div>
       <div>
         <h4 className={`font-bold uppercase tracking-widest text-[11px] mt-2 ${active ? 'text-white' : 'text-white/50'}`}>{name}</h4>
         <p className="text-[10px] text-white/40 font-mono mt-1 uppercase">{status}</p>
       </div>
    </div>
  )
}

function IntegrationRow({name, status, icon: Icon}: any) {
  return (
     <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-black border border-white/20 flex items-center justify-center text-white/50 shrink-0">
           <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
           <span className="font-bold uppercase tracking-widest text-xs text-white">{name}</span>
           <span className="text-[10px] font-mono uppercase text-white/40 mt-1">{status}</span>
        </div>
     </div>
  )
}

function Avatar({initials, color}: any) {
  return (
    <div className={`w-8 h-8 rounded-full border border-white/20 ${color} flex items-center justify-center text-[10px] font-black shrink-0`}>
       {initials}
    </div>
  );
}
