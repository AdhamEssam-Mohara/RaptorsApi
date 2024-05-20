const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
    user_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    entity_type_id: { type: Number, required: true },
    entity_brand_id: { type: Number, required: true },
    campaign_ids: [{ type: Number }]
});

const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;
