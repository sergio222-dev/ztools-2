import { ErrorBoundary } from '@organisms/ErrorBoundary/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@page/routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
