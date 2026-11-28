import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected error occurred.',
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PHERI NEPAL ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-rose-300 p-6 space-y-4 shadow-lg">
            <div className="flex items-center gap-2.5 text-rose-900 font-bold text-lg">
              <AlertTriangle className="w-6 h-6 text-rose-700 shrink-0" />
              <span>PHERI NEPAL — Security & Runtime Diagnostic</span>
            </div>
            <p className="text-xs text-[#263746] leading-relaxed">
              An operation was blocked or encountered a runtime exception. Structured diagnostic context:
            </p>
            <pre className="p-3 rounded-lg bg-[#F7F5EF] border border-[#123D32]/15 text-[11px] font-mono-code text-[#123D32] overflow-x-auto whitespace-pre-wrap">
              {this.state.errorMessage}
            </pre>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, errorMessage: '' });
                window.location.reload();
              }}
              className="px-4 py-2 rounded-lg bg-[#123D32] text-[#F7F5EF] text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload PHERI NEPAL</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
