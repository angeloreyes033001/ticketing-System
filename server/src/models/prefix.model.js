const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const getAll = async()=>{
    return await prisma.device_prefixs.findMany({
        where:{
            soft_delete: false,
        }
    });
}

module.exports = {
    getAll,
}