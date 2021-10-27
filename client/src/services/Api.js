import axios from 'axios'

export default () => {
    return axios.create({
        // cors proxy url
        baseURL: 'http://localhost:3000/api'
    })
}
