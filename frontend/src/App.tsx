import { useState, useEffect } from 'react'
import {
  Server,
  Database,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Cpu,
  Terminal,
  Activity,
  ShieldCheck,
  Bot
} from 'lucide-react'

interface HealthStatus {
  status: string
  services?: {
    database: string
    redis: string
  }
  timestamp?: string
  version?: string
}

export function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  const checkHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${apiUrl}/api/v1/health`)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      const data = await res.json()
      setHealth(data)
    } catch (err: any) {
      setError(err.message || 'Unable to connect to backend')
      setHealth(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                AI Interview Platform
              </span>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Monorepo v1.0
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`${apiUrl}/docs`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-800"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              API Docs (Swagger)
            </a>
            <button
              onClick={checkHealth}
              disabled={loading}
              className="inline-flex items-center gap-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white py-1.5 px-3.5 rounded-lg shadow-md transition duration-150 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Test Services
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Full Stack Environment Ready
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Next-Gen AI Mock Interview & Candidate Assessment
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            FastAPI + Python backend with PostgreSQL & Redis caching, paired with a React + TypeScript + Vite + Tailwind CSS frontend.
          </p>
        </section>

        {/* Live System Architecture Status */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" /> Service Infrastructure Status
            </h2>
            <span className="text-xs text-slate-400">Target: <code className="text-indigo-300">{apiUrl}</code></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* FastAPI Backend Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Server className="w-6 h-6" />
                </div>
                {health?.status === 'ok' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Online
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <XCircle className="w-3.5 h-3.5" /> {loading ? 'Checking...' : 'Unreachable'}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-slate-200">FastAPI Backend</h3>
              <p className="text-xs text-slate-400 mt-1">Python 3.12+ ASGI / Uvicorn server on port 8000</p>
            </div>

            {/* PostgreSQL Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <Database className="w-6 h-6" />
                </div>
                {health?.services?.database === 'connected' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
                    {health ? 'Offline' : 'Pending'}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-slate-200">PostgreSQL DB</h3>
              <p className="text-xs text-slate-400 mt-1">Relational store with SQLAlchemy & Alembic migrations</p>
            </div>

            {/* Redis Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
                  <Cpu className="w-6 h-6" />
                </div>
                {health?.services?.redis === 'connected' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
                    {health ? 'Offline' : 'Pending'}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-slate-200">Redis Cache & Pub/Sub</h3>
              <p className="text-xs text-slate-400 mt-1">In-memory caching and real-time session state</p>
            </div>

            {/* React Frontend Card */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active (Vite)
                </span>
              </div>
              <h3 className="font-semibold text-slate-200">React + TS Frontend</h3>
              <p className="text-xs text-slate-400 mt-1">Modern UI styled with Tailwind CSS</p>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-sm flex items-center gap-3">
              <Activity className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span>
                Backend is currently unreachable ({error}). Start backend or run <code className="bg-amber-900/60 px-1.5 py-0.5 rounded font-mono text-xs">docker compose up</code> to launch all containers.
              </span>
            </div>
          )}
        </section>

        {/* Monorepo Architecture Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Monorepo Structure
            </h3>
            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                <p className="text-indigo-400 font-bold">/backend</p>
                <p className="text-slate-400">FastAPI, SQLAlchemy, Redis Client, Alembic, Dockerfile</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                <p className="text-cyan-400 font-bold">/frontend</p>
                <p className="text-slate-400">React 19, TypeScript, Vite, Tailwind CSS, Dockerfile</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                <p className="text-emerald-400 font-bold">/docker-compose.yml</p>
                <p className="text-slate-400">Orchestrates Postgres (5432), Redis (6379), Backend (8000), Frontend (5173)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" /> One-Command Quickstart
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Run the full stack with hot reload enabled for both backend and frontend:
              </p>
              <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-emerald-400 select-all">
                docker compose up --build
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Frontend: <a href="http://localhost:5173" className="text-indigo-400 hover:underline">localhost:5173</a></span>
              <span>Backend Docs: <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">localhost:8000/docs</a></span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        AI Interview Platform &copy; {new Date().getFullYear()} &bull; Built with FastAPI, PostgreSQL, Redis, React & Tailwind CSS
      </footer>
    </div>
  )
}

export default App
