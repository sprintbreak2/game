import Home from './modules/pages/components/Home/Home';
import Login from './modules/pages/components/Login/Login';
import Room from './modules/pages/components/Room/Room';

const ApplicationRoutes = {
    Routes: [
        { path: '/', exact: true, component: Home, key: 'home' },
        { path: '/login', exact: true, component: Login, key: 'login' },
        { path: '/room', exact: true, component: Room, protected: true, key: 'room' },
    ]
}

export default ApplicationRoutes;
