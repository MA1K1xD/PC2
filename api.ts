import axios from "axios"

const api =axios.create({
    baseURL : "https://cs2031-2026-1-pc2-techstore-production.up.railway.app/",
    headers : {
        "Content-type": "application/json",
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

export default api;