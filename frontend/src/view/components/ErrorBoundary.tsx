import { Component, ErrorInfo } from 'react';
/* import * as Sentry from "@sentry/react"; */

interface IErrorBoundaryState {
  hasError: boolean;
}

interface IErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
    if (import.meta.env.PROD) {
      // Sentry.captureException(error);
      return;
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
