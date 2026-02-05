import * as React from "react"
import { useNavigate } from "react-router-dom"
import CampaignForm from "../components/CampaignForm"
import api from "../services/api"
import { Loader2, ArrowLeft } from "lucide-react" // icônes pour loader et retour

interface FormData {
  name: string
  advertiser: string
  budget: number
}

const CreateCampaign: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleCreate = async (data: FormData) => {
    setLoading(true)
    setSuccess(false)
    setError("")
    try {
      await api.post("/campaigns", {
        ...data,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
      })
      setSuccess(true)
    } catch (err) {
      console.error("Erreur lors de la création :", err)
      setError("Erreur lors de la création de la campagne")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex flex-col items-center">
      {/* 🔹 Header / Navigation */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Créer une campagne</h1>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
          <ArrowLeft size={18} />
          Retour
        </button>
      </div>

      {/* 🔹 Card formulaire */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-6 animate-fadeIn">
        {success && (
          <p className="mb-4 text-green-600 font-medium text-center">
            Campagne créée avec succès !
          </p>
        )}
        {error && (
          <p className="mb-4 text-red-600 font-medium text-center">{error}</p>
        )}

        <CampaignForm onCreate={handleCreate}  />

        {/* 🔹 Loader overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl">
            <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateCampaign
