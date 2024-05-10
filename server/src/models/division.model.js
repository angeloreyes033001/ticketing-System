const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const getAll = async()=>{
    return await prisma.divisions.findMany({
        where:{
            soft_delete: false,
        }
    });
}

module.exports = {
    getAll,
}