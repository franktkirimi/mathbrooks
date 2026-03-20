import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("App error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="font-display text-xs tracking-[0.2em] text-primary uppercase mb-4">Something went wrong</p>
            <h1 className="font-display text-2xl text-foreground mb-4">Unexpected Error</h1>
            <p className="text-sm font-light text-muted-foreground mb-8">
              An unexpected error occurred. Please refresh the page or contact us if the issue persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-display text-xs tracking-[0.15em] uppercase text-primary border border-primary/40 px-6 py-3 hover:bg-primary/10 transition-colors duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
