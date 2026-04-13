export default function CareerTab() {
  return (
    <div>
      <h2 className="section-title" style={{ color: '#f59e0b' }}>Career & Income System</h2>

      <div className="stream-grid">
        <div className="stream-card" style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)'}}>
          <div className="stream-icon">💻</div>
          <h3 className="stream-title" style={{color:'#f59e0b'}}>Stream 1: Skills → Job (60%)</h3>
          <p className="stream-desc">Continue 30-Day Guide (Day 5→30). Build 2 deployed projects. Apply to remote jobs. Target: first paid gig in 6-8 weeks.</p>
        </div>
        <div className="stream-card" style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)'}}>
          <div className="stream-icon">🏢</div>
          <h3 className="stream-title" style={{color:'#ef4444'}}>Stream 2: ProDisk Sales (40%)</h3>
          <p className="stream-desc">LinkedIn + Apollo + Reddit. 10 outreach/day. Focus on MSPs and IT managers. Goal: 2-3 paying clients in 8 weeks.</p>
        </div>
      </div>

      <div className="card">
        <h3>Coding Roadmap — 8 Weeks</h3>
        {[
          { weeks: 'Weeks 1-2', title: '30-Day Guide Days 5-14', tasks: 'React + TypeScript foundation, ASP.NET Core basics. Push to GitHub daily.', metric: '10 commits to GitHub' },
          { weeks: 'Weeks 3-4', title: '30-Day Guide Days 15-22', tasks: 'Build full-stack E-Commerce Store. Deploy on Vercel. Portfolio piece #1.', metric: '1 deployed project live' },
          { weeks: 'Weeks 5-6', title: 'Guide Days 23-30 + Job Apps', tasks: 'Build POS System. Docker + CI/CD. Set up Toptal, Turing, Arc profiles. Start applying.', metric: '2 deployed projects + 30 applications' },
          { weeks: 'Weeks 7-8', title: 'Full Job Hunt Mode', tasks: '10+ apps/week. Upwork proposals 5/day. Interview prep using project code.', metric: '50+ applications, first gig' },
        ].map((p, i) => (
          <div key={i} className="phase-row">
            <div className="phase-label">{p.weeks}</div>
            <div>
              <div className="phase-title">{p.title}</div>
              <div className="phase-tasks">{p.tasks}</div>
              <div className="phase-metric">{p.metric}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Job Platforms to Set Up</h3>
        <div className="platform-grid">
          {[
            { name: 'LinkedIn', priority: 'HIGH', prColor: '#ef4444', status: 'Already on', action: "Optimize for 'React Developer | Remote'. Post 2x/week." },
            { name: 'Upwork', priority: 'HIGH', prColor: '#ef4444', status: 'Set up this week', action: 'React + .NET specialist. Start at $15-20/hr to build reviews.' },
            { name: 'Turing', priority: 'MED', prColor: '#f59e0b', status: 'After 2 projects', action: 'Heavy vetting — need strong portfolio first.' },
            { name: 'Arc.dev', priority: 'MED', prColor: '#f59e0b', status: 'After 2 projects', action: 'Good for Pakistan → US remote roles.' },
          ].map((p, i) => (
            <div key={i} className="platform-card">
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span className="platform-name">{p.name}</span>
                <span style={{fontSize:10,fontWeight:700,color:p.prColor,background:`${p.prColor}1f`,padding:'2px 8px',borderRadius:6}}>{p.priority}</span>
              </div>
              <div className="platform-status">{p.status}</div>
              <div className="platform-action">{p.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box" style={{background:'rgba(59,130,246,0.08)',border:'1px solid rgba(59,130,246,0.2)'}}>
        <h3 style={{fontSize:15,fontWeight:800,color:'#60a5fa',marginBottom:8}}>Managing Uni Load — Exam Weeks</h3>
        <div className="exam-item"><span className="exam-icon">✂️</span><span className="exam-cut"><strong>ProDisk → FULLY CUT</strong> (saves 2.25 hrs/day)</span></div>
        <div className="exam-item"><span className="exam-icon">✂️</span><span className="exam-cut"><strong>Walks → 1 walk only</strong> (saves 45 min/day)</span></div>
        <div className="exam-item"><span className="exam-icon">✂️</span><span className="exam-cut"><strong>Lighter coding → CUT</strong> (saves 1 hr/day)</span></div>
        <div className="exam-item"><span className="exam-icon">🔒</span><span className="exam-keep"><strong>GYM → NEVER CUT</strong></span></div>
        <div className="exam-item"><span className="exam-icon">🔒</span><span className="exam-keep"><strong>Deep Work coding → NEVER CUT</strong></span></div>
        <div className="exam-item"><span className="exam-icon">🔒</span><span className="exam-keep"><strong>Meditation + Reading → NEVER CUT</strong></span></div>
        <p style={{fontSize:13,color:'#60a5fa',marginTop:12,fontWeight:600}}>Total freed: ~4 hrs/day + regular 2 hrs = 6 hours exam prep on exam days.</p>
      </div>
    </div>
  )
}
