import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Explore from './pages/Explore';
import RecipeDetails from './pages/RecipeDetails';
import AddRestaurant from './pages/AddRestaurant';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import { useNavigate, useLocation } from 'react-router-dom';
import EditRecipe from './pages/EditRecipe';
import EditRestaurant from './pages/EditRestaurant';
import GoToTop from './components/GoToTop';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore/recipe" element={<Explore />} />
        <Route path="/explore/restaurant" element={<Explore />} />
        <Route path="/explore/:id" element={<RecipeDetails />} />
        <Route path="/addrestaurant" element={<AddRestaurant/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/editrecipe" element={<EditRecipe/>} />
        <Route path="/editrestaurant" element={<EditRestaurant/>} />

      </Routes>
      <GoToTop/>
      <Footer/>
    
    </div>
  );
}

export default App;
