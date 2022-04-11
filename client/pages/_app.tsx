import type { AppProps } from 'next/app'
import '../global-styles/index.css'
import { GlobalStyle } from '../global-styles/globalStyle'
import { GlobalContextProvider } from '../state/globalState'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </>
  )
}

export default App
