import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './layout/Header.jsx'
import PageContent from './layout/PageContent.jsx'
import Footer from './layout/Footer.jsx'
import { verifyToken } from './store/actions/clientActions.js'
import { fetchCategories } from './store/actions/productActions.js'

function App() {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.client.language)

  useEffect(() => {
    // T11: localStorage'da token varsa otomatik giris
    dispatch(verifyToken())
    // T12: kategoriler uygulama acilisinda cekiliyor
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <PageContent />
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3500} />
    </div>
  )
}

export default App
