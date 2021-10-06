const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Drawing, User } = require('../../db/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const router = express.Router();

router.get("/all/:owner_id", async(req, res) => {
    const owner_id = req.params.owner_id
    const allMYDrawings = await Drawing.findAll({
      where: {owner_id: owner_id},
      include: {model: User}
    })
    res.json({allMYDrawings})
})


router.get("/all", async(req, res) => {
    const allDrawings = await Drawing.findAll({
        limit: 10,
        include: {model: User}

    })
    res.json({allDrawings})
})

router.get("/edit/:id", async(req, res) => {
    const id = req.params.id
    const drawing = await Drawing.findOne({
        where: {id: id},
    })
    res.json({drawing})
})




router.post('/new', async (req, res) => {
    // const wat = await Spot.findAll()
    const { owner_id, name, canvas_array } = req.body;
    const drawing = await Drawing.create({
        owner_id,
        name,
        canvas_array
    });
    return res.json({ drawing });
});


router.put('/edit/:id', async (req, res) => {
    // const wat = await Spot.findAll()
    const id = req.params.id
    const { name, canvas_array } = req.body;
    const drawing = await Drawing.findOne({
        where: {id: id}
    })
    await drawing.update({
        name,
        canvas_array
    })

    return res.json({ drawing });
});


router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    const drawing = await Drawing.destroy({
       where: {id: id}
    });


    return res.json({ id });
});






module.exports = router
