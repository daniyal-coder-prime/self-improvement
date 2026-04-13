const TABS = [
  { id: 'philosophy', label: 'Philosophy', icon: '' },
  { id: 'schedule', label: 'Schedule', icon: '' },
  { id: 'health', label: 'Health', icon: '' },
  { id: 'spirituality', label: 'Spirituality', icon: '' },
  { id: 'career', label: 'Career', icon: '' },
  { id: 'prodisk', label: 'ProDisk', icon: '' },
  { id: 'tracking', label: 'Tracking', icon: '' },
]

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div className="tabs">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  )
}
