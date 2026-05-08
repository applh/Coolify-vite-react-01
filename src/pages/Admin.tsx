import { useState, useEffect } from "react";
import { SEO } from "../components/SEO";
import { Loader2, Trash2, LogOut, MessageSquare } from "lucide-react";

interface Submission {
  id: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [passkey, setPasskey] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
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
      // Sort by timestamp descending
      data.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setSubmissions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSubmissions(token);
    }
  }, [token]);

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
              <h1 className="text-3xl font-bold font-display tracking-tight">Contact Submissions</h1>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg mb-8">
                {error}
              </div>
            )}

            {loading && !submissions.length ? (
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
            )}
          </div>
        )}
      </div>
    </>
  );
}
