import { useCallback, useEffect, useState } from 'react'
import type { Photo } from '../types'

const PHOTO_API_URL = 'https://apis.scrimba.com/unsplash/photos/random/?orientation=landscape'
const DEFAULT_QUERY = 'Software'
const PHOTO_ERROR_MESSAGE = "We couldn't find a photo right now. Please try again."

const loadPhoto = async (query: string, signal: AbortSignal): Promise<Photo> => {
  const queryParam = query ? `&query=${encodeURIComponent(query)}` : ''
  const response = await fetch(`${PHOTO_API_URL}${queryParam}`, { signal })

  if (!response.ok) {
    throw new Error(`Photo request failed with status ${response.status}`)
  }

  return response.json() as Promise<Photo>
}

export function usePhotoSearch() {
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [requestId, setRequestId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback((nextQuery: string) => {
    setError(null)
    setIsLoading(true)
    setQuery(nextQuery)
    setRequestId((currentRequestId) => currentRequestId + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    loadPhoto(query, controller.signal)
      .then(setPhoto)
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return
        }

        setError(PHOTO_ERROR_MESSAGE)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => controller.abort()
  }, [query, requestId])

  return { photo, query, isLoading, error, search }
}
