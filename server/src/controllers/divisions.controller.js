const errors = require('../utils/errors');
const divsionModel = require('../models/division.model');

const getAllDivisions = async (req,res)=>{
    try {
        const all = await divsionModel.getAll();
        return res.send(all)
    } catch (error) {
        errors.TryCatchError(error);
    }
}

module.exports = {
    getAllDivisions,
}