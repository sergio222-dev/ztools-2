import { ErrorBoundary } from '@organisms/ErrorBoundary/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@page/routes';
import Modal from 'react-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

function App() {
  Modal.setAppElement('#root');
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
