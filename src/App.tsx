import { useState, useEffect, createContext } from 'react';
import { Sidebar } from './components/Sidebar';
import { VisionTab, FlowTab, FocusTab, ConnectTab } from './components/Tabs';
import { SettingsTab } from './components/SettingsTab';
import { Onboarding } from './components/Onboarding';
import { AnimatePresence, motion } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

export const AppContext = createContext<any>(null);

export default function App() {
  const [activeTab, setActiveTab] = useState('vision');
  const [lowStimulus, setLowStimulus] = useState(false);
  const [spatialConfidence, setSpatialConfidence] = useState(98.4);
  const [systemUptime, setSystemUptime] = useState(0);
  
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('omni_logs');
    return saved ? JSON.parse(saved) : [
      { id: '1', time: '11:10:02', level: 'info', msg: 'Spawning UI intent agent for component scaffolding.' },
      { id: '2', time: '11:10:04', level: 'reasoning', msg: 'Analyzing WCAG requirements => Enforcing 44x44px touch targets.' },
      { id: '3', time: '11:10:05', level: 'success', msg: 'Generated React.tsx (2.4kb). Semantic structures validated.' },
      { id: '4', time: '11:10:08', level: 'action', msg: 'Awaiting human approval for file system write.', pending: true },
    ];
  });

  const [spatialMemory, setSpatialMemory] = useState(() => {
    const saved = localStorage.getItem('omni_memory');
    return saved ? JSON.parse(saved) : [
      { id: '1', label: 'Standing Desk', confidence: 99.1, lastSeen: '2m ago', utility: 'Workspace' },
      { id: '2', label: 'Coffee Mug (Empty)', confidence: 94.2, lastSeen: '5m ago', utility: 'Interactable' },
    ];
  });

  const [notifications, setNotifications] = useState<{id: string, text: string}[]>([]);
  const [command, setCommand] = useState('');
  
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('omni_onboarded') === 'true';
  });

  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('omni_onboarded', 'true');
  };

  useEffect(() => {
    localStorage.setItem('omni_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('omni_memory', JSON.stringify(spatialMemory));
  }, [spatialMemory]);

  const addLog = (level: string, msg: string, pending = false) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev: any) => {
      const newLogs = [...prev, { id: Date.now().toString() + Math.random(), time, level, msg, pending }];
      return newLogs.slice(-30);
    });
  };

  const addMemory = (label: string, utility: string = 'Unknown') => {
    setSpatialMemory((prev: any) => {
      const memory = [{ id: Date.now().toString() + Math.random(), label, confidence: (70 + Math.random() * 25).toFixed(1), lastSeen: 'Just now', utility }, ...prev];
      return memory.slice(0, 10);
    });
  };

  const notify = (text: string) => {
    const id = Date.now().toString() + Math.random();
    setNotifications(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
       setSystemUptime(prev => prev + 1);
       if (Math.random() > 0.5) {
          setSpatialConfidence(prev => {
             const diff = (Math.random() - 0.5) * 1.5;
             const val = prev + diff;
             return Math.min(Math.max(val, 92.0), 99.9);
          });
       }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    const cmd = command.toLowerCase().trim();
    if (cmd === 'low stimulus' || cmd === 'disable low') {
       notify(cmd === 'low stimulus' ? 'Low stimulus mode engaged.' : 'Low stimulus mode disabled.');
       setLowStimulus(cmd === 'low stimulus');
       addLog('action', `Environment constraints updated: ${cmd}`);
       setCommand('');
    } else if (cmd === 'scan' || cmd === 'refresh vision') {
       notify('Running spatial scan...');
       setActiveTab('vision');
       addLog('info', 'Executing explicit environmental LiDAR + Visual sweep.');
       setTimeout(() => {
          setSpatialConfidence(99.9);
          addLog('success', 'Sweep complete. Context updated.');
          notify('Scan complete. Confidence 99.9%.');
       }, 1500);
       setCommand('');
    } else if (cmd === 'show memory') {
       setActiveTab('vision');
       addLog('info', 'User queried spatial memory view.');
       notify('Displaying spatial memory context.');
       setCommand('');
    } else {
       addLog('info', `Received intent: ${command}`);
       setActiveTab('flow');
       const tempCommand = command;
       setCommand('');
       
       try {
         addLog('reasoning', 'Querying Gemini API for semantic action...', true);
         
         const apiKey = process.env.GEMINI_API_KEY;
         if (!apiKey) {
           throw new Error('GEMINI_API_KEY is missing. Please configure it in Netlify.');
         }

         const ai = new GoogleGenAI({ apiKey });
         const response = await ai.models.generateContent({
           model: 'gemini-2.5-pro',
           contents: `You are Omni-Agent, a proactive accessibility-first agent OS. 
           User command: "${tempCommand}". 
           Currently active tab: ${activeTab}. 
           Give a brief 1-2 sentence system action you would take and why.`
         });
         
         setLogs((prev: any) => prev.map((log: any) => log.msg.includes('Querying') ? { ...log, pending: false } : log));
         const result = response.text ? response.text.replace(/\n(.*)/g, ' ').trim() : "Action resolved.";
         addLog('success', `Omni Core: ${result}`);
         addMemory(`Processed: ${tempCommand.substring(0, 15)}...`, 'Cognitive');
         notify('Intent processed by Omni Core.');
       } catch (error: any) {
         setLogs((prev: any) => prev.map((log: any) => log.msg.includes('Querying') ? { ...log, pending: false } : log));
         if (error.message.includes('GEMINI_API_KEY is missing')) {
           addLog('error', 'API Key missing. Please set GEMINI_API_KEY in environment or Netlify.');
           notify('Error: Missing API Key.');
         } else {
           addLog('error', 'Remote core unreachable. Proceeding with local fallback rules.');
         }
       }
    }
  };

  return (
    <AppContext.Provider value={{ spatialConfidence, systemUptime, logs, addLog, spatialMemory, addMemory, notify }}>
      {!isOnboarded && <Onboarding onComplete={completeOnboarding} />}
      <div className={`flex flex-col h-screen w-full transition-colors duration-500 overflow-hidden font-sans relative ${lowStimulus ? 'bg-black text-white' : 'bg-[#050505] text-white'}`}>
      
      {/* Background Typographic Element */}
      <div className="absolute -top-20 -left-10 text-[320px] font-black opacity-[0.03] select-none tracking-tighter leading-none pointer-events-none z-0">
        OMNI
      </div>

      {/* Toast Notifications */}
      <div className="absolute top-8 right-8 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
              className={`p-4 rounded border text-sm font-bold tracking-wide shadow-2xl ${lowStimulus ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 backdrop-blur-md'}`}
            >
              {n.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Viewport Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10 w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} lowStimulus={lowStimulus} />
        
        <main className="flex-1 overflow-hidden relative flex flex-col min-w-0">
            {/* Top Navigation / Metadata */}
            <header className={`shrink-0 flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 pb-4 border-b transition-colors duration-500 z-10 ${lowStimulus ? 'border-zinc-900 bg-black/80' : 'border-white/10 bg-[#050505]/80'} backdrop-blur-md`}>
              <div className="flex items-baseline space-x-4">
                <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase">Omni-Agent</h1>
                <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded text-cyan-400 uppercase tracking-widest hidden sm:inline-block">v1.0.0-beta</span>
              </div>
              <div className="flex space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase text-white/50">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  <span className="hidden sm:inline-block">System: Synced</span>
                </div>
                <span className="hidden md:inline-block">SSOT Active: [Internal-Cap-2026]</span>
              </div>
            </header>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {activeTab === 'vision' && <VisionTab lowStimulus={lowStimulus} />}
                  {activeTab === 'flow' && <FlowTab lowStimulus={lowStimulus} />}
                  {activeTab === 'focus' && <FocusTab lowStimulus={lowStimulus} setLowStimulus={setLowStimulus} />}
                  {activeTab === 'connect' && <ConnectTab lowStimulus={lowStimulus} />}
                  {activeTab === 'settings' && <SettingsTab lowStimulus={lowStimulus} setLowStimulus={setLowStimulus} />}
                </motion.div>
              </AnimatePresence>
            </div>
        </main>
      </div>

      {/* Command / Intent Bar (Bottom) */}
      <footer 
        className="h-16 bg-white flex items-center px-6 md:px-10 space-x-6 z-20 shrink-0 group transition-colors focus-within:bg-zinc-100"
      >
        <div className="bg-black text-white px-3 py-1 font-mono text-xs group-focus-within:bg-cyan-500 group-focus-within:text-black transition-colors">
          CMD
        </div>
        <div className="flex-1 text-black font-bold tracking-tight text-sm truncate group-focus-within:text-cyan-700 transition-colors">
          <form onSubmit={handleCommandSubmit} className="w-full">
            <input 
               value={command} 
               onChange={e => setCommand(e.target.value)} 
               type="text" 
               aria-label="Command input for Omni Agent"
               placeholder="Summarize last meeting and highlight accessibility conflicts in spatial map..." 
               className="w-full bg-transparent outline-none placeholder:text-black/40 text-black font-bold min-h-[44px]" 
            />
          </form>
        </div>
        <div className="flex items-center space-x-6 shrink-0">
          <div className="w-px h-6 bg-black/10"></div>
          <div className="flex space-x-4">
             {/* Updated span elements to use setActiveTab when clicked */}
            <button onClick={() => setActiveTab('settings')} className="text-black/40 hover:text-black cursor-pointer uppercase text-[10px] font-black tracking-widest hidden md:inline-block outline-none focus-visible:text-black focus-visible:underline">Settings</button>
            <button onClick={() => setActiveTab('flow')} className="text-black/40 hover:text-black cursor-pointer uppercase text-[10px] font-black tracking-widest hidden md:inline-block outline-none focus-visible:text-black focus-visible:underline">Logs</button>
            <button onClick={() => setActiveTab('settings')} className="text-black/40 hover:text-black cursor-pointer uppercase text-[10px] font-black tracking-widest outline-none focus-visible:text-black focus-visible:underline">Consent</button>
          </div>
        </div>
      </footer>
    </div>
    </AppContext.Provider>
  );
}
