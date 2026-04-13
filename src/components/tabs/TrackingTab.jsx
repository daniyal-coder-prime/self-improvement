import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { HABITS, BADGES, getLevelProgress, POINTS_PER_LEVEL } from '../../lib/gamification'

export default function TrackingTab({ completedToday, stats, toggleHabit, weeklyData, earnedBadges }) {
  const todayCompleted = completedToday.length
  const todayTotal = HABITS.length
  const todayPercent = Math.round((todayCompleted / todayTotal) * 100)
  const xpProgress = getLevelProgress(stats.totalPoints)
  const xpInLevel = stats.totalPoints % POINTS_PER_LEVEL
  const pieData = [
    { name: 'Done', value: todayCompleted },
    { name: 'Remaining', value: todayTotal - todayCompleted },
  ]

  // Monthly trend (last 30 days)
  const monthlyData = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    monthlyData.push({
      day: d.getDate(),
      rate: Math.round(((stats.dailyHistory?.[key] || 0) / 9) * 100),
    })
  }

  return (
    <div>
      <h2 className="section-title" style={{ color: '#e2e8f0' }}>Habit Tracker & Progress</h2>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card" style={{ '--accent': '#f59e0b' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#f59e0b', borderRadius: '14px 14px 0 0' }} />
          <div className="stat-value" style={{ color: '#f59e0b' }}>{stats.totalPoints}</div>
          <div className="stat-label">Points</div>
        </div>
        <div className="stat-card">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#22c55e', borderRadius: '14px 14px 0 0' }} />
          <div className="stat-value" style={{ color: '#22c55e' }}>{stats.currentStreak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#a78bfa', borderRadius: '14px 14px 0 0' }} />
          <div className="stat-value" style={{ color: '#a78bfa' }}>Lv.{stats.level}</div>
          <div className="stat-label">Level</div>
        </div>
        <div className="stat-card">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#ef4444', borderRadius: '14px 14px 0 0' }} />
          <div className="stat-value" style={{ color: '#ef4444' }}>{earnedBadges.length}</div>
          <div className="stat-label">Badges</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="level-bar-container glass">
        <div className="level-header">
          <span className="level-title" style={{ color: '#f59e0b' }}>Level {stats.level}</span>
          <span className="level-xp">{xpInLevel} / {POINTS_PER_LEVEL} XP</span>
        </div>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${xpProgress * 100}%` }} />
        </div>
      </div>

      {/* Today's Habits */}
      <div className="glass-card glass-glow" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#e2e8f0', marginBottom: 4 }}>
          Today's Habits
        </h3>
        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 14 }}>
          {todayCompleted}/{todayTotal} completed · {todayPercent}%
        </p>
        <div className="habit-grid">
          {HABITS.map(habit => {
            const done = completedToday.includes(habit.id)
            return (
              <div
                key={habit.id}
                className={`habit-card${done ? ' completed' : ''}`}
                onClick={() => toggleHabit(habit.id)}
              >
                <div className="habit-check">
                  {done && <span style={{ color: 'white', fontSize: 14 }}>✓</span>}
                </div>
                <div>
                  <div className="habit-label">{habit.icon} {habit.label}</div>
                </div>
                <span className="habit-points">+10</span>
              </div>
            )
          })}
        </div>
        {todayCompleted === todayTotal && (
          <div style={{
            textAlign: 'center', padding: '12px',
            background: 'rgba(245,158,11,0.1)', borderRadius: 10,
            color: '#fcd34d', fontWeight: 700, fontSize: 14, marginTop: 8
          }}>
            PERFECT DAY! +50 Bonus Points
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card glass">
          <div className="chart-title">Today's Progress</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                <Cell fill="#22c55e" />
                <Cell fill="rgba(100,116,139,0.2)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginTop: -100, position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#22c55e' }}>{todayPercent}%</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Complete</div>
          </div>
          <div style={{ height: 60 }} />
        </div>
        <div className="chart-card glass">
          <div className="chart-title">Weekly Overview</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 9]} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid rgba(100,116,139,0.3)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="completed" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="chart-card glass" style={{ marginBottom: 20 }}>
        <div className="chart-title">30-Day Completion Rate</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
            <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} unit="%" domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid rgba(100,116,139,0.3)', borderRadius: 8, fontSize: 12 }}
              formatter={(val) => `${val}%`}
            />
            <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Badges */}
      <div className="glass-card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#e2e8f0', marginBottom: 14 }}>Badges</h3>
        <div className="badges-grid">
          {BADGES.map(badge => {
            const earned = earnedBadges.some(b => b.id === badge.id)
            return (
              <div key={badge.id} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-name">{badge.name}</div>
                <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>{badge.desc}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Weekly Targets */}
      <div className="tracker-category" style={{ borderLeft: '4px solid #22c55e' }}>
        <div className="tracker-title" style={{ color: '#22c55e' }}>Health Targets</div>
        {[
          { name: 'Gym sessions completed', target: '6/week' },
          { name: 'Steps hit 10K+', target: '7/7 days' },
          { name: 'Calorie deficit maintained', target: '6/7 days' },
          { name: 'Water 3L+ daily', target: '7/7 days' },
        ].map((m, i) => (
          <div key={i} className="tracker-metric">
            <span className="tracker-name">{m.name}</span>
            <span className="tracker-target" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.12)' }}>{m.target}</span>
          </div>
        ))}
      </div>

      <div className="tracker-category" style={{ borderLeft: '4px solid #a78bfa' }}>
        <div className="tracker-title" style={{ color: '#a78bfa' }}>Spirituality Targets</div>
        {[
          { name: 'Meditation sessions', target: '7/7 days' },
          { name: 'Pages read', target: '70/week' },
          { name: 'Screen-free before bed', target: '5/7 days' },
        ].map((m, i) => (
          <div key={i} className="tracker-metric">
            <span className="tracker-name">{m.name}</span>
            <span className="tracker-target" style={{ color: '#a78bfa', background: 'rgba(167,139,250,0.12)' }}>{m.target}</span>
          </div>
        ))}
      </div>

      <div className="tracker-category" style={{ borderLeft: '4px solid #f59e0b' }}>
        <div className="tracker-title" style={{ color: '#f59e0b' }}>Career Targets</div>
        {[
          { name: 'Deep work hours logged', target: '15+ hrs' },
          { name: 'GitHub commits', target: '5+/week' },
          { name: '30-Day Guide progress', target: '3-4 days/wk' },
          { name: 'Job applications sent', target: '10+/wk (wk5+)' },
        ].map((m, i) => (
          <div key={i} className="tracker-metric">
            <span className="tracker-name">{m.name}</span>
            <span className="tracker-target" style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.12)' }}>{m.target}</span>
          </div>
        ))}
      </div>

      <div className="tracker-category" style={{ borderLeft: '4px solid #ef4444' }}>
        <div className="tracker-title" style={{ color: '#ef4444' }}>ProDisk Targets</div>
        {[
          { name: 'LinkedIn connections sent', target: '50+/week' },
          { name: 'Cold emails sent', target: '75-100/wk' },
          { name: 'Reddit helpful comments', target: '10+/week' },
          { name: 'Warm leads generated', target: 'Track all' },
          { name: 'Quotes sent', target: 'Track all' },
        ].map((m, i) => (
          <div key={i} className="tracker-metric">
            <span className="tracker-name">{m.name}</span>
            <span className="tracker-target" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.12)' }}>{m.target}</span>
          </div>
        ))}
      </div>

      {/* Sunday Review */}
      <div className="info-box" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#f59e0b', marginBottom: 8 }}>Sunday Night Review (15 min)</h3>
        <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.7 }}>
          Every Sunday at 10 PM. Count your numbers. Ask: What worked? What didn't? What do I adjust? Write 3 bullet points in your notes app. This is your accountability system.
        </p>
      </div>

      {/* 8-Week Milestones */}
      <div className="info-box" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#22c55e', marginBottom: 8 }}>8-Week Milestones</h3>
        {[
          { week: 'End of Week 2', desc: 'Guide at Day 14. Upwork live. 100+ LinkedIn. 150+ cold emails. Gym locked in.' },
          { week: 'End of Week 4', desc: 'E-Commerce deployed. First warm leads. 300+ LinkedIn. Book #1 almost done.' },
          { week: 'End of Week 6', desc: 'POS deployed. Turing/Arc live. 30+ job apps. First ProDisk quote. Book #2 started.' },
          { week: 'End of Week 8', desc: '50+ apps. First paid gig. 2-3 ProDisk clients. $500/month achieved or clear path.', highlight: true },
        ].map((m, i) => (
          <div key={i} className="milestone-row" style={m.highlight ? { background: 'rgba(34,197,94,0.08)', borderRadius: 8 } : {}}>
            <span className="milestone-week">{m.week}</span>
            <span className="milestone-desc">{m.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
