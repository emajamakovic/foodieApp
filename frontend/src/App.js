import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
      </Routes>
    
    </div>
  );
}

export default App;
