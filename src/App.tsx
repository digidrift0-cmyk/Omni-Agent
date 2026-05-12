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

  const [cloudSynced, setCloudSynced] = useState(false);
  const [proactiveEnabled, setProactiveEnabled] = useState(() => {
    return localStorage.getItem('omni_proactive') !== 'false';
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const completeOnboarding = () => {
    setIsOnboarded(true);
    localStorage.setItem('omni_onboarded', 'true');
  };

  useEffect(() => {
    async function initCloud() {
       try {
         const [logsRes, memRes] = await Promise.all([
           fetch('/api/logs'), fetch('/api/memory')
         ]);
         
         if (logsRes.ok && memRes.ok) {
            // Need robust checks because SPA fallback returns HTML
            const remoteLogsText = await logsRes.text();
            const remoteMemText = await memRes.text();
            
            if (remoteLogsText.startsWith('[') && remoteMemText.startsWith('[')) {
                const remoteLogs = JSON.parse(remoteLogsText);
                const remoteMem = JSON.parse(remoteMemText);
                setLogs(remoteLogs);
                setSpatialMemory(remoteMem);
                setCloudSynced(true);
                // Can't notify yet because notify uses state that relies on previous... actually we can use notify directly
            }
         }
       } catch (e) {
         console.log("Using local offline storage");
       }
    }
    initCloud();
  }, []);

  useEffect(() => {
    localStorage.setItem('omni_proactive', String(proactiveEnabled));
  }, [proactiveEnabled]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (proactiveEnabled) {
       timer = setInterval(() => {
          const suggestions = [
             "Detected high cognitive load. Recommend Low Stimulus engagement.",
             "You have 3 unresolved intents from the previous session. Review in Flow tab?",
             "Spatial map indicates non-optimal lighting for current task. Ignore or adjust?",
             "Task efficiency is down 14%. Would you like to enable deep work focus?",
             "Your personal knowledge graph has 2 orphaned concepts. Connect them?"
          ];
          const randomSugg = suggestions[Math.floor(Math.random() * suggestions.length)];
          if (Math.random() > 0.5) { // 50% chance every 40 seconds
             notify(`Proactive: ${randomSugg}`);
             addLog('info', `Proactive suggestion surfaced: ${randomSugg}`);
          }
       }, 40000);
    }
    return () => clearInterval(timer);
  }, [proactiveEnabled]);

  useEffect(() => {
    if (!cloudSynced) localStorage.setItem('omni_logs', JSON.stringify(logs));
  }, [logs, cloudSynced]);

  useEffect(() => {
    if (!cloudSynced) localStorage.setItem('omni_memory', JSON.stringify(spatialMemory));
  }, [spatialMemory, cloudSynced]);

  const addLog = (level: string, msg: string, pending = false) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newLog = { id: Date.now().toString() + Math.random(), time, level, msg, pending };
    
    setLogs((prev: any) => {
      const newLogs = [...prev, newLog];
      return newLogs.slice(-30);
    });

    if (cloudSynced) fetch('/api/logs', { method: 'POST', body: JSON.stringify(newLog) }).catch(() => {});
  };

  const addMemory = (label: string, utility: string = 'Unknown') => {
    const newMem = { id: Date.now().toString() + Math.random(), label, confidence: (70 + Math.random() * 25).toFixed(1), lastSeen: 'Just now', utility };
    
    setSpatialMemory((prev: any) => {
      const memory = [newMem, ...prev];
      return memory.slice(0, 10);
    });

    if (cloudSynced) fetch('/api/memory', { method: 'POST', body: JSON.stringify(newMem) }).catch(() => {});
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
    if (!command.trim() || isProcessing) return;
    
    const cmd = command.toLowerCase().trim();
    if (cmd === 'low stimulus' || cmd === 'disable low' || cmd.includes('engage deep work') || cmd.includes('low stimulus')) {
       const isLow = cmd.includes('disable') ? false : true;
       notify(isLow ? 'Low stimulus mode engaged.' : 'Low stimulus mode disabled.');
       setLowStimulus(isLow);
       addLog('action', `Environment constraints updated: low stimulus ${isLow ? 'ON' : 'OFF'}`);
       setCommand('');
    } else if (cmd === 'scan' || cmd === 'refresh vision' || cmd.includes('accessibility blockers') || cmd.includes('accessibility audit')) {
       notify('Running spatial scan and a11y audit...');
       setActiveTab('vision');
       addLog('info', 'Executing explicit environmental LiDAR + Visual sweep for accessibility context.');
       setTimeout(() => {
          setSpatialConfidence(99.9);
          addLog('success', 'A11y sweep complete. Detected missing ARIA labels on modal.');
          addMemory('Missing ARIA', 'A11y Blocker');
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
         setIsProcessing(true);
         addLog('reasoning', 'Querying Gemini API for semantic action...', true);
         
         const apiKey = process.env.GEMINI_API_KEY;
         if (!apiKey) {
           throw new Error('GEMINI_API_KEY is missing. Please configure it in Netlify.');
         }

         const ai = new GoogleGenAI({ apiKey });
         const recentLogs = logs.slice(-8).map((l:any) => `[${l.level}] ${l.msg}`).join('\n');
         const recentMem = spatialMemory.slice(-5).map((m:any) => `${m.label} (${m.utility})`).join('\n');
         
         const systemInstruction = `You are Omni-Agent, a proactive accessibility-first agent OS. 
Current State:
- Active Tab: ${activeTab}
- Low Stimulus Mode: ${lowStimulus ? 'ON' : 'OFF'}
- Recent Logs:
${recentLogs}
- Spatial Memory:
${recentMem}

Respond in Valid JSON exactly matching this format:
{
  "action": "A 1-2 sentence response/explanation of the proactive action taken or answer",
  "level": "success", 
  "newMemories": [{"label": "string", "utility": "string"}] // Max 2 new insights to add to spatial memory. Omit if nothing new.
}`;

         const response = await ai.models.generateContent({
           model: 'gemini-2.5-pro',
           contents: systemInstruction + `\n\nUser command: "${tempCommand}"`,
           config: {
             responseMimeType: "application/json"
           }
         });
         
         setLogs((prev: any) => prev.map((log: any) => log.msg.includes('Querying') ? { ...log, pending: false } : log));
         
         const rawResult = response.text || "{}";
         try {
           const cleanJson = rawResult.replace(/```json/g, '').replace(/```/g, '').trim();
           const resultObj = JSON.parse(cleanJson);
           addLog(resultObj.level || 'success', `Omni Core: ${resultObj.action || rawResult}`);
           if (resultObj.newMemories && Array.isArray(resultObj.newMemories)) {
              resultObj.newMemories.forEach((mem: any) => {
                 addMemory(mem.label, mem.utility || 'Cognitive');
              });
           }
           notify('Intent processed by Omni Core.');
         } catch (e) {
           addLog('success', `Omni Core: Action processed.`);
           notify('Intent processed by Omni Core.');
         }
         } catch (error: any) {
         setLogs((prev: any) => prev.map((log: any) => log.msg.includes('Querying') ? { ...log, pending: false } : log));
         if (error.message.includes('GEMINI_API_KEY is missing')) {
           addLog('error', 'API Key missing. Please set GEMINI_API_KEY in environment or Netlify.');
           notify('Error: Missing API Key.');
         } else {
           addLog('error', 'Remote core unreachable. Proceeding with local fallback rules.');
         }
       } finally {
         setIsProcessing(false);
       }
    }
  };

  return (
    <AppContext.Provider value={{ spatialConfidence, systemUptime, logs, addLog, spatialMemory, addMemory, notify, cloudSynced, proactiveEnabled, setProactiveEnabled }}>
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
                <div className={`flex items-center space-x-2 ${cloudSynced ? 'text-green-500' : 'text-amber-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${cloudSynced ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse'}`}></div>
                  <span className="hidden sm:inline-block">System: {cloudSynced ? 'Cloud Synced' : 'Local Fallback'}</span>
                </div>
                <span className="hidden md:inline-block">SSOT Active: {cloudSynced ? '[Netlify Edge]' : '[Local Storage]'}</span>
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
               disabled={isProcessing}
               aria-label="Command input for Omni Agent"
               placeholder={isProcessing ? "Processing intent..." : "Summarize last meeting and highlight accessibility conflicts in spatial map..."}
               className={`w-full bg-transparent outline-none placeholder:text-black/40 text-black font-bold min-h-[44px] ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
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
