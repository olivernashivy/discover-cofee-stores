import '@/styles/globals.css'
import Footer from './_footer'

export default function App({ Component, pageProps }) {
  return <div>
    <Component {...pageProps} />
    <Footer/>
  
  </div>
}
