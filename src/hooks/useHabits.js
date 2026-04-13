import { useState, useEffect, useCallback } from 'react'
import { HABITS, calculatePoints, getLevel, getDateKey, getEarnedBadges } from '../lib/gamification'

const STORAGE_KEY = 'lifeos_habits'
const STATS_KEY = 'lifeos_stats'

function loadFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch { /* ignore */ }
}

function getDefaultStats() {
  return {
    totalPoints: 0,
    currentStreak: 0,
    bestStreak: 0,
    level: 1,
    totalDays: 0,
    perfectDays: 0,
    habitCounts: {},
    dailyHistory: {},
  }
}

export function useHabits(supabase, user) {
  const today = getDateKey()
  const [completedToday, setCompletedToday] = useState(() => {
    const all = loadFromStorage(STORAGE_KEY, {})
    return all[today] || []
  })
  const [stats, setStats] = useState(() => loadFromStorage(STATS_KEY, getDefaultStats()))

  // Sync from Supabase on login
  useEffect(() => {
    if (!supabase || !user) return
    async function syncFromSupabase() {
      try {
        // Load today's completions
        const { data: todayData } = await supabase
          .from('habit_completions')
          .select('habit_name')
          .eq('user_id', user.id)
          .eq('completed_date', today)

        if (todayData && todayData.length > 0) {
          const habits = todayData.map(d => d.habit_name)
          setCompletedToday(habits)
          const all = loadFromStorage(STORAGE_KEY, {})
          all[today] = habits
          saveToStorage(STORAGE_KEY, all)
        }

        // Load stats
        const { data: statsData } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (statsData) {
          const merged = {
            totalPoints: statsData.total_points || 0,
            currentStreak: statsData.current_streak || 0,
            bestStreak: statsData.best_streak || 0,
            level: statsData.level || 1,
            totalDays: statsData.total_days || 0,
            perfectDays: statsData.perfect_days || 0,
            habitCounts: statsData.habit_counts || {},
            dailyHistory: statsData.daily_history || {},
          }
          setStats(merged)
          saveToStorage(STATS_KEY, merged)
        }
      } catch (err) {
        console.warn('Supabase sync failed, using local data:', err)
      }
    }
    syncFromSupabase()
  }, [supabase, user, today])

  const toggleHabit = useCallback(async (habitId) => {
    setCompletedToday(prev => {
      const isCompleted = prev.includes(habitId)
      const next = isCompleted ? prev.filter(h => h !== habitId) : [...prev, habitId]

      // Save to localStorage
      const all = loadFromStorage(STORAGE_KEY, {})
      all[today] = next
      saveToStorage(STORAGE_KEY, all)

      // Update stats
      setStats(prevStats => {
        const pointsToday = calculatePoints(next)
        const prevPointsToday = calculatePoints(prev)
        const pointsDiff = pointsToday - prevPointsToday

        const newCounts = { ...prevStats.habitCounts }
        if (!isCompleted) {
          newCounts[habitId] = (newCounts[habitId] || 0) + 1
        } else {
          newCounts[habitId] = Math.max(0, (newCounts[habitId] || 0) - 1)
        }

        const isPerfect = next.length === HABITS.length
        const wasPerfect = prev.length === HABITS.length
        let perfectDays = prevStats.perfectDays
        if (isPerfect && !wasPerfect) perfectDays++
        if (!isPerfect && wasPerfect) perfectDays = Math.max(0, perfectDays - 1)

        const newHistory = { ...prevStats.dailyHistory }
        newHistory[today] = next.length

        // Streak calculation
        let streak = 0
        const d = new Date()
        for (let i = 0; i < 365; i++) {
          const key = getDateKey(d)
          const count = key === today ? next.length : (newHistory[key] || 0)
          if (count >= 7) {
            streak++
            d.setDate(d.getDate() - 1)
          } else if (i === 0) {
            // Today might not be complete yet
            d.setDate(d.getDate() - 1)
            continue
          } else {
            break
          }
        }

        const newStats = {
          ...prevStats,
          totalPoints: prevStats.totalPoints + pointsDiff,
          currentStreak: streak,
          bestStreak: Math.max(prevStats.bestStreak, streak),
          level: getLevel(prevStats.totalPoints + pointsDiff),
          totalDays: Object.keys(newHistory).filter(k => (newHistory[k] || 0) > 0).length,
          perfectDays,
          habitCounts: newCounts,
          dailyHistory: newHistory,
        }
        saveToStorage(STATS_KEY, newStats)

        // Sync to Supabase
        if (supabase && user) {
          syncToSupabase(supabase, user, habitId, !isCompleted, today, newStats)
        }

        return newStats
      })

      return next
    })
  }, [today, supabase, user])

  const weeklyData = getWeeklyData(stats.dailyHistory)
  const earnedBadges = getEarnedBadges(stats)

  return { completedToday, stats, toggleHabit, weeklyData, earnedBadges }
}

async function syncToSupabase(supabase, user, habitId, completed, date, stats) {
  try {
    if (completed) {
      await supabase.from('habit_completions').upsert({
        user_id: user.id,
        habit_name: habitId,
        completed_date: date,
      }, { onConflict: 'user_id,habit_name,completed_date' })
    } else {
      await supabase.from('habit_completions')
        .delete()
        .eq('user_id', user.id)
        .eq('habit_name', habitId)
        .eq('completed_date', date)
    }

    await supabase.from('user_stats').upsert({
      user_id: user.id,
      total_points: stats.totalPoints,
      current_streak: stats.currentStreak,
      best_streak: stats.bestStreak,
      level: stats.level,
      total_days: stats.totalDays,
      perfect_days: stats.perfectDays,
      habit_counts: stats.habitCounts,
      daily_history: stats.dailyHistory,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
  } catch (err) {
    console.warn('Supabase sync error:', err)
  }
}

function getWeeklyData(history) {
  const data = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = getDateKey(d)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    data.push({
      day: dayNames[d.getDay()],
      completed: history[key] || 0,
      total: 9,
    })
  }
  return data
}
