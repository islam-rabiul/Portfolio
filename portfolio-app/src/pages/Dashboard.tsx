import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, LogOut, Trash2, Mail, Clock, RefreshCw, ArrowLeft } from "lucide-react";

interface QueryItem {
  _id: string;
  name: string;
  email: string;
  service?: string;
  budget?: string;
  deadline?: string;
  details?: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("admin_auth") === "true";
  });

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [queries, setQueries] = useState<QueryItem[]>([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.trim(), password: passwordInput.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      setQueries(data.queries || []);
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQueries = async () => {
    setFetchingData(true);
    try {
      const res = await fetch("/api/queries");
      const data = await res.json();
      if (res.ok && data.success) {
        setQueries(data.queries || []);
      }
    } catch (err) {
      console.error("Error fetching queries:", err);
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchQueries();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/queries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQueries((prev) => prev.filter((q) => q._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/queries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setQueries((prev) =>
          prev.map((q) => (q._id === id ? { ...q, status: newStatus } : q))
        );
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const filteredQueries = queries.filter((q) => {
    const search = searchFilter.toLowerCase();
    return (
      q.name?.toLowerCase().includes(search) ||
      q.email?.toLowerCase().includes(search) ||
      q.service?.toLowerCase().includes(search) ||
      q.details?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="page-shell flex flex-col flex-1 items-center bg-background font-sans transition-colors duration-500 overflow-hidden min-h-screen pt-32 pb-24">
      <main className="flex flex-1 w-full max-w-7xl flex-col px-6 md:px-12 gap-12">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-neutral-300 dark:border-neutral-800 pb-6">
          <div className="flex flex-col gap-1">
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 hover:text-[#8b5cf6] transition-colors mb-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
            <span className="page-kicker">ADMIN DASHBOARD</span>
            <h1 className="font-norwester text-3xl sm:text-4xl uppercase tracking-wide text-black dark:text-white">
              Contact Submissions <span className="text-[#8b5cf6]">Data</span>
            </h1>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <button
                onClick={fetchQueries}
                disabled={fetchingData}
                className="sketch-button inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-white/5 font-mono text-xs text-black dark:text-white hover:border-[#8b5cf6] transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${fetchingData ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleLogout}
                className="sketch-button inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 font-mono text-xs hover:bg-red-500/20 transition-colors cursor-pointer border-red-500/30"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Auth Gate: Login Form if not logged in */}
        {!isAuthenticated ? (
          <div className="flex justify-center items-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sketch-form-panel w-full max-w-md p-8 sm:p-10 flex flex-col gap-6"
            >
              <div className="flex flex-col items-center text-center gap-2 border-b border-dashed border-neutral-300 dark:border-neutral-800 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center mb-1">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="font-norwester text-2xl uppercase tracking-wider text-black dark:text-white">
                  Dashboard Access
                </h2>
                <p className="font-balgin text-xs text-neutral-500">
                  Enter your admin credentials to view stored contact data.
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                {loginError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 font-mono text-xs text-red-600 dark:text-red-400">
                    {loginError}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="font-norwester text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="islamrabi93@gmail.com"
                    className="w-full pb-2 pt-1 bg-transparent border-b-2 border-dashed border-neutral-300 dark:border-neutral-800 font-mono text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-norwester text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pb-2 pt-1 bg-transparent border-b-2 border-dashed border-neutral-300 dark:border-neutral-800 font-mono text-sm focus:outline-none focus:border-[#8b5cf6] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="sketch-button mt-4 py-3.5 bg-[#8b5cf6] text-white font-norwester text-sm uppercase tracking-widest hover:bg-[#7c3aed] transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? "Authenticating..." : "Unlock Dashboard →"}
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* Dashboard Data View */
          <div className="flex flex-col gap-8">
            
            {/* Search Bar & Stats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-norwester text-lg uppercase text-black dark:text-white">
                  Total Queries ({queries.length})
                </span>
              </div>

              <div className="w-full sm:w-72">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search submissions..."
                  className="w-full px-4 py-2 bg-white/50 dark:bg-white/5 border border-neutral-300 dark:border-neutral-800 rounded-xl font-mono text-xs text-black dark:text-white focus:outline-none focus:border-[#8b5cf6]"
                />
              </div>
            </div>

            {/* Queries List */}
            {filteredQueries.length === 0 ? (
              <div className="sketch-dash py-16 text-center text-neutral-500 font-mono text-sm">
                No contact submissions found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredQueries.map((q) => (
                  <motion.div
                    key={q._id}
                    layout
                    className="sketch-panel relative bg-white/80 dark:bg-[#111111]/80 p-6 sm:p-8 border-neutral-300/80 dark:border-neutral-800 flex flex-col gap-6"
                  >
                    {/* Header line */}
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-neutral-200 dark:border-neutral-800 pb-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-norwester text-xl uppercase text-black dark:text-white">
                          {q.name || "Anonymous Client"}
                        </span>
                        <a
                          href={`mailto:${q.email}`}
                          className="font-mono text-xs text-[#7c3aed] dark:text-[#a78bfa] hover:underline flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {q.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Status Select */}
                        <select
                          value={q.status || "Pending"}
                          onChange={(e) => handleStatusChange(q._id, e.target.value)}
                          className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 font-mono text-xs text-black dark:text-white cursor-pointer focus:outline-none focus:border-[#8b5cf6]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button
                          onClick={() => handleDelete(q._id)}
                          className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                          title="Delete submission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                      <div className="flex flex-col gap-1">
                        <span className="text-neutral-400 uppercase font-semibold">Service Needed:</span>
                        <span className="text-black dark:text-white uppercase font-bold">{q.service || "General Enquiry"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-neutral-400 uppercase font-semibold">Budget Range:</span>
                        <span className="text-black dark:text-white">{q.budget || "Not specified"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-neutral-400 uppercase font-semibold">Timeline:</span>
                        <span className="text-black dark:text-white">{q.deadline || "Flexible"}</span>
                      </div>
                    </div>

                    {/* Message Details */}
                    {q.details && (
                      <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-white/[0.03] border-l-4 border-[#8b5cf6] font-balgin text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                        <span className="font-norwester text-xs uppercase tracking-wider text-neutral-500 block mb-1">
                          Project Details / Message:
                        </span>
                        {q.details}
                      </div>
                    )}

                    {/* Timestamp Footer */}
                    <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-900">
                      <Clock className="w-3 h-3 text-[#8b5cf6]" />
                      <span>Submitted on: {new Date(q.createdAt).toLocaleString()}</span>
                    </div>

                  </motion.div>
                ))}
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
