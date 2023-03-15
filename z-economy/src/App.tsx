import { Home } from './app/page/Home';
import { ErrorBoundary } from './app/components/organisms/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}

export default App;
