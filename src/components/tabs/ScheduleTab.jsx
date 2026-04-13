import { useState } from 'react'

const normalSchedule = [
  { time: '7:00 AM', color: '#a78bfa', label: 'Wake + 10 min Meditation', duration: '15 min', alt: true },
  { time: '7:15 AM', color: '#22c55e', label: 'Get ready for gym', duration: '15 min' },
  { time: '7:30 AM', color: '#22c55e', label: 'Gym — PPL Workout', duration: '90 min', alt: true },
  { time: '9:00 AM', color: '#22c55e', label: 'Shower + Breakfast', duration: '30 min' },
  { time: '9:30 AM', color: '#22c55e', label: 'Walk #1 (podcast/audiobook)', duration: '45 min', alt: true },
  { time: '10:15', color: '#f59e0b', label: 'Settle in + Prepare workspace', duration: '15 min' },
  { time: '10:30', color: '#f59e0b', label: 'DEEP WORK: Coding / 30-Day Guide', duration: '150 min', highlight: true },
  { time: '1:00 PM', color: '#22c55e', label: 'Lunch + Rest', duration: '30 min' },
  { time: '1:30 PM', color: '#f59e0b', label: 'ProDisk: LinkedIn + Cold emails', duration: '90 min', alt: true },
  { time: '3:00 PM', color: '#f59e0b', label: 'Uni Work: Assignments / Exam Prep', duration: '60 min' },
  { time: '4:00 PM', color: '#f59e0b', label: 'Coding Practice #2 / Project work', duration: '60 min', alt: true },
  { time: '5:00 PM', color: '#22c55e', label: 'Break + Snack', duration: '30 min' },
  { time: '5:30 PM', color: '#22c55e', label: 'Walk #2', duration: '45 min', alt: true },
  { time: '6:15 PM', color: '#f59e0b', label: 'ProDisk: Reddit + Follow-ups', duration: '45 min' },
  { time: '7:00 PM', color: '#22c55e', label: 'Dinner', duration: '30 min', alt: true },
  { time: '7:30 PM', color: '#f59e0b', label: 'Job applications / Portfolio polish', duration: '60 min' },
  { time: '8:30 PM', color: '#f59e0b', label: 'Uni prep overflow / Light study', duration: '60 min', alt: true },
  { time: '9:30 PM', color: '#a78bfa', label: 'Read 10 pages', duration: '25 min' },
  { time: '10:00', color: '#a78bfa', label: 'Free time / Rest / Family / Social', duration: '90 min', alt: true },
  { time: '11:30', color: '#a78bfa', label: 'Wind down — no screens', duration: '30 min' },
  { time: '12:00', color: '#22c55e', label: 'Sleep', duration: '7 hrs', alt: true, bold: true },
]

const uniSchedule = [
  { time: '7:00 AM', color: '#a78bfa', label: 'Wake + 10 min Meditation', duration: '10 min', alt: true },
  { time: '7:10 AM', color: '#22c55e', label: 'Gym — Short workout (Tue only, Sun = rest)', duration: '50 min' },
  { time: '8:00 AM', color: '#22c55e', label: 'Quick shower + head to uni', duration: '30 min', alt: true },
  { time: '8:30 AM', color: '#f59e0b', label: 'University Classes', duration: '7.5 hrs', highlight: true },
  { time: '4:00 PM', color: '#22c55e', label: 'Commute + Walk #1 (steps)', duration: '45 min', alt: true },
  { time: '4:45 PM', color: '#22c55e', label: 'Lunch / Rest', duration: '30 min' },
  { time: '5:15 PM', color: '#f59e0b', label: 'DEEP WORK: Coding / 30-Day Guide', duration: '90 min', highlight: true },
  { time: '6:45 PM', color: '#f59e0b', label: 'ProDisk: Outreach + Follow-ups', duration: '60 min', alt: true },
  { time: '7:45 PM', color: '#22c55e', label: 'Dinner', duration: '30 min' },
  { time: '8:15 PM', color: '#22c55e', label: 'Walk #2', duration: '40 min', alt: true },
  { time: '9:00 PM', color: '#f59e0b', label: 'Uni assignments / Exam prep', duration: '60 min' },
  { time: '10:00', color: '#a78bfa', label: 'Read 10 pages', duration: '25 min', alt: true },
  { time: '10:30', color: '#a78bfa', label: 'Free time / Rest', duration: '90 min' },
  { time: '12:00', color: '#22c55e', label: 'Sleep', duration: '7 hrs', alt: true, bold: true },
]

function ScheduleRow({ item }) {
  const classes = ['schedule-row']
  if (item.highlight) classes.push('highlight')
  else if (item.alt) classes.push('alt')

  return (
    <div className={classes.join(' ')}>
      <span className="time-label">{item.time}</span>
      <span className="dot" style={{ background: item.color }} />
      <span style={{
        flex: 1, fontSize: '13.5px',
        color: item.highlight ? '#f1f5f9' : '#cbd5e1',
        fontWeight: item.highlight || item.bold ? 700 : 400
      }}>
        {item.highlight && '\uD83D\uDD25 '}{item.label}
      </span>
      <span className="duration-badge">{item.duration}</span>
    </div>
  )
}

export default function ScheduleTab() {
  const [day, setDay] = useState('normal')

  return (
    <div>
      <h2 className="section-title" style={{ color: '#e2e8f0' }}>Daily Schedule</h2>

      <div className="day-toggle">
        <button className={`day-btn${day === 'normal' ? ' active' : ''}`} onClick={() => setDay('normal')}>
          Normal Day (Mon, Wed, Thu, Fri, Sat)
        </button>
        <button className={`day-btn${day === 'uni' ? ' active' : ''}`} onClick={() => setDay('uni')}>
          Uni Day (Tue & Sun)
        </button>
      </div>

      <div style={{
        background:'rgba(30,41,59,0.5)', borderRadius:12, padding:'10px 0',
        marginBottom:16, display:'flex', justifyContent:'center', gap:24
      }}>
        <span style={{fontSize:12,color:'#22c55e',fontWeight:700}}>Health</span>
        <span style={{fontSize:12,color:'#a78bfa',fontWeight:700}}>Spirit</span>
        <span style={{fontSize:12,color:'#f59e0b',fontWeight:700}}>Career</span>
      </div>

      {(day === 'normal' ? normalSchedule : uniSchedule).map((item, i) => (
        <ScheduleRow key={i} item={item} />
      ))}

      <div className="info-box" style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)' }}>
        <p style={{fontSize:13,color:'#86efac',fontWeight:700,marginBottom:6}}>Normal Day Allocation</p>
        <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
          <span style={{fontSize:12,color:'#f59e0b'}}><strong>2.5 hrs</strong> Deep Coding</span>
          <span style={{fontSize:12,color:'#f59e0b'}}><strong>1 hr</strong> Lighter Coding</span>
          <span style={{fontSize:12,color:'#ef4444'}}><strong>2.25 hrs</strong> ProDisk</span>
          <span style={{fontSize:12,color:'#3b82f6'}}><strong>2 hrs</strong> Uni Prep</span>
          <span style={{fontSize:12,color:'#22c55e'}}><strong>1.5 hrs</strong> Gym</span>
          <span style={{fontSize:12,color:'#22c55e'}}><strong>1.5 hrs</strong> Walking</span>
          <span style={{fontSize:12,color:'#a78bfa'}}><strong>35 min</strong> Read + Meditate</span>
          <span style={{fontSize:12,color:'#f59e0b'}}><strong>1 hr</strong> Job Apps</span>
        </div>
      </div>
    </div>
  )
}
