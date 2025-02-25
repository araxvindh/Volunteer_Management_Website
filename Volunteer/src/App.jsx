import Home from "./components/functionalComponents/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./components/functionalComponents/Login"
import UserSignin from "./components/functionalComponents/UserSignin"
import UserJoin from "./components/functionalComponents/UserJoin"
import AdminControl from "./components/functionalComponents/AdminControl"
import AdminSignin from "./components/functionalComponents/AdminSignin"
function App() {


  return (
          <main>
            <BrowserRouter>
            <Routes>
              <Route path="/home" element={<Home></Home>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/user-signup" element={<UserSignin></UserSignin>}></Route>
              <Route path="/user" element={<UserJoin></UserJoin>}></Route>
              <Route path="/admin" element={<AdminControl></AdminControl>}></Route>
              <Route path="/admin-signup" element={<AdminSignin></AdminSignin>}></Route>
            </Routes>
            </BrowserRouter>
          </main>
  )
}

export default App
