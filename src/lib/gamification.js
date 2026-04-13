export const HABITS = [
  { id: 'gym', label: 'Gym Completed', icon: '💪', category: 'health' },
  { id: 'steps', label: '10K+ Steps', icon: '🚶', category: 'health' },
  { id: 'meditation', label: 'Meditation Done', icon: '🧘', category: 'spirit' },
  { id: 'reading', label: '10 Pages Read', icon: '📖', category: 'spirit' },
  { id: 'deepwork', label: 'Deep Work (2.5hrs)', icon: '🔥', category: 'career' },
  { id: 'prodisk', label: 'ProDisk Outreach', icon: '📧', category: 'career' },
  { id: 'deficit', label: 'Calorie Deficit', icon: '🥗', category: 'health' },
  { id: 'water', label: 'Water 3L+', icon: '💧', category: 'health' },
  { id: 'screenoff', label: 'Screen-Free Bed', icon: '🌙', category: 'spirit' },
]

export const POINTS_PER_HABIT = 10
export const PERFECT_DAY_BONUS = 50
export const POINTS_PER_LEVEL = 500

export const BADGES = [
  { id: 'first_steps', name: 'First Steps', icon: '🌱', desc: 'Complete your first day', condition: (stats) => stats.totalDays >= 1 },
  { id: 'week_warrior', name: 'Week Warrior', icon: '⚔️', desc: '7-day streak', condition: (stats) => stats.bestStreak >= 7 },
  { id: 'iron_will', name: 'Iron Will', icon: '🛡️', desc: '14-day streak', condition: (stats) => stats.bestStreak >= 14 },
  { id: 'machine', name: 'Machine', icon: '🤖', desc: '30-day streak', condition: (stats) => stats.bestStreak >= 30 },
  { id: 'perfect_day', name: 'Perfect Day', icon: '⭐', desc: 'All habits in one day', condition: (stats) => stats.perfectDays >= 1 },
  { id: 'five_perfect', name: 'On Fire', icon: '🔥', desc: '5 perfect days', condition: (stats) => stats.perfectDays >= 5 },
  { id: 'bookworm', name: 'Bookworm', icon: '📚', desc: '30 days of reading', condition: (stats) => stats.habitCounts?.reading >= 30 },
  { id: 'zen_master', name: 'Zen Master', icon: '🧘', desc: '30 days of meditation', condition: (stats) => stats.habitCounts?.meditation >= 30 },
  { id: 'iron_body', name: 'Iron Body', icon: '💪', desc: '30 days of gym', condition: (stats) => stats.habitCounts?.gym >= 30 },
  { id: 'centurion', name: 'Centurion', icon: '💯', desc: 'Earn 1000 points', condition: (stats) => stats.totalPoints >= 1000 },
  { id: 'level5', name: 'Rising Star', icon: '🌟', desc: 'Reach Level 5', condition: (stats) => stats.level >= 5 },
  { id: 'level10', name: 'Legend', icon: '👑', desc: 'Reach Level 10', condition: (stats) => stats.level >= 10 },
]

export function calculatePoints(completedHabits) {
  const habitPoints = completedHabits.length * POINTS_PER_HABIT
  const perfectBonus = completedHabits.length === HABITS.length ? PERFECT_DAY_BONUS : 0
  return habitPoints + perfectBonus
}

export function getLevel(totalPoints) {
  return Math.floor(totalPoints / POINTS_PER_LEVEL) + 1
}

export function getLevelProgress(totalPoints) {
  return (totalPoints % POINTS_PER_LEVEL) / POINTS_PER_LEVEL
}

export function getEarnedBadges(stats) {
  return BADGES.filter(badge => badge.condition(stats))
}

export function getDateKey(date = new Date()) {
  return date.toISOString().split('T')[0]
}
