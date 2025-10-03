'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CustomerPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard by default
    router.push('/customer/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  )
}

