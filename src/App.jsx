import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'
import PhilosophyTab from './components/tabs/PhilosophyTab'
import ScheduleTab from './components/tabs/ScheduleTab'
import HealthTab from './components/tabs/HealthTab'
import SpiritualityTab from './components/tabs/SpiritualityTab'
import CareerTab from './components/tabs/CareerTab'
import ProDiskTab from './components/tabs/ProDiskTab'
import TrackingTab from './components/tabs/TrackingTab'
import Auth from './components/Auth'
import NotificationBanner from './components/NotificationBanner'
import { supabase, isSupabaseConfigured } from './lib/supabase'
import { useHabits } from './hooks/useHabits'
import { startNotificationScheduler, getNotificationPermission, registerServiceWorker } from './lib/notifications'

function App() {
  const [activeTab, setActiveTab] = useState('philosophy')
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [skippedAuth, setSkippedAuth] = useState(false)

  const { completedToday, stats, toggleHabit, weeklyData, earnedBadges } = useHabits(
    skippedAuth ? null : supabase,
    user
  )

  // Check auth state
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setSkippedAuth(true)
      setAuthChecked(true)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthChecked(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Start notifications if already granted
  useEffect(() => {
    if (getNotificationPermission() === 'granted') {
      startNotificationScheduler()
    }
    registerServiceWorker()
  }, [])

  if (!authChecked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#64748b', fontSize: 14 }}>Loading...</div>
      </div>
    )
  }

  // Show auth screen if Supabase is configured and user isn't logged in
  if (isSupabaseConfigured() && !user && !skippedAuth) {
    return <Auth supabase={supabase} onAuth={(u) => { if (!u) setSkippedAuth(true) }} />
  }

  function renderTab() {
    switch (activeTab) {
      case 'philosophy': return <PhilosophyTab />
      case 'schedule': return <ScheduleTab />
      case 'health': return <HealthTab />
      case 'spirituality': return <SpiritualityTab />
      case 'career': return <CareerTab />
      case 'prodisk': return <ProDiskTab />
      case 'tracking': return (
        <TrackingTab
          completedToday={completedToday}
          stats={stats}
          toggleHabit={toggleHabit}
          weeklyData={weeklyData}
          earnedBadges={earnedBadges}
        />
      )
      default: return <PhilosophyTab />
    }
  }

  return (
    <>
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="content">
        <NotificationBanner />
        {renderTab()}
      </div>
      <div className="footer">
        {user && (
          <span style={{ marginRight: 12 }}>
            Signed in as {user.email} ·{' '}
            <button
              onClick={() => supabase?.auth.signOut()}
              style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', fontFamily: 'inherit', fontSize: 11 }}
            >
              Sign out
            </button>
          </span>
        )}
        Built from: Atomic Habits · Deep Work · Compound Effect · Can't Hurt Me · Mastery · Never Split the Difference · 7 Habits · Grit · Ali Abdaal · Alex Hormozi
      </div>
    </>
  )
}

export default App
