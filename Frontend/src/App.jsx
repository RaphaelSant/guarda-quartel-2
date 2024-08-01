import Rotas from './components/route'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <Rotas />
      <ToastContainer 
        autoClose={3000}
        position="top-center"
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
        className="toast-container" 
        transition:Bounce
      />
    </>
  )
}

export default App
