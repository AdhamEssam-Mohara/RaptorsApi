const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    brand_ambassador_ids: { type: mongoose.Schema.Types.Mixed, required: true },
    location: { type: mongoose.Schema.Types.Mixed, required: true }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
