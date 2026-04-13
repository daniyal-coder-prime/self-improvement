import { useState } from 'react'

export default function Auth({ supabase, onAuth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function skipAuth() {
    onAuth(null)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Life OS</h1>
        <p className="auth-subtitle">
          {isLogin ? 'Sign in to sync your progress' : 'Create an account to get started'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setIsLogin(!isLogin); setError('') }}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button
            onClick={skipAuth}
            style={{
              background: 'none', border: 'none', color: '#475569',
              fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
              textDecoration: 'underline'
            }}
          >
            Continue without account (local only)
          </button>
        </div>
      </div>
    </div>
  )
}
