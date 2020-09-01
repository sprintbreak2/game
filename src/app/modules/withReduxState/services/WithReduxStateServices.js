import Axios from 'axios'

export const saveEntity = (params) => Axios.post('/v1/Benefits', params)
