export default function SpiritualityTab() {
  const meditations = [
    { week: 'Weeks 1-2', method: 'Breath counting — count each exhale 1 to 10, restart. When mind wanders, gently return.', app: 'Use Headspace or Insight Timer (free)' },
    { week: 'Weeks 3-4', method: 'Body scan — slowly move attention from head to toes. Notice sensations without judging.', app: 'Try without app — just a timer' },
    { week: 'Weeks 5-8', method: 'Open awareness — sit and observe thoughts like clouds passing. No control, just witness.', app: 'Timer only — you\'ve built the muscle' },
  ]

  const books = [
    { status: 'NOW', statusColor: '#22c55e', statusBg: 'rgba(34,197,94,0.15)', title: 'Never Split the Difference', meta: 'Chris Voss · 274 pages · ~28 days', why: 'Immediate ROI for outreach & interviews', highlight: true },
    { status: 'NEXT', statusColor: '#f59e0b', statusBg: 'rgba(245,158,11,0.15)', title: 'How to Win Friends and Influence People', meta: 'Dale Carnegie · 288 pages · ~29 days', why: 'Deepens networking game' },
    { status: 'QUEUE', statusColor: '#64748b', statusBg: 'rgba(100,116,139,0.12)', title: 'Man\'s Search for Meaning', meta: 'Viktor Frankl · 184 pages · ~19 days', why: 'Unshakable inner purpose' },
    { status: 'QUEUE', statusColor: '#64748b', statusBg: 'rgba(100,116,139,0.12)', title: 'Mastery', meta: 'Robert Greene · 352 pages · ~35 days', why: 'Apprenticeship phase vision' },
    { status: 'QUEUE', statusColor: '#64748b', statusBg: 'rgba(100,116,139,0.12)', title: 'Meditations', meta: 'Marcus Aurelius · 256 pages · ~26 days', why: 'Pairs with meditation practice' },
    { status: 'QUEUE', statusColor: '#64748b', statusBg: 'rgba(100,116,139,0.12)', title: 'Siddhartha', meta: 'Hermann Hesse · 152 pages · ~15 days', why: 'Journey of self-discovery' },
    { status: 'QUEUE', statusColor: '#64748b', statusBg: 'rgba(100,116,139,0.12)', title: 'A Thousand Splendid Suns', meta: 'Khaled Hosseini · 372 pages · ~37 days', why: 'Empathy and perspective' },
  ]

  return (
    <div>
      <h2 className="section-title" style={{ color: '#a78bfa' }}>Spirituality & Peace System</h2>

      <div className="card">
        <h3>Daily Meditation — 10 min at 7:00 AM</h3>
        <p style={{fontSize:13,color:'#94a3b8',marginBottom:12}}>First action every day. Before phone, before anything.</p>
        {meditations.map((m, i) => (
          <div key={i} className="med-card">
            <div className="med-week">{m.week}</div>
            <div className="med-method">{m.method}</div>
            <div className="med-app">{m.app}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Reading Queue — 10 Pages/Day</h3>
        <p style={{fontSize:12,color:'#64748b',marginBottom:14}}>Ordered by immediate practical impact. You'll finish 3-4 books in 2 months.</p>
        {books.map((b, i) => (
          <div key={i} className="book-row" style={b.highlight ? {
            background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.3)'
          } : {}}>
            <span className="book-status" style={{color:b.statusColor,background:b.statusBg}}>{b.status}</span>
            <div style={{flex:1}}>
              <div className="book-title">{b.title}</div>
              <div className="book-meta">{b.meta}</div>
            </div>
            <div className="book-why">{b.why}</div>
          </div>
        ))}
      </div>

      <div className="info-box" style={{background:'rgba(167,139,250,0.08)',border:'1px solid rgba(167,139,250,0.2)'}}>
        <p style={{fontSize:13,color:'#c4b5fd',lineHeight:1.6}}>
          <strong>Reading Time:</strong> 9:30 PM every night. Phone on airplane mode. Physical book preferred. Habit-stacked: finish evening work → read 10 pages → free time → sleep.
        </p>
      </div>
    </div>
  )
}
