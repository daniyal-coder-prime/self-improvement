import { useDailyContent } from '../../hooks/useDailyContent'

export default function PhilosophyTab() {
  const { dayNumber, insights } = useDailyContent()

  return (
    <div>
      <h2 className="section-title" style={{ color: '#e2e8f0' }}>The Core Operating System</h2>
      <p style={{ color: '#94a3b8', fontSize: 14, margin: '-12px 0 8px', lineHeight: 1.6 }}>
        Synthesized from Atomic Habits, Deep Work, The Compound Effect, Can't Hurt Me, Mastery,
        Never Split the Difference, 7 Habits, Grit + Ali Abdaal & Hormozi. These are the{' '}
        <strong style={{ color: '#e2e8f0' }}>universal patterns</strong> distilled into your operating principles.
      </p>
      <p style={{ color: '#64748b', fontSize: 12, marginBottom: 24 }}>
        Day {dayNumber} · Content refreshes daily at midnight
      </p>

      {insights.map((insight, i) => (
        <div key={i} className="principle-card" style={{ borderLeft: `4px solid ${insight.sourceColor}` }}>
          <div className="principle-source" style={{ color: insight.sourceColor }}>{insight.source}</div>
          <div className="principle-title">{insight.title}</div>
          <p className="principle-app">
            <strong style={{ color: '#f59e0b' }}>Your Application: </strong>
            {insight.application}
          </p>
        </div>
      ))}

      <div className="info-box" style={{
        background: 'linear-gradient(135deg,rgba(245,158,11,0.1),rgba(239,68,68,0.08))',
        border: '1px solid rgba(245,158,11,0.2)',
        marginTop: 24
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#f59e0b', marginBottom: 10 }}>The One Rule That Governs Everything</h3>
        <p style={{ fontSize: 15, color: '#e2e8f0', lineHeight: 1.7, fontStyle: 'italic' }}>
          "Figure out what you want. Ignore the opinions of others. And do so much volume that it would be unreasonable to not be successful."
        </p>
        <p style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>— Alex Hormozi</p>
      </div>
    </div>
  )
}
