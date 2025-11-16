import { TamaguiProvider } from 'tamagui'
import Login from './pages/login/Login'
import tamaguiConfig from './tamagui.config'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Home from './pages/home/Home'
import { PrimeReactProvider } from 'primereact/api';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/dashboard',
      element: <Home />
    }
  ])

  return (
    <>
      <TamaguiProvider config={tamaguiConfig}>
        <PrimeReactProvider>
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </TamaguiProvider>
    </>
  )
}

export default App
