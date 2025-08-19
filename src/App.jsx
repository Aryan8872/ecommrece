import { ToastContainer } from 'react-toastify'
import Router from './routing/Router'

const App = () => {
  return (
    <div>
      <Router />
      <ToastContainer
        position='top-right'
        pauseOnHover
        autoClose={3000}
      />
    </div>
  )
}

export default App
