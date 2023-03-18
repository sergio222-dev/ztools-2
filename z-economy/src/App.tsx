import { ErrorBoundary } from './app/components/organisms/ErrorBoundary/ErrorBoundary';
import { MainLayout } from './app/page/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './app/page/routes';

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
