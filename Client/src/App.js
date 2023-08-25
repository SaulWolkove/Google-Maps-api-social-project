import Home from "./components/Home";
import { Route, Routes, Redirect, Navigate} from "react-router-dom";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";
import { createContext, useContext, useState} from "react";
import Header from "./components/Header"
export const TokenContext = createContext(null)
// const ProtectedRoute = ({element}) => {
//   const [token] = useContext(TokenContext)
//   return token ? element : <Navigate to="/login"/>
// }

function App() {
  const [token,setToken] = useState(null)

  return (
    <div>
      <TokenContext.Provider value={[token, setToken]}>
        <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route exact path="/login" element={<LoginScreen/>}/>
        <Route path="/register" element={<RegisterScreen/>}/>
      </Routes>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
