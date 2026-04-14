import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)',
            padding: '2rem',
          }}
        >
          <div
            className="card p-10 flex flex-col items-center gap-5
                       text-center max-w-md w-full"
          >
            <span style={{ fontSize: 48 }}>⚠️</span>
            <h2
              className="text-2xl font-serif font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              Something went wrong
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              {this.state.error?.message ?? 'An unexpected error occurred'}
            </p>
            <div className="flex gap-3">
              <button
                className="btn-primary"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Try Again
              </button>
              <button
                className="btn-ghost"
                onClick={() => window.location.href = '/'}
              >
                Go to Dashboard
              </button>
            </div>
            <p
              className="text-xs"
              style={{ color: 'var(--text-muted)', opacity: 0.6 }}
            >
              Your journal data is safe — this is a display error only.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
