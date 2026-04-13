export default function ProDiskTab() {
  return (
    <div>
      <h2 className="section-title" style={{ color: '#ef4444' }}>ProDisk — Client Acquisition</h2>

      <div className="card">
        <h3>Site Analysis</h3>
        <p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7}}>
          482K+ products live. Categories working. Product pages with pricing.{' '}
          <strong style={{color:'#f59e0b'}}>The site isn't the bottleneck — client acquisition is.</strong>{' '}
          Your partner handles fulfillment. Your ONLY job: bring buyers.
        </p>
      </div>

      <div className="card">
        <h3>Daily Outreach System — 2.25 hrs/day</h3>

        <div className="channel-card">
          <div className="channel-header">
            <span className="channel-name">LinkedIn Outreach</span>
            <span className="channel-time">45 min/day</span>
          </div>
          <ol className="channel-list">
            <li>Search: 'IT Manager' OR 'IT Director' OR 'Procurement Manager' at 50-500 employee companies</li>
            <li>Send 10 connection requests/day with personalized note (NOT a pitch)</li>
            <li>Once connected: value-first message — share a deal or IT resource</li>
            <li>3rd message: soft pitch — "Can I send you our catalog?"</li>
            <li>Post 2x/week: product highlight, client win, or IT insight</li>
          </ol>
          <div className="channel-metric">10 connections/day = 300/month</div>
        </div>

        <div className="channel-card">
          <div className="channel-header">
            <span className="channel-name">Apollo.io Cold Email</span>
            <span className="channel-time">45 min/day</span>
          </div>
          <ol className="channel-list">
            <li>Build list: IT managers, MSPs, procurement at US SMBs (50-500 employees)</li>
            <li>Send 15-20 personalized cold emails/day via Apollo sequences</li>
            <li>Structure: Their pain → Your solution → CTA ("Can I send a quote?")</li>
            <li>Follow-up sequence: Day 1 → Day 3 → Day 7 → Day 14</li>
            <li>Track open/reply rates. Iterate subject lines weekly.</li>
          </ol>
          <div className="channel-metric">15-20 emails/day = 400-500/month</div>
        </div>

        <div className="channel-card">
          <div className="channel-header">
            <span className="channel-name">Reddit Engagement</span>
            <span className="channel-time">30 min/day</span>
          </div>
          <ol className="channel-list">
            <li>Join: r/sysadmin, r/msp, r/homelab, r/networking, r/ITManagers</li>
            <li>DO NOT PITCH. Be genuinely helpful. Answer hardware questions.</li>
            <li>Naturally mention ProDisk when someone asks where to buy</li>
            <li>Build reputation as knowledgeable IT hardware person</li>
            <li>Weekly: Post a helpful 'deal roundup' in relevant subs</li>
          </ol>
          <div className="channel-metric">Build karma + 2-3 inbound inquiries/month</div>
        </div>
      </div>

      <div className="card">
        <h3>Target Client Priority</h3>
        {[
          { rank: '🥇', type: 'Managed Service Providers (MSPs)', why: '1 MSP = 10+ repeat orders/month. They buy hardware for THEIR clients. Goldmine.', bg: 'rgba(245,158,11,0.06)' },
          { rank: '🥈', type: 'IT Managers at SMBs (50-200 employees)', why: 'Regular hardware refresh. Need reliable vendor. Price-sensitive = your edge.' },
          { rank: '🥉', type: 'Schools / Colleges / Government', why: 'Bulk orders on budget. Slower cycle but high volume per deal.' },
          { rank: '4️⃣', type: 'Startups scaling infrastructure', why: 'Need hardware fast. Same-day dispatch is killer advantage.' },
        ].map((t, i) => (
          <div key={i} className="target-row" style={t.bg ? {background: t.bg} : {}}>
            <span className="target-rank">{t.rank}</span>
            <div>
              <div className="target-type">{t.type}</div>
              <div className="target-why">{t.why}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="info-box" style={{background:'linear-gradient(135deg,rgba(239,68,68,0.08),rgba(245,158,11,0.08))',border:'1px solid rgba(239,68,68,0.2)'}}>
        <h3 style={{fontSize:15,fontWeight:800,color:'#fca5a5',marginBottom:8}}>Revenue Math → $500/month</h3>
        <p style={{fontSize:13,color:'#e2e8f0',lineHeight:1.7}}>
          At 5% commission: need <strong style={{color:'#f59e0b'}}>$10,000 in sales/month</strong>. That's 5-8 medium orders. Even 2-3 MSP clients = done. 500 emails + 300 LinkedIn connections over 2 months = odds strongly in your favor.
        </p>
      </div>
    </div>
  )
}
