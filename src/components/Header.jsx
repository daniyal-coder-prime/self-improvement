export default function Header() {
  return (
    <div className="header">
      <h1>Daniyal's Life Operating System</h1>
      <p className="sub">8-Week Execution Plan · Health × Spirituality × Career</p>
      <div className="pillars">
        <span className="pill" style={{color:'#22c55e',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)'}}>
          Health & Physique
        </span>
        <span className="pill" style={{color:'#a78bfa',background:'rgba(167,139,250,0.08)',border:'1px solid rgba(167,139,250,0.2)'}}>
          Spirituality & Peace
        </span>
        <span className="pill" style={{color:'#f59e0b',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)'}}>
          Career & Income
        </span>
      </div>
    </div>
  )
}
