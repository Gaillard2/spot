import express from 'express';
import * as controller from '../controllers/campaignController.js';

const router = express.Router();

router.post('/', controller.createCampaign);


router.get('/', controller.listCampaigns);

router.get('/:id', controller.getCampaign);

router.patch('/:id/status', controller.patchStatus);

router.get('/:id/stats', controller.getStats);

export default router;
