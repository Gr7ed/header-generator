type LoadingStateProps = {
  message: string
  isError?: boolean
}

export function LoadingState({ message, isError = false }: LoadingStateProps) {
  return (
    <main className="app-shell loading-shell">
      <section className={`loading-state${isError ? ' loading-state--error' : ''}`} aria-live="polite">
        {!isError && <span className="loading-spinner" aria-hidden="true" />}
        {message}
      </section>
    </main>
  )
}
