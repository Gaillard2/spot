import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Campaign {
  id: string;
  name: string;
  advertiser: string;
  budget: number;
  status: "active" | "paused";
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
}

const Detail: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Récupération dynamique des campagnes
  const fetchCampaigns = async () => {


    setLoading(true);
    try {
      const res = await api.get("/campaigns/stats/all"); // ou id spécifique si besoin
      const mappedCampaigns: Campaign[] = res.data.map((c: any) => ({
        id: c._id,
        name: c.name,
        advertiser: c.advertiser || "-",
        budget: c.budget || 0,
        status: c.status || "active",
        impressions: c.impressions || 0,
        clicks: c.clicks || 0,
        ctr: c.ctr || 0,
        cpc: c.cpc || 0,
      }));
      setCampaigns(mappedCampaigns);
    } catch (err) {
      console.error("Erreur lors de la récupération des campagnes :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const toggleStatus = async (id: string, status: "active" | "paused") => {
    const nextStatus = status === "active" ? "paused" : "active";
    try {
      await api.patch(`/campaigns/${id}/status`, { status: nextStatus });
      await fetchCampaigns();
    } catch (err) {
      console.error("Erreur lors du changement de statut :", err);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Détail des campagnes</h1>

      {loading ? (
        <p className="text-gray-600">Chargement des campagnes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{campaign.name}</h2>
                <ul className="text-gray-700 space-y-1">
                  <li>
                    <strong>Advertiser :</strong> {campaign.advertiser}
                  </li>
                  <li>
                    <strong>Clicks :</strong> {campaign.clicks}
                  </li>
                  <li>
                    <strong>Impressions :</strong> {campaign.impressions}
                  </li>
                  <li>
                    <strong>CPC ($) :</strong> {campaign.cpc.toFixed(2)}
                  </li>
                  <li>
                    <strong>CTR (%) :</strong> {campaign.ctr.toFixed(2)}
                  </li>
                  <li>
                    <strong>Budget :</strong> {campaign.budget}
                  </li>
                </ul>
              </div>
              <button
                onClick={() => toggleStatus(campaign.id, campaign.status)}
                className={`mt-4 px-4 py-2 rounded-full font-semibold text-white transition-colors ${
                  campaign.status === "active"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {campaign.status === "active" ? "Pause" : "Activer"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Detail;
