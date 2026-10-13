import { useState } from 'react'
import { HeaderCanvas } from './components/HeaderCanvas'
import { LoadingState } from './components/LoadingState'
import { PhotoSearchPanel } from './components/PhotoSearchPanel'
import { usePhotoSearch } from './hooks/usePhotoSearch'

function App() {
  const { photo, query, isLoading, error, search } = usePhotoSearch()
  const [searchTerm, setSearchTerm] = useState(query)

  const searchPhotos = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextQuery = searchTerm.trim()

    search(nextQuery)
  }

  if (!photo) {
    return <LoadingState message={error ?? 'Loading your header backdrop...'} isError={Boolean(error)} />
  }

  return (
    <main className="app-shell">
      <HeaderCanvas photo={photo} />
      <PhotoSearchPanel
        error={error}
        isLoading={isLoading}
        onSubmit={searchPhotos}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </main>
  )
}

export default App
