const errors = require('../utils/errors');
const prefixModel = require('../models/prefix.model');

const getAllPrefix = async (req,res)=>{
    try {
        const all = await prefixModel.getAll();
        return res.send(all)
    } catch (error) {
        errors.TryCatchError(error);
    }
}

module.exports = {
    getAllPrefix,
}