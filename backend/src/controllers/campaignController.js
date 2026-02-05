import * as service from '../services/campaignService.js';

const validateCampaignPayload = (payload) => {
  const errors = [];
  if (!payload.name) errors.push('name is required');
  if (!payload.advertiser) errors.push('advertiser is required');
  if (payload.budget == null || isNaN(Number(payload.budget))) errors.push('budget is required and must be a number');
  if (!payload.startDate) errors.push('startDate is required');
  if (!payload.endDate) errors.push('endDate is required');
  // basic date check
  if (payload.startDate && payload.endDate) {
    const s = new Date(payload.startDate);
    const e = new Date(payload.endDate);
    if (s > e) errors.push('startDate must be before endDate');
  }
  return errors;
};

export const createCampaign = async (req, res) => {
  try {
    const errors = validateCampaignPayload(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const payload = {
      name: req.body.name,
      advertiser: req.body.advertiser,
      budget: Number(req.body.budget),
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      status: req.body.status || 'active',
      impressions: req.body.impressions || 0,
      clicks: req.body.clicks || 0,
    };

    const created = await service.createCampaign(payload);
    return res.status(201).json(created);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

export const listCampaigns = async (req, res) => {
  try {
    let { page = 1, limit = 10, status, advertiser } = req.query;


    page = Number(page);
    limit = Number(limit);

    
    const { items, total } = await service.getCampaigns({ page, limit, status, advertiser });

    const campaigns = items.map(c => {
      const ctr =
        c.impressions > 0
          ? Number(((c.clicks / c.impressions) * 100).toFixed(2))
          : 0

      return {
        id: c._id.toString(),
        name: c.name,
        advertiser: c.advertiser,
        budget: c.budget,
        status: c.status,
        impressions: c.impressions,
        clicks: c.clicks,
        ctr,
        startDate: c.startDate,
        endDate: c.endDate,
      }
    })


    return res.json({
      campaigns,
      page,
      limit,
      total,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};


export const getCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await service.getCampaignById(id);
    if (!campaign) return res.status(404).json({ error: 'not_found' });
    return res.json(campaign);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

export const patchStatus = async (req, res) => {
  console.log(`Received request to update campaign ${req.params.id} to status ${req.body.status}`);
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['active', 'paused', 'finished'].includes(status)) {
      return res.status(400).json({ error: 'invalid_status' });
    }
    const updated = await service.updateCampaignStatus(id, status);
    console.log('Updated campaign:', updated);
    if (!updated) return res.status(404).json({ error: 'not_found' });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

export const getStats = async (req, res) => {
  try {
    const { id } = req.params;
    const stats = await service.getCampaignStats(id);
    if (!stats) return res.status(404).json({ error: 'not_found' });
    return res.json({
      impressions: stats.impressions,
      clicks: stats.clicks,
      ctr: stats.ctr, 
      cpc: stats.cpc,
      budget: stats.budget,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};


export const getAllStats = async (req, res) => {
  try {
    const stats = await service.getAllCampaignStats(); // récupère toutes les campagnes avec stats
    if (!stats || stats.length === 0) {
      return res.status(404).json({ error: 'no_campaigns_found' });
    }

    return res.json(stats); // renvoie le tableau complet
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

