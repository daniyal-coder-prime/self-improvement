import { useState } from 'react'
import { requestNotificationPermission, getNotificationPermission, startNotificationScheduler } from '../lib/notifications'

export default function NotificationBanner() {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('lifeos_notif_dismissed') === 'true'
  })
  const [permission, setPermission] = useState(getNotificationPermission)

  if (dismissed || permission === 'granted' || permission === 'unsupported') return null

  async function handleEnable() {
    const granted = await requestNotificationPermission()
    if (granted) {
      setPermission('granted')
      startNotificationScheduler()
    } else {
      setPermission(Notification.permission)
    }
  }

  function handleDismiss() {
    setDismissed(true)
    localStorage.setItem('lifeos_notif_dismissed', 'true')
  }

  return (
    <div className="notif-banner">
      <span className="notif-banner-text">
        Enable notifications to get reminders for your daily schedule
      </span>
      <button className="notif-banner-btn" onClick={handleEnable}>
        Enable
      </button>
      <button className="notif-banner-dismiss" onClick={handleDismiss}>
        ×
      </button>
    </div>
  )
}
