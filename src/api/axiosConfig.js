import axios from "axios";
const instance=axios.create({
    baseURL:'https://movie-api-production-90fd.up.railway.app/'
})

export default instance;