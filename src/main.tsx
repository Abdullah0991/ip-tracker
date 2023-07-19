import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import AppStateProvider from './app/StateContext.tsx'

const theme = extendTheme({
    fonts: {
        body: "Rubik, sans-serif",
        heading: "Rubik, serif",
        mono: "Rubik, monospace",
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme} resetCSS>
        <AppStateProvider>
            <App />
        </AppStateProvider>
    </ChakraProvider>,
)
