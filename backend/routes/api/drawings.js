const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Drawing, User } = require('../../db/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const router = express.Router();


router.get("/all", async(req, res) => {
    const allDrawings = await Drawing.findAll({
        limit: 10,
        include: {model: User}

    })
    res.json({allDrawings})
})


router.post('/new', async (req, res) => {
    // const wat = await Spot.findAll()
    const { owner_id, name, canvas_array } = req.body;
    console.log(name, owner_id, "============================================= TEST!?!?!?!! =============================================")
    const drawing = await Drawing.create({
        owner_id,
        name,
        canvas_array
    });

    return res.json({ drawing });
});






module.exports = router
