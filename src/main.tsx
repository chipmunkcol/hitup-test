import { createRoot } from 'react-dom/client';
// import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';

const queryClient = new QueryClient();

// async function prepare() {
//   const { setupWorker } = await import('msw/browser');
//   const { mockApiHandlers } = await import('./mockApiHandlers.ts');
//   const worker = setupWorker(...mockApiHandlers);
//   return worker.start();
// }

// prepare().then(() => {
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  // </StrictMode>
);
// });
