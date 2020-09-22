import Home from './modules/pages/components/Home/Home';
import Login from './modules/pages/components/Login/Login';
import Start from './modules/pages/components/Start/Start';

const ApplicationRoutes = {
    Routes: [
        { path: '/', exact: true, component: Home, key: 'home' },
        { path: '/login', exact: true, component: Login, key: 'login' },
        { path: '/start', exact: true, component: Start, protected: true, key: 'start' },
    ]
}

export default ApplicationRoutes;
