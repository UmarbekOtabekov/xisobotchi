import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './features/store.ts'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </StrictMode>
  </Suspense>
)
