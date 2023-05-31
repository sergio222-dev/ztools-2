import { ErrorBoundary } from '@organisms/ErrorBoundary/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes, withLayout } from '@page/routes';

const router = createBrowserRouter(withLayout(routes));

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
