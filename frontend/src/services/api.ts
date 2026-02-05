import axios from "axios"

// Remplace ce port par celui de ton backend
const API_URL = "http://localhost:3000"

// Création d'une instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Optionnel : tu peux gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api
