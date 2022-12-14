import ReactDOM from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { store } from '@/store'
import { theme } from '@/ui/mui/v5'
import App from '@/App'

import '@/languages'
import '@/ui/styles'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const rootContainerEl = document.getElementById('root') as HTMLElement
const ReactDOMRoot = ReactDOM.createRoot(rootContainerEl)

const RootComponent = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  )
}

ReactDOMRoot.render(<RootComponent />)
