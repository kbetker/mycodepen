const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Drawing } = require('../../db/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const router = express.Router();


router.get("/all", async(req, res) => {
    const allDrawings = await Drawing.findAll({ limit: 10})
    res.json({allDrawings})
})

module.exports = router
