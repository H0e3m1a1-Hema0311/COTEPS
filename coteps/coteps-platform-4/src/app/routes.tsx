import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from '../features/admin/pages/AdminDashboard';
import UserDashboard from '../features/user/pages/UserDashboard';
import DeliveryDashboard from '../features/delivery/pages/DeliveryDashboard';
import NotFound from '../shared/components/NotFound';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin" component={AdminDashboard} />
                <Route path="/user" component={UserDashboard} />
                <Route path="/delivery" component={DeliveryDashboard} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default Routes;