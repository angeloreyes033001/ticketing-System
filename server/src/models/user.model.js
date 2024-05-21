const { PrismaClient } = require("@prisma/client");
const errors = require('../utils/errors');
const prisma = new PrismaClient()

const createUser = async({username,firstname,lastname,password,role,section,status=false,verify=false})=>{
    try {
        await prisma.users.create({
            data: {
                username:username,
                firstname:firstname,
                lastname: lastname,
                password:password,
                role:role,
                status: status,
                verify: verify,
                section_id:parseInt(section)
            }
        });
    } catch (error) {
        errors.TryCatchError(error)
    }
}

const getByUsername = async(username)=>{
    try {
        return await prisma.users.findUnique({
            where: {username: username, status: false,verify:true}
        });
    } catch (error) {
        errors.TryCatchError(error)
    }
}

const findByRole = async(role)=>{
    try {
        return await prisma.$queryRaw`SELECT 
                                        users.user_id , users.firstname, users.lastname, users.role,
                                        sections.name as section,
                                        divisions.name as division 
                                    FROM users 
                                    INNER JOIN sections 
                                    ON users.section_id = sections.section_id 
                                    INNER JOIN divisions 
                                    ON sections.division_id = divisions.division_id 
                                    WHERE users.status = false AND users.verify = true AND users.role = ${role}`;
    } catch (error) {
        errors.TryCatchError(error)
    } 
}

const findByID = async(id)=>{
    try {
        return await prisma.$queryRaw`SELECT 
                                        users.user_id , users.firstname, users.lastname, users.role,
                                        sections.name as section,
                                        sections.section_id,
                                        divisions.name as division,
                                        divisions.division_id
                                    FROM users 
                                    INNER JOIN sections 
                                    ON users.section_id = sections.section_id 
                                    INNER JOIN divisions 
                                    ON sections.division_id = divisions.division_id 
                                    WHERE users.status = false AND users.verify = true AND users.user_id = ${id}`;
    } catch (error) {
        errors.TryCatchError(error)
    }
}

const getAllUserVerify =async (verify=false)=>{
    return await prisma.$queryRaw`SELECT 
    users.user_id ,users.username, users.firstname, users.lastname, users.role,users.verify,users.status,
    sections.name as section,
    sections.section_id,
    divisions.name as division,
    divisions.division_id
FROM users 
INNER JOIN sections 
ON users.section_id = sections.section_id 
INNER JOIN divisions 
ON sections.division_id = divisions.division_id 
WHERE users.verify = true AND users.role != 'root'`  ;
}

const verifyAccount = async(id)=>{
    return await prisma.users.update({
        where:{
            user_id: parseInt(id)
        },
        data:{
            verify: true
        }
    })
}

const totalUsers = async()=>{
    return prisma.users.count({
        where:{
            status: false,
            verify: true
        }
    })
}

const updateStatus = async(id)=>{
    const find = await prisma.users.findUnique({
        where:{
            user_id: parseInt(id)
        }
    });

    let status = (find.status) ? false : true;

    await prisma.users.update({
        where:{
            user_id: parseInt(id)
        },
        data:{
            status: status,
        }
    })

    return (status) ? {status:true,message: `Successfully deactivate account ${find.username}.`} : {status:true,message: `Successfully activate account ${find.username}.`}
}

module.exports = {
    createUser,
    getByUsername,
    findByID,
    getAllUserVerify,
    verifyAccount,
    updateStatus,
    findByRole,
    totalUsers
}