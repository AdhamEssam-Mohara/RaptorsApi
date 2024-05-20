const mongoose = require('mongoose');

const entityTypeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    entity_brand_id: { type: Number, required: true }
});

const EntityType = mongoose.model('EntityType', entityTypeSchema);

module.exports = EntityType;
