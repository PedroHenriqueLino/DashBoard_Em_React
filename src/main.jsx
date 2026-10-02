import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Componente
import HomePage from './routes/HomePage.jsx'
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx'
import ClientesPage from './routes/ClientesPage.jsx'
import VendasPage from './routes/VendasPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: "/clientes",
        element: <ClientesPage />
      },
      {
        path: "/vendas",
        element: <VendasPage />
      }
    ]
  }
])

//Context
import { useContext } from 'react'
import { DashboardContextProvider } from './Context/DashboardContext.jsx'
import { DashboardContext } from './Context/DashboardContext.jsx'

const Root = () => {

  const { darkMode } = useContext(DashboardContext);

  return (
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <RouterProvider router={router} />
    </div>
  );
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardContextProvider >

      <Root />

    </DashboardContextProvider>

  </StrictMode>,
)
