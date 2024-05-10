const errors = require('../utils/errors');
const validation = require('../utils/validators');
const sectionModel = require('../models/section.model');

const getAllSections = async (req,res)=>{
    try {
        const all = await sectionModel.getAll();
        return res.send(all)
    } catch (error) {
        errors.TryCatchError(error);
    }
}

module.exports = {
    getAllSections,
}