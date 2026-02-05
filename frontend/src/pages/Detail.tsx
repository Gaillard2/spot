import React, { useState } from 'react';

interface Campaign {
  id: number;
  name: string;
  clicks: number;
  impressions: number;
  cpc: number;
  ctr: number;
  active: boolean;
}

const Detail: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: 'Campaign A', clicks: 120, impressions: 1000, cpc: 0.5, ctr: 12, active: true },
    { id: 2, name: 'Campaign B', clicks: 80, impressions: 800, cpc: 0.8, ctr: 10, active: false },
    { id: 3, name: 'Campaign C', clicks: 200, impressions: 1500, cpc: 0.3, ctr: 13, active: true },
  ]);

  const toggleActive = (id: number) => {
    setCampaigns(prev =>
      prev.map(c =>
        c.id === id ? { ...c, active: !c.active } : c
      )
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Détail des campagnes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{campaign.name}</h2>
              <ul className="text-gray-700 space-y-1">
                <li><strong>Clicks :</strong> {campaign.clicks}</li>
                <li><strong>Impressions :</strong> {campaign.impressions}</li>
                <li><strong>CPC ($) :</strong> {campaign.cpc.toFixed(2)}</li>
                <li><strong>CTR (%) :</strong> {campaign.ctr}%</li>
              </ul>
            </div>
            <button
              onClick={() => toggleActive(campaign.id)}
              className={`mt-4 px-4 py-2 rounded-full font-semibold text-white transition-colors ${
                campaign.active ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {campaign.active ? 'Pause' : 'Activer'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
