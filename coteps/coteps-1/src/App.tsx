import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import UserPortal from './pages/user/UserPortal';
import AdminPortal from './pages/admin/AdminPortal';
import DeliveryPortal from './pages/delivery/DeliveryPortal';
import Auth from './pages/auth/Auth';
import AIchef from './components/aiChef/AIchef';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <AIchef />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" component={UserPortal} />
          <Route path="/admin" component={AdminPortal} />
          <Route path="/delivery" component={DeliveryPortal} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;