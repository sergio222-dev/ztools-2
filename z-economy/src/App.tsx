import { ErrorBoundary } from '@organisms/ErrorBoundary/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@page/routes';
import Modal from 'react-modal';

const router = createBrowserRouter(routes);

function App() {
  Modal.setAppElement('#root');
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
