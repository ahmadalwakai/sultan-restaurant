"use client";

// ─── Section Error Boundary ─────────────────────────────

import { Component, type ReactNode } from "react";
import { ErrorFallbackMinimal } from "./ErrorFallbackMinimal";
import { handleBoundaryError } from "@/lib/monitoring/errors";

type Props = {
  children: ReactNode;
  sectionName?: string;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
};

export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    handleBoundaryError(error, { componentStack: errorInfo.componentStack ?? undefined });
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <ErrorFallbackMinimal
          message={`Failed to load ${this.props.sectionName ?? "this section"}`}
          onRetry={this.handleRetry}
        />
      );
    }
    return this.props.children;
  }
}
