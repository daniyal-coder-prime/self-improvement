import { useState } from 'react'

export default function Auth({ supabase, onAuth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          if (error.message === 'Email not confirmed') {
            setError('Please check your email and click the confirmation link before signing in.')
          } else if (error.message === 'Invalid login credentials') {
            setError('Wrong email or password. Please try again.')
          } else {
            throw error
          }
        }
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data?.user?.identities?.length === 0) {
          setError('An account with this email already exists. Try signing in instead.')
        } else {
          setSuccess(`Account created! We've sent a confirmation email to ${email}. Please check your inbox (and spam folder) and click the link to verify your account.`)
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleResendConfirmation() {
    if (!email) {
      setError('Please enter your email first.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email })
      if (error) throw error
      setSuccess(`Confirmation email resent to ${email}. Check your inbox and spam folder.`)
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

        {error && (
          <div className="auth-error">
            {error}
            {error.includes('confirmation') && (
              <button
                onClick={handleResendConfirmation}
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

        {success && (
          <div style={{
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 8, padding: '12px 14px', fontSize: 13,
            color: '#86efac', marginBottom: 12, lineHeight: 1.5,
          }}>
            {success}
            <button
              onClick={() => { setIsLogin(true); setSuccess(''); setError('') }}
              style={{
                display: 'block', marginTop: 8, background: 'none',
                border: 'none', color: '#f59e0b', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
                padding: 0,
              }}
            >
              Go to Sign In
            </button>
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
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess('') }}>
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
