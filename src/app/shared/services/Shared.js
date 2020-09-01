import Axios from 'axios'

// REMEMBER: this is only for shared services. if your component must have own services, create a folder in /modules/{component}

export const getEntitie = (params) => Axios.post('/v1/Benefits', params)

export const saveEntity = (params) => Axios.post('/v1/Benefits', params)

export const deleteCEntitie = (params) => Axios.post('/v1/Benefits', params)
