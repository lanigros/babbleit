import type { AppProps } from 'next/app'
import '../global-styles/index.css'
import { GlobalStyle } from '../global-styles/globalStyle'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
