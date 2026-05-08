import { useState, useEffect } from "react";
import { SEO } from "../components/SEO";
import { Loader2, Trash2, LogOut, MessageSquare, ShieldCheck, Activity, Database, Clock } from "lucide-react";

interface Submission {
  id: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface SystemLog {
  id: number;
  timestamp: string;
  event: string;
  details: string;
}

interface HealthData {
  database: string;
  submissions: number;
  logs: number;
  lastLogs: SystemLog[];
}

export function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [passkey, setPasskey] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [activeTab, setActiveTab] = useState<'submissions' | 'system'>('submissions');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSubmissions = async (authToken: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          throw new Error("Session expired. Please log in again.");
        }
        throw new Error("Failed to load submissions.");
      }
      const data = await res.json();
      setSubmissions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealth = async (authToken: string) => {
    try {
      const res = await fetch("/api/admin/health", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setHealth(data);
      }
    } catch (err) {
      console.error("Failed to fetch health data", err);
    }
  };

  useEffect(() => {
    if (token) {
      if (activeTab === 'submissions') {
        fetchSubmissions(token);
      } else {
        fetchHealth(token);
      }
    }
  }, [token, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      localStorage.setItem("admin_token", data.token);
      setToken(data.token);
      setPasskey("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setSubmissions([]);
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete submission");
      
      setSubmissions(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <SEO title="Admin Dashboard" description="Manage submissions" />
      <div className="max-w-7xl mx-auto px-6 py-24 flex-1 w-full flex flex-col">
        {!token ? (
          <div className="max-w-md w-full mx-auto bg-base-900 border border-white/10 p-8 rounded-2xl flex flex-col">
            <h1 className="text-2xl font-bold font-display tracking-tight mb-6 flex items-center gap-3">
              Admin Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Passkey</label>
                <input 
                  type="password" 
                  value={passkey}
                  onChange={e => setPasskey(e.target.value)}
                  className="w-full bg-base-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  placeholder="Enter admin passkey..."
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold font-display tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  Admin Dashboard
                </h1>
                <p className="text-white/60 text-sm mt-1">Manage submissions and monitor system health</p>
              </div>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 self-start sm:self-center">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-8 border-b border-white/10">
              <button 
                onClick={() => setActiveTab('submissions')}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'submissions' ? 'text-primary' : 'text-white/50 hover:text-white'}`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Submissions
                </div>
                {activeTab === 'submissions' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('system')}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'system' ? 'text-primary' : 'text-white/50 hover:text-white'}`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  System Health
                </div>
                {activeTab === 'system' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg mb-8">
                {error}
              </div>
            )}

            {activeTab === 'submissions' ? (
              loading && !submissions.length ? (
                <div className="py-24 flex justify-center items-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : submissions.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-center bg-base-900 border border-white/10 rounded-2xl">
                  <MessageSquare className="w-12 h-12 text-white/20 mb-4" />
                  <h3 className="text-xl font-bold mb-2">No messages yet</h3>
                  <p className="text-white/60">When people contact you, their messages will appear here.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="bg-base-900 border border-white/10 rounded-2xl p-6 relative group">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{sub.firstName} {sub.lastName}</h3>
                          <a href={`mailto:${sub.email}`} className="text-primary hover:underline text-sm">{sub.email}</a>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-white/50">{new Date(sub.timestamp).toLocaleString()}</span>
                          <button 
                            onClick={() => handleDelete(sub.id)}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                            title="Delete message"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-base-950/50 rounded-xl p-4 border border-white/5">
                        <p className="text-white/80 whitespace-pre-wrap leading-relaxed text-sm">{sub.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-base-900 border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Database className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-white/80">Database</h4>
                    </div>
                    <p className="text-2xl font-bold font-display">{health?.database || 'SQLite'}</p>
                    <p className="text-sm text-white/40 mt-1">Local persistent storage</p>
                  </div>
                  <div className="bg-base-900 border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageSquare className="w-5 h-5 text-[#3b82f6]" />
                      <h4 className="font-semibold text-white/80">Records</h4>
                    </div>
                    <p className="text-2xl font-bold font-display">{health?.submissions || 0}</p>
                    <p className="text-sm text-white/40 mt-1">Total contact submissions</p>
                  </div>
                  <div className="bg-base-900 border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-5 h-5 text-accent" />
                      <h4 className="font-semibold text-white/80">Active Crons</h4>
                    </div>
                    <p className="text-2xl font-bold font-display">2</p>
                    <p className="text-sm text-white/40 mt-1">Heartbeat & Daily Cleanup</p>
                  </div>
                </div>

                {/* Recent Logs */}
                <div className="bg-base-900 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      System Activity Logs
                    </h4>
                  </div>
                  <div className="divide-y divide-white/5">
                    {health?.lastLogs.map((log) => (
                      <div key={log.id} className="px-6 py-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{log.event}</p>
                          <p className="text-xs text-white/60">{log.details}</p>
                        </div>
                        <span className="text-xs font-mono text-white/40">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                    {!health?.lastLogs.length && (
                      <div className="px-6 py-12 text-center text-white/40 italic">
                        No activity logs recorded yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
