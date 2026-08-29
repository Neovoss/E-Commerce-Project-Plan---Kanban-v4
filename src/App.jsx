import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './layout/Header.jsx'
import PageContent from './layout/PageContent.jsx'
import Footer from './layout/Footer.jsx'

function App() {
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
