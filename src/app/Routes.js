import Home from './modules/home/components/Home'
import WithState from './modules/withState/components/WithState'
import WithStateClass from './modules/withStateClass/components/WithStateClass'
import WithReduxState from './modules/withReduxState/components/WithReduxStateContainer'

const ApplicationRoutes = {
    Routes: [
        {
            path: '/withState',
            exact: true,
            component: WithState,
            key: 'withState'
        },
        {
            path: '/withStateClass/:clicks',
            exact: true,
            component: WithStateClass,
            key: 'withStateClass'
        },
        {
            path: '/withReduxState',
            exact: true,
            component: WithReduxState,
            key: 'withReduxState'
        },
        { component: Home, key: 'home' }
    ]
}

export default ApplicationRoutes
