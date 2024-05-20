const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
//mongoose.connect('mongodb://localhost:27017/bookdb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Models
const User = require('./models/User');
const Entity = require('./models/Entity');

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// User routes
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['first_name', 'last_name', 'email', 'user_role_id'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Entity routes
app.post('/entities', async (req, res) => {
    const entity = new Entity(req.body);
    try {
        await entity.save();
        res.status(201).send(entity);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/entities', async (req, res) => {
    try {
        const entities = await Entity.find();
        res.status(200).send(entities);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/entities/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const entity = await Entity.findById(_id);
        if (!entity) {
            return res.status(404).send();
        }
        res.status(200).send(entity);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/entities/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['user_ids', 'entity_type_id', 'entity_brand_id', 'campaign_ids'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const entity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!entity) {
            return res.status(404).send();
        }

        res.send(entity);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/entities/:id', async (req, res) => {
    try {
        const entity = await Entity.findByIdAndDelete(req.params.id);

        if (!entity) {
            return res.status(404).send();
        }

        res.send(entity);
    } catch (error) {
        res.status(500).send(error);
    }
});

const UserRole = require('../models/UserRole');


// Create a new user role
router.post('/user_roles', async (req, res) => {
    const userRole = new UserRole(req.body);
    try {
        await userRole.save();
        res.status(201).send(userRole);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all user roles
router.get('/user_roles', async (req, res) => {
    try {
        const userRoles = await UserRole.find();
        res.status(200).send(userRoles);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a user role by ID
router.get('/user_roles/:id', async (req, res) => {
    try {
        const userRole = await UserRole.findById(req.params.id);
        if (!userRole) {
            return res.status(404).send();
        }
        res.status(200).send(userRole);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a user role by ID
router.patch('/user_roles/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['role'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const userRole = await UserRole.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!userRole) {
            return res.status(404).send();
        }

        res.send(userRole);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a user role by ID
router.delete('/user_roles/:id', async (req, res) => {
    try {
        const userRole = await UserRole.findByIdAndDelete(req.params.id);

        if (!userRole) {
            return res.status(404).send();
        }

        res.send(userRole);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

const express = require('express');
const EntityType = require('../models/EntityType');

// const router = express.Router();

// Create a new entity type
router.post('/entity_types', async (req, res) => {
    const entityType = new EntityType(req.body);
    try {
        await entityType.save();
        res.status(201).send(entityType);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all entity types
router.get('/entity_types', async (req, res) => {
    try {
        const entityTypes = await EntityType.find();
        res.status(200).send(entityTypes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get an entity type by ID
router.get('/entity_types/:id', async (req, res) => {
    try {
        const entityType = await EntityType.findById(req.params.id);
        if (!entityType) {
            return res.status(404).send();
        }
        res.status(200).send(entityType);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an entity type by ID
router.patch('/entity_types/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['type', 'entity_brand_id'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const entityType = await EntityType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!entityType) {
            return res.status(404).send();
        }

        res.send(entityType);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an entity type by ID
router.delete('/entity_types/:id', async (req, res) => {
    try {
        const entityType = await EntityType.findByIdAndDelete(req.params.id);

        if (!entityType) {
            return res.status(404).send();
        }

        res.send(entityType);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

const express = require('express');
const EntityBranding = require('../models/EntityBranding');

// const router = express.Router();

// Create a new entity branding
router.post('/entity_branding', async (req, res) => {
    const entityBranding = new EntityBranding(req.body);
    try {
        await entityBranding.save();
        res.status(201).send(entityBranding);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all entity branding
router.get('/entity_branding', async (req, res) => {
    try {
        const entityBranding = await EntityBranding.find();
        res.status(200).send(entityBranding);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get an entity branding by ID
router.get('/entity_branding/:id', async (req, res) => {
    try {
        const entityBranding = await EntityBranding.findById(req.params.id);
        if (!entityBranding) {
            return res.status(404).send();
        }
        res.status(200).send(entityBranding);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an entity branding by ID
router.patch('/entity_branding/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['assets', 'colours', 'headings'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const entityBranding = await EntityBranding.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!entityBranding) {
            return res.status(404).send();
        }

        res.send(entityBranding);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an entity branding by ID
router.delete('/entity_branding/:id', async (req, res) => {
    try {
        const entityBranding = await EntityBranding.findByIdAndDelete(req.params.id);

        if (!entityBranding) {
            return res.status(404).send();
        }

        res.send(entityBranding);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
const express = require('express');
const Campaign = require('../models/Campaign');

// const router = express.Router();

// Create a new campaign
router.post('/campaigns', async (req, res) => {
    const campaign = new Campaign(req.body);
    try {
        await campaign.save();
        res.status(201).send(campaign);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all campaigns
router.get('/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).send(campaigns);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a campaign by ID
router.get('/campaigns/:id', async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).send();
        }
        res.status(200).send(campaign);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a campaign by ID
router.patch('/campaigns/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['brand_ambassador_ids', 'location'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!campaign) {
            return res.status(404).send();
        }

        res.send(campaign);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a campaign by ID
router.delete('/campaigns/:id', async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);

        if (!campaign) {
            return res.status(404).send();
        }

        res.send(campaign);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
const express = require('express');
const Report = require('../models/Report');

const router = express.Router();

// Create a new report
router.post('/reports', async (req, res) => {
    const report = new Report(req.body);
    try {
        await report.save();
        res.status(201).send(report);
    } catch (error) {
        res.status(400).send(error);
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});