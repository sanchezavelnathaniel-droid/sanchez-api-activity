const express = require('express');
const router = express.Router();

// Import the controller
const {
    getAllChefs,
    createChef,
    getChefById,
    updateChef,
    deleteChef,
} = require('../controllers/chefController');

// 1. If user goes to GET /chefs → get all chefs
router.get('/chefs', getAllChefs);

// 2. If user sends POST /chefs → create chef
router.post('/chefs', createChef);

// 3. If user goes to GET /chefs/:id → get specific chef
router.get('/chefs/:id', getChefById);

// 4. If user sends PUT /chefs/:id → update chef
router.put('/chefs/:id', updateChef);

// 5. If user sends DELETE /chefs/:id → delete chef
router.delete('/chefs/:id', deleteChef);

// Export router (ONLY ONCE, AT THE END)
module.exports = router;