import React, { Profiler } from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import { GlobalStyle } from './GlobalStyle'
import AppRouter from './routes/routes'
import { QueryClientProvider } from 'react-query'
import queryClient from 'services/queryClient'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'store'

import 'assets/css/accordion.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Profiler onRender={() => null} id="profiler">
        <ReduxProvider store={store}>
          <GlobalStyle />
          <AppRouter />
        </ReduxProvider>
      </Profiler>
    </QueryClientProvider>
  </React.StrictMode>
)
