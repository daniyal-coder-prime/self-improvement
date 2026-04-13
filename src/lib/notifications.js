const SCHEDULE_NOTIFICATIONS = [
  { hour: 7, minute: 0, title: 'Meditation Time', body: 'Start your day with 10 minutes of mindfulness', icon: '🧘' },
  { hour: 7, minute: 30, title: 'Gym Time', body: 'PPL workout — let\'s get those gains', icon: '💪' },
  { hour: 10, minute: 30, title: 'DEEP WORK Starts NOW', body: '2.5 hours of focused coding. Phone away. Zero distractions.', icon: '🔥' },
  { hour: 13, minute: 30, title: 'ProDisk Outreach', body: 'LinkedIn connections + cold emails. Volume is your weapon.', icon: '📧' },
  { hour: 17, minute: 30, title: 'Walk #2', body: 'Evening walk — decompress and hit your step goal', icon: '🚶' },
  { hour: 21, minute: 30, title: 'Reading Time', body: '10 pages tonight. Phone on airplane mode.', icon: '📖' },
  { hour: 23, minute: 30, title: 'Wind Down', body: 'No screens. Prepare for sleep.', icon: '🌙' },
]

let notifInterval = null

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export function getNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported'
  return Notification.permission
}

export function startNotificationScheduler() {
  if (notifInterval) return
  if (Notification.permission !== 'granted') return

  // Check every minute
  notifInterval = setInterval(() => {
    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes()

    SCHEDULE_NOTIFICATIONS.forEach(notif => {
      if (notif.hour === h && notif.minute === m) {
        new Notification(notif.title, {
          body: notif.body,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          tag: `lifeos-${notif.hour}-${notif.minute}`,
          requireInteraction: true,
        })
      }
    })
  }, 60000) // Every 60 seconds
}

export function stopNotificationScheduler() {
  if (notifInterval) {
    clearInterval(notifInterval)
    notifInterval = null
  }
}

// Register service worker for PWA
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js')
    } catch (err) {
      console.warn('SW registration failed:', err)
    }
  }
}
