import { RouterProvider } from 'react-router';
import GlobalProvider from './providers/GlobalProvider';
import router from './router';
import { CurrencyProvider } from './providers/CurrencyProvider';

function App() {
  return (
    <GlobalProvider>
      <CurrencyProvider>
        <RouterProvider router={router} />
      </CurrencyProvider>
    </GlobalProvider>
  );
}

export default App;
