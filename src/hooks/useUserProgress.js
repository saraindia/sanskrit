// useUserProgress — anonymous progress stored under a single device key.
// No user account required.
import { useProgress } from './useProgress'

const PROGRESS_KEY = 'sl_progress_v1'

export function useUserProgress() {
  return useProgress(PROGRESS_KEY)
}
