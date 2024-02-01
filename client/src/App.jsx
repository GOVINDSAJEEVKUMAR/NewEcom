import './App.css'
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { LoginPage, SignupPage,ActivationPAge } from './Routes';
import {Bounce, ToastContainer} from "react-toastify";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path="" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path='/activation/:activation_token'element={<ActivationPAge/>}/>
    </Routes>
    <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
    </BrowserRouter>
      </>
  )
}

export default App
