const mongoose = require('mongoose');

const entityBrandingSchema = new mongoose.Schema({
    assets: { type: mongoose.Schema.Types.Mixed, required: true },
    colours: { type: mongoose.Schema.Types.Mixed, required: true },
    headings: { type: mongoose.Schema.Types.Mixed, required: true }
});

const EntityBranding = mongoose.model('EntityBranding', entityBrandingSchema);

module.exports = EntityBranding;
