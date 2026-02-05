import Campaign from '../models/campaignModel.js';
import mongoose from 'mongoose';

export const createCampaign = async (data) => {
	const campaign = new Campaign(data);
	return campaign.save();
};

export const getCampaigns = async ({ page = 1, limit = 10, status, advertiser }) => {
	const query = {};
	if (status) query.status = status;
	if (advertiser) query.advertiser = advertiser;

	const skip = (Math.max(1, page) - 1) * limit;
	const [items, total] = await Promise.all([
		Campaign.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
		Campaign.countDocuments(query),
	]);

	return { items, total, page: Number(page), limit: Number(limit) };
};

export const getCampaignById = async (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) return null;
	return Campaign.findById(id);
};

export const updateCampaignStatus = async (id, status) => {
	if (!mongoose.Types.ObjectId.isValid(id)) return null;
	return Campaign.findByIdAndUpdate(id, { status }, { new: true });
};

export const getCampaignStats = async (id) => {
	const campaign = await getCampaignById(id);
	if (!campaign) return null;

	const impressions = campaign.impressions || 0;
	const clicks = campaign.clicks || 0;
	const budget = campaign.budget || 0;

	const ctr = impressions === 0 ? 0 : clicks / impressions; // ratio
	const cpc = clicks === 0 ? null : budget / clicks;

	return {
		impressions,
		clicks,
		ctr,
		cpc,
		budget,
	};
};
