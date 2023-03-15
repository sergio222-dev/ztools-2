import { Component, PropsWithChildren } from 'react';

export class ErrorBoundary extends Component<PropsWithChildren<object>, { hasError: boolean }> {
  constructor(props: PropsWithChildren) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: object) {
    console.log(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}
