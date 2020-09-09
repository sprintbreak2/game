import Home from './modules/pages/components/Home/Home';
import Login from './modules/pages/components/Login/Login';

const ApplicationRoutes = {
    Routes: [
        { path: '/', exact: true, component: Home, key: 'home' },
        { path: '/login', exact: true, component: Login, key: 'login' },
    ]
}

export default ApplicationRoutes
