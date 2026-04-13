import { useState } from 'react'

export default function Auth({ supabase, onAuth }) {
  const [mode, setMode] = useState('login') // 'login', 'signup', 'confirm'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          if (error.message === 'Email not confirmed') {
            setError('Please check your email and click the confirmation link first.')
          } else if (error.message === 'Invalid login credentials') {
            setError('Wrong email or password. Please try again.')
          } else {
            setError(error.message)
          }
        }
      } else if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) {
          setError(error.message)
        } else if (data?.user?.identities?.length === 0) {
          setError('An account with this email already exists. Try signing in instead.')
        } else {
          // Signup successful — show confirmation screen
          setMode('confirm')
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleResendConfirmation() {
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email })
      if (error) throw error
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function skipAuth() {
    onAuth(null)
  }

  // Confirmation screen after signup
  if (mode === 'confirm') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div style={{ textAlign: 'center', marginBottom: 20, fontSize: 48 }}>📧</div>
          <h1 className="auth-title" style={{ fontSize: 22 }}>Check Your Email</h1>
          <div style={{
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 10, padding: '16px', fontSize: 14,
            color: '#86efac', margin: '16px 0', lineHeight: 1.6, textAlign: 'center',
          }}>
            We've sent a confirmation link to<br />
            <strong style={{ color: '#f59e0b' }}>{email}</strong>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
              Click the link in the email to verify your account, then come back and sign in.
            </p>
          </div>

          <button
            className="auth-btn"
            onClick={() => { setMode('login'); setError('') }}
            style={{ marginTop: 8 }}
          >
            Go to Sign In
          </button>

          <div style={{ textAlign: 'center', marginTop: 14 }}>
            <button
              onClick={handleResendConfirmation}
              disabled={loading}
              style={{
                background: 'none', border: 'none', color: '#64748b',
                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                textDecoration: 'underline',
              }}
            >
              {loading ? 'Sending...' : "Didn't receive it? Resend email"}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button
              onClick={skipAuth}
              style={{
                background: 'none', border: 'none', color: '#475569',
                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                textDecoration: 'underline',
              }}
            >
              Skip for now (local only)
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Life OS</h1>
        <p className="auth-subtitle">
          {mode === 'login' ? 'Sign in to sync your progress' : 'Create your account'}
        </p>

        {error && (
          <div className="auth-error">
            {error}
            {error.includes('confirmation') && (
              <button
                onClick={handleResendConfirmation}
                disabled={loading}
                style={{
                  display: 'block', marginTop: 8, background: 'none',
                  border: 'none', color: '#f59e0b', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
                  textDecoration: 'underline', padding: 0,
                }}
              >
                Resend confirmation email
              </button>
            )}
          </div>
        )}

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
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
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
