import { useMemo } from 'react'
import dailyInsights from '../data/dailyInsights.json'

// Start date for the rotation - the day the app goes live
const START_DATE = new Date('2026-04-13')

export function useDailyContent() {
  return useMemo(() => {
    const now = new Date()
    const diffTime = now.getTime() - START_DATE.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    // Cycle through the pool
    const totalDays = dailyInsights.length
    const dayIndex = ((diffDays % totalDays) + totalDays) % totalDays

    return {
      dayNumber: diffDays + 1,
      insights: dailyInsights[dayIndex]?.insights || dailyInsights[0]?.insights || [],
      totalPool: totalDays,
    }
  }, [])
}
