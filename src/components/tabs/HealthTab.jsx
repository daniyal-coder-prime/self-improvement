export default function HealthTab() {
  return (
    <div>
      <h2 className="section-title" style={{ color: '#22c55e' }}>Health & Physique System</h2>

      <div className="card">
        <h3>PPL Split — 6 Days/Week</h3>
        <div className="ppl-grid">
          {[
            { day: 'Mon', type: 'PUSH', color: '#ef4444', muscles: 'Chest, Shoulders, Triceps' },
            { day: 'Tue', type: 'PULL', color: '#3b82f6', muscles: 'Back, Biceps (SHORT)', extra: true },
            { day: 'Wed', type: 'LEGS', color: '#22c55e', muscles: 'Quads, Hams, Glutes, Calves' },
            { day: 'Thu', type: 'PUSH', color: '#ef4444', muscles: 'Chest, Shoulders, Triceps' },
            { day: 'Fri', type: 'PULL', color: '#3b82f6', muscles: 'Back, Biceps' },
            { day: 'Sat', type: 'LEGS', color: '#22c55e', muscles: 'Quads, Hams, Glutes, Calves' },
          ].map((d, i) => (
            <div key={i} className="ppl-card" style={{
              background: `${d.color}11`,
              border: `1px solid ${d.color}26`
            }}>
              <div className="ppl-day">{d.day}</div>
              <div className="ppl-type" style={{ color: d.color }}>{d.type}{d.extra ? ' \u26A1' : ''}</div>
              <div className="ppl-muscles">{d.muscles}</div>
            </div>
          ))}
        </div>
        <p style={{textAlign:'center',fontSize:13,color:'#64748b',fontStyle:'italic',marginTop:10}}>
          Sunday = REST DAY (uni day)
        </p>
      </div>

      <div className="card">
        <h3>Nutrition — Calorie Deficit</h3>
        <p style={{fontSize:13,color:'#94a3b8',marginBottom:12}}>Already fit, want optimization — here's your framework:</p>
        {[
          { label: 'Protein', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', text: '1.6-2.2g per kg bodyweight. Chicken, eggs, Greek yogurt, lentils, whey.' },
          { label: 'Deficit', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', text: '300-500 cal deficit max. Aggressive cuts kill gym performance.' },
          { label: 'Hydrate', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', text: '3-4 liters water daily. Carry a bottle everywhere.' },
          { label: 'Timing', color: '#22c55e', bg: 'rgba(34,197,94,0.12)', text: 'Largest meal post-workout. Keep dinner lighter.' },
          { label: 'Track', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', text: 'MyFitnessPal for 2 weeks to learn portions. Then intuitive.' },
        ].map((n, i) => (
          <div key={i} className="nutrition-row">
            <span className="nutrition-label" style={{color:n.color,background:n.bg}}>{n.label}</span>
            <span className="nutrition-detail">{n.text}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Steps — 10-12K Daily (2 Walks)</h3>
        <p style={{fontSize:13,color:'#94a3b8',lineHeight:1.6}}>
          <strong style={{color:'#22c55e'}}>Walk #1:</strong> After gym + breakfast (9:30 AM normal, commute on uni days). 40-50 min. Stack with podcast/audiobook.
          <br/><br/>
          <strong style={{color:'#22c55e'}}>Walk #2:</strong> Evening (5:30 PM normal, 8:15 PM uni days). 40-50 min. Wind-down walk.
        </p>
      </div>
    </div>
  )
}
