import React from "react"
// 🔹 Interface pour une campagne
interface Campaign {
    id: string
    name: string
    advertiser: string
    budget: number
    status: "active" | "paused"
    impressions: number
    clicks: number
}

// 🔹 Props modifiées : soit une campagne, soit plusieurs pour global
interface Props {
    campaign?: Campaign
    campaigns?: Campaign[]
    onToggleStatus?: (id: string, status: "active" | "paused") => void
}

const StatistiqueCampaign: React.FC<Props> = ({ campaign, campaigns, onToggleStatus }) => {

    // 🔹 Si plusieurs campagnes : stats globales
    let displayName = ""
    let impressions = 0
    let clicks = 0
    let budget = 0
    let status: "active" | "paused" = "active" // par défaut

    if (campaigns && campaigns.length > 0) {
        displayName = "Statistiques Globales"
        impressions = campaigns.reduce((sum, c) => sum + c.impressions, 0)
        clicks = campaigns.reduce((sum, c) => sum + c.clicks, 0)
        budget = campaigns.reduce((sum, c) => sum + c.budget, 0)
    } else if (campaign) {
        displayName = campaign.name
        impressions = campaign.impressions
        clicks = campaign.clicks
        budget = campaign.budget
        status = campaign.status
    }

    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0
    const cpc = clicks > 0 ? budget / clicks : 0

    return (
        <div className="flex flex-col h-full">
            {/* Titre */}
            <h3 className="text-lg font-semibold mb-2">{displayName}</h3>

            {/* 🔹 Stats en 2x2 grid qui prend tout l'espace */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
                <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">Impressions</p>
                    <p className="text-xl font-semibold">{impressions}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">Clicks</p>
                    <p className="text-xl font-semibold">{clicks}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">CTR</p>
                    <p className="text-xl font-semibold">{ctr.toFixed(2)}%</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">CPC</p>
                    <p className="text-xl font-semibold">€ {cpc.toFixed(2)}</p>
                </div>
            </div>

            {/* 🔹 Boutons alignés en bas */}
            <div className="mt-auto space-y-2">
                {campaigns && campaigns.length > 0 && (
                    <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium">
                        Voir détails
                    </button>
                )}

                {campaign && onToggleStatus && (
                    <button
                        onClick={() => onToggleStatus(campaign.id, status)}
                        className={`w-full py-2 rounded-lg text-white font-medium ${status === "active"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {status === "active" ? "Mettre en pause" : "Activer la campagne"}
                    </button>
                )}
            </div>
        </div>

    )
}

export default StatistiqueCampaign
