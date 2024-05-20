const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    campaign_id: { type: Number, required: true },
    details: { type: mongoose.Schema.Types.Mixed, required: true },
    file: { type: String, required: true }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
