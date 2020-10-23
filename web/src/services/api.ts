import axios from 'axios'; 

const api = axios.create({
    baseURL:'http://localhost:3333', //conexão do front com o back
});

export default api;