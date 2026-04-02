"use client";

// ─── Global Error Boundary ──────────────────────────────

import { Component, type ReactNode } from "react";
import { ErrorFallback } from "./ErrorFallback";
import { handleBoundaryError } from "@/lib/monitoring/errors";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    handleBoundaryError(error, { componentStack: errorInfo.componentStack ?? undefined });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={this.handleReset}
        />
      );
    }
    return this.props.children;
  }
}
