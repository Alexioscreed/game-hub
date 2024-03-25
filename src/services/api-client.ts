import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'c5766c2acac84ddc9f02707535453625'
    }
})