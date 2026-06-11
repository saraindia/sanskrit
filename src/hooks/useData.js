import { useState, useEffect } from 'react'
import { loadVocabulary, loadSentences } from '../data/dataLoader'

export function useVocabularyData() {
  const [data, setData] = useState(null)
  useEffect(() => { loadVocabulary().then(setData) }, [])
  return data
}

export function useSentenceData() {
  const [data, setData] = useState(null)
  useEffect(() => { loadSentences().then(setData) }, [])
  return data
}
