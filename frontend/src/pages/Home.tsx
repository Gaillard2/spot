import * as React from "react"
import { useNavigate } from "react-router-dom"
import CampaignList from "../components/CampaignList"
import api from "../services/api"
import StatistiqueCampaign from "../components/Statistique"
import { FiBarChart2, FiList, FiPlus } from "react-icons/fi"

interface Campaign {
  id: string
  name: string
  advertiser: string
  budget: number
  status: "active" | "paused"
  impressions: number
  clicks: number
  ctr: number
  cpc: number
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const limit = 10
  const [total, setTotal] = React.useState(0)

  const fetchCampaigns = async (pageNumber = page) => {
    setLoading(true)
    try {
      const res = await api.get(`/campaigns?page=${pageNumber}&limit=${limit}`)
      const mappedCampaigns: Campaign[] = res.data.campaigns.map((c: any) => ({
        id: c._id,
        name: c.name,
        advertiser: c.advertiser,
        budget: c.budget,
        status: c.status,
        impressions: c.impressions || 0,
        clicks: c.clicks || 0,
        ctr: c.impressions > 0 ? (c.clicks / c.impressions) * 100 : 0,
        cpc: c.clicks > 0 ? c.budget / c.clicks : 0,
      }))
      setCampaigns(mappedCampaigns)
      setTotal(res.data.total)
      setPage(res.data.page)
    } catch (err) {
      console.error("Error fetching campaigns:", err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchCampaigns()
  }, [])

  const toggleStatus = async (id: string, status: "active" | "paused") => {
    const next = status === "active" ? "paused" : "active"
    await api.patch(`/campaigns/${id}/status`, { status: next })
    await fetchCampaigns()
  }

  // 🔹 Statistiques globales
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0)
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0)
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0)
  const globalCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0
  const globalCpc = totalClicks > 0 ? totalBudget / totalClicks : 0

  const globalCampaign: Campaign = {
    id: "global",
    name: "Statistiques Globales",
    advertiser: "-",
    budget: totalBudget,
    status: "active",
    impressions: totalImpressions,
    clicks: totalClicks,
    ctr: globalCtr,
    cpc: globalCpc,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* 🔹 Header fixe esthétique */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-4 px-6 flex justify-between items-center max-w-7xl mx-auto rounded-b-2xl">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-700">
          <FiBarChart2 size={28} /> Campaign Dashboard
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            <FiBarChart2 /> Home
          </button>
          <button
            onClick={() => navigate("/detail")}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
          >
            <FiList /> Détail
          </button>
          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
          >
            <FiPlus /> Créer
          </button>
        </div>
      </header>

      <main className="pt-32 max-w-7xl mx-auto grid grid-cols-1 gap-6">
        {/* 🔹 Statistique globale */}
        <div className="bg-white rounded-2xl shadow border p-6 w-full hover:shadow-lg transition">
          <StatistiqueCampaign campaign={globalCampaign} />
        </div>

        {/* 🔹 Liste détaillée */}
        <div className="bg-white rounded-2xl shadow border p-6 w-full hover:shadow-lg transition">
          {loading ? (
            <p className="text-center py-8 text-gray-500">Chargement...</p>
          ) : (
            <CampaignList
              campaigns={campaigns}
              page={page}
              limit={limit}
              total={total}
              onPageChange={fetchCampaigns}
              onToggleStatus={toggleStatus}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
