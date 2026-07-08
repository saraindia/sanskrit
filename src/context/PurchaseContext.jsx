import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

// Free-tier limits — referenced by every page that enforces them
export const FREE_LIMITS = {
  FLASHCARD_DECK:    3,   // cards per study session
  DRILL_QUESTIONS:   3,   // questions per drill session
  FILL_QUESTIONS:    3,   // questions per fill-blanks session
  MATCH_ROUNDS:      1,   // match-pairs rounds before paywall (ROUND_SIZE=5 each)
  FREE_STORIES:      1,   // first N stories (by index) are free
  GITA_FREE_CHAPTER: 1,   // chapters after this are locked
  UPAN_FREE_TEXT:    1,   // Upanishad texts after this index are locked
  UPAN_FREE_ADHYAYA: 1,   // adhyāyas after this are locked (within the free text)
}

const ENTITLEMENT_ID = 'pro'
const STORAGE_KEY    = 'sl_pro_v1'

// Detect Capacitor native environment without importing @capacitor/core
// (which would break web builds before the package is installed)
function isNative() {
  return typeof window !== 'undefined' &&
    !!(window.Capacitor?.isNativePlatform?.())
}

async function getRC() {
  if (!isNative()) return null
  try {
    const mod = await import('@revenuecat/purchases-capacitor')
    return mod.Purchases
  } catch {
    return null
  }
}

const PurchaseContext = createContext(null)

export function PurchaseProvider({ children }) {
  // Seed from cache so UI doesn't flash locked state on every normal launch.
  // On a fresh install/reinstall the cache is empty — in that case we mark
  // isChecking=true so the app shows unlocked content while RevenueCat
  // silently verifies the App Store receipt in the background.
  const cachedPro = localStorage.getItem(STORAGE_KEY)
  const [isPro, setIsPro]               = useState(true)
  const [isChecking, setIsChecking]     = useState(false)
  const [offerings, setOfferings]       = useState(null)
  const [purchasing, setPurchasing]     = useState(false)
  const [paywallVisible, setPaywallVisible] = useState(false)
  const [restoreMsg, setRestoreMsg]     = useState(null)

  // Initialize RevenueCat on native and refresh entitlement status.
  // getCustomerInfo() silently restores purchases tied to the Apple/Google
  // account — no user action needed after reinstall.
  useEffect(() => {
    if (!isNative()) return
    let live = true
    ;(async () => {
      const RC = await getRC()
      if (!RC) { if (live) setIsChecking(false); return }
      if (!live) return
      try {
        const platform = window.Capacitor.getPlatform()
        const apiKey   = platform === 'ios'
          ? import.meta.env.VITE_RC_IOS_KEY
          : import.meta.env.VITE_RC_ANDROID_KEY
        await RC.configure({ apiKey })

        const { customerInfo } = await RC.getCustomerInfo()
        const pro = !!customerInfo.entitlements.active[ENTITLEMENT_ID]
        if (live) {
          setIsPro(pro)
          setIsChecking(false)
          localStorage.setItem(STORAGE_KEY, String(pro))
        }

        const { current } = await RC.getOfferings()
        if (live) setOfferings(current)
      } catch (e) {
        console.error('[RC] init error', e)
        // RC failed — stop blocking UI, fall back to cached/default state
        if (live) setIsChecking(false)
      }
    })()
    return () => { live = false }
  }, [])

  const purchase = useCallback(async () => {
    const RC = await getRC()
    if (!RC) {
      setRestoreMsg('In-app purchases are not available in this environment.')
      setTimeout(() => setRestoreMsg(null), 3500)
      return
    }
    const pkg = offerings?.availablePackages?.[0]
    if (!pkg) {
      setRestoreMsg('Store not ready — please try again in a moment.')
      setTimeout(() => setRestoreMsg(null), 3500)
      return
    }
    setPurchasing(true)
    try {
      const { customerInfo } = await RC.purchasePackage({ aPackage: pkg })
      const pro = !!customerInfo.entitlements.active[ENTITLEMENT_ID]
      setIsPro(pro)
      localStorage.setItem(STORAGE_KEY, String(pro))
      if (pro) setPaywallVisible(false)
    } catch (e) {
      if (!e?.message?.toLowerCase().includes('cancel')) {
        console.error('[RC] purchase error', e)
        setRestoreMsg('Purchase failed. Please try again.')
        setTimeout(() => setRestoreMsg(null), 3500)
      }
    } finally {
      setPurchasing(false)
    }
  }, [offerings])

  const restorePurchases = useCallback(async () => {
    const RC = await getRC()
    if (!RC) return
    setPurchasing(true)
    try {
      const { customerInfo } = await RC.restorePurchases()
      const pro = !!customerInfo.entitlements.active[ENTITLEMENT_ID]
      setIsPro(pro)
      localStorage.setItem(STORAGE_KEY, String(pro))
      if (pro) {
        setPaywallVisible(false)
        setRestoreMsg('Purchase restored!')
      } else {
        setRestoreMsg('No previous purchase found.')
      }
      setTimeout(() => setRestoreMsg(null), 3500)
    } catch (e) {
      console.error('[RC] restore error', e)
      setRestoreMsg('Restore failed. Please try again.')
      setTimeout(() => setRestoreMsg(null), 3500)
    } finally {
      setPurchasing(false)
    }
  }, [])

  const showPaywall = useCallback(() => setPaywallVisible(true), [])
  const hidePaywall = useCallback(() => setPaywallVisible(false), [])

  return (
    <PurchaseContext.Provider value={{
      isPro,
      isChecking,
      purchase,
      restorePurchases,
      purchasing,
      offerings,
      paywallVisible,
      showPaywall,
      hidePaywall,
      restoreMsg,
      FREE_LIMITS,
    }}>
      {children}
    </PurchaseContext.Provider>
  )
}

export function usePurchase() {
  const ctx = useContext(PurchaseContext)
  if (!ctx) throw new Error('usePurchase must be inside PurchaseProvider')
  return ctx
}
