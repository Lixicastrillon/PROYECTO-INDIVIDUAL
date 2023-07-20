import './App.css';
import LandingPage from './Componentes/LandingPage/LandingPage';
import { Routes, Route , useLocation } from "react-router-dom";
import Cards from './Componentes/Cards/Cards';
import NavBar from "./Componentes/NavBar/NavBar";
import Detail from "./Componentes/Detail/Detail"
import Form from "./Componentes/Form/Form"


function App() {

  const {pathname} = useLocation()
  return (
    <div className='fondo'>
      {pathname !== "/" && pathname === "/home" && <NavBar/> }
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Cards/>}/>
      <Route path="/detail/:idRaza" element={<Detail/>}/>
      <Route path="/form" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
