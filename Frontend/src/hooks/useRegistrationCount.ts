import { useEffect, useRef, useState } from 'react'

interface RegistrationCountResponse {
  count: number
}

interface UseRegistrationCountResult {
  count: number | null
  isLoading: boolean
  error: string | null
}

export const useRegistrationCount = (
  registrationCountUrl: string
): UseRegistrationCountResult => {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(registrationCountUrl))
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!registrationCountUrl) {
      setCount(null)
      setIsLoading(false)
      setError('Registration count unavailable')
      return
    }

    let intervalId: number | undefined
    let isMounted = true

    const fetchCount = async () => {
      abortControllerRef.current?.abort()
      const controller = new AbortController()
      abortControllerRef.current = controller

      if (isMounted && count === null) {
        setIsLoading(true)
      }

      try {
        const response = await fetch(registrationCountUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          },
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = (await response.json()) as Partial<RegistrationCountResponse>

        if (typeof data.count !== 'number' || Number.isNaN(data.count) || data.count < 0) {
          throw new Error('Invalid registration count format')
        }

        if (!isMounted) {
          return
        }

        setCount(Math.floor(data.count))
        setError(null)
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return
        }

        if (!isMounted) {
          return
        }

        setError('Registration count unavailable')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchCount()
      }
    }

    fetchCount()
    intervalId = window.setInterval(fetchCount, 60000)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      isMounted = false
      abortControllerRef.current?.abort()

      if (intervalId) {
        window.clearInterval(intervalId)
      }

      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [registrationCountUrl, count])

  return {
    count,
    isLoading,
    error
  }
}
