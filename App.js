import './App.css';
import LandingPage from './LandingPage';
import MyCart from './MyCart.js';
import MyOrders from './MyOrders.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './LoginPage';
import Popup from './popup';


function App() {
  return (
    <Router>
        <Routes>
        <Route exact path="/" component={LoginPage} />
        <Route path="/menu" component={LandingPage} />
        <Route path="/cart" component={MyCart} />
        <Route path="/orders" component={MyOrders} />
        </Routes>
    </Router>
  );
}

export default App;
