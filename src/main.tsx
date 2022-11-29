import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { setup } from 'goober'
import { createGlobalStyles } from 'goober/global'
import { ActivateAudio } from './components/ActivateAudio'
import { Loading } from './components/Loading'
import { ContextProvider } from './context'

const App = React.lazy(() =>
  Promise.all([import('./App'), new Promise((resolve) => setTimeout(resolve, 2000))]).then(([module]) => module)
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <ActivateAudio />
  },
  {
    path: 'sequence-s',
    element: (
      <React.Suspense fallback={<Loading />}>
        <App />
      </React.Suspense>
    )
  }
])

setup(React.createElement)

const GlobalStyles = createGlobalStyles`
  body,html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 400;
  }
`

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
)
