import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import Loader from './components/loaders/Loader.tsx'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loader />}>
    <StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </StrictMode>
  </Suspense>
)
