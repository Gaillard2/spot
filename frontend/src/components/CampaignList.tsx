import React, { useMemo, useState } from "react"

// 🔹 Interface pour une campagne
interface Campaign {
  id: string
  name: string
  advertiser: string
  budget: number
  status: "active" | "paused"
  ctr: number
}

// 🔹 Props du composant
interface Props {
  campaigns: Campaign[]
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
  onToggleStatus?: (id: string, status: "active" | "paused") => void
  onEdit?: (campaign: Campaign) => void
}

const CampaignList: React.FC<Props> = ({
  campaigns,
  page,
  limit,
  total,
  onPageChange,
  onToggleStatus,
  onEdit,
}) => {
  const [search, setSearch] = useState("")
  const [modalCampaign, setModalCampaign] = useState<Campaign | null>(null) // 🔹 état modal

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.advertiser.toLowerCase().includes(search.toLowerCase())
    )
  }, [campaigns, search])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Liste des campagnes</h2>
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Empty */}
      {filteredCampaigns.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">
          Aucune campagne trouvée.
        </p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm">Nom</th>
                  <th className="px-4 py-2 text-left text-sm">Budget</th>
                  <th className="px-4 py-2 text-left text-sm">Statut</th>
                  <th className="px-4 py-2 text-left text-sm">CTR</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">€ {c.budget}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          c.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{c.ctr.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
              Page {page} sur {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="px-4 py-2 rounded-md border text-sm disabled:opacity-40 hover:bg-gray-100"
              >
                ← Précédent
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="px-4 py-2 rounded-md border text-sm disabled:opacity-40 hover:bg-gray-100"
              >
                Suivant →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CampaignList
