import type { FormEvent, Dispatch, SetStateAction } from 'react'

type PhotoSearchPanelProps = {
  error: string | null
  isLoading: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

export function PhotoSearchPanel({
  error,
  isLoading,
  onSubmit,
  searchTerm,
  setSearchTerm,
}: PhotoSearchPanelProps) {
  return (
    <section className="search-panel" aria-label="Photo search">
      <p className="eyebrow">LinkedIn header generator</p>
      <h1>Find a backdrop that fits your story.</h1>
      <p className="search-help">
        Search Unsplash for a landscape, then use the red frame to keep your
        design inside the LinkedIn crop.
      </p>
      <form className="search-form" onSubmit={onSubmit}>
        <label htmlFor="photo-search">Search for a photo</label>
        <div className="search-controls">
          <input
            id="photo-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Try “mountains” or “creative studio”"
            autoComplete="off"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      <p className={`search-status${error ? ' search-status--error' : ''}`} aria-live="polite">
        {error ?? (isLoading ? 'Finding your next backdrop...' : 'Drag your attention to the red crop line.')}
      </p>
    </section>
  )
}
