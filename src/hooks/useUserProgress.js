// useUserProgress — thin wrapper that auto-injects the current user's storage key
// Use this everywhere instead of useProgress() directly, so all pages automatically
// get the right per-user data without needing to pass the key explicitly.
import { useAuth } from '../context/AuthContext'
import { useProgress } from './useProgress'

export function useUserProgress() {
  const { progressKey } = useAuth()
  return useProgress(progressKey)
}
