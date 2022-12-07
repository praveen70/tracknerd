import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/login/login";
import VehicleList from "./components/vehicles/vehicles";
import Map from "./components/map/map";
import * as AuthInterceptor from "./service/service";
AuthInterceptor.init();

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/vehicle-list" element={<VehicleList />} />
          <Route path="/map-view" element={<Map />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
