import { ErrorBoundary } from '@organisms/ErrorBoundary/ErrorBoundary';
import { MainLayout } from '@page/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@page/routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <ErrorBoundary>
      <MainLayout>
        <RouterProvider router={router} />
      </MainLayout>
    </ErrorBoundary>
  );
}

export default App;
