const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errors = require('../utils/errors');
const validation = require('../utils/validators');
const userModel = require('../models/user.model');
const ROLES = ["root","helpdesk","technical_support","user"];


const userInfo = async(req,res)=>{
    try {
        const userID = req.userID;
        const user = await userModel.findByID(parseInt(userID));
        return res.send(user[0])
    } catch (error) {
        errors.TryCatchError(error)
    }
}

const verifyLogin = async(req,res)=>{
    try {
       const userID = req.userID;

       const user = await userModel.findByID(parseInt(userID));
       if(user.length > 0){
            return res.send({
                authentication: true,
                data: user
            });
       }
       else{
            return res.send({
                authentication: false,
                message: "unauthenticated"
            });
       }

    } catch (error) {
        errors.TryCatchError(error);
    }
}

const createAccountByRoot = async(req,res)=>{
    const status = false;
    const verify = true;
    const create = await createAccount(req.body,status,verify);
    res.send(create)
}

const logout = async(req,res)=>{
    try {
        res.clearCookie('token').send({
            status: true,
            message: "logout successfully"
        });
    } catch (error) {
        console.error(error);
    }
}

const registration = async(req,res)=>{
    const status = false;
    const verify = false;
    const create = await createAccount(req.body,status,verify);
    res.send(create)
}

const createAccount = async(data,status,verify)=>{
    try {
        const { username, firstname, lastname, password, role, section } = data;

        const validate = validation.checkMultiEmpty({...data});
        if(!validate.status){
            return validate;
        }

        if(!ROLES.includes(role)){
            return {staus:false, error: "role" , message: "NO ROLES FOUND!!!"}
        }

        const check = await userModel.getByUsername(username);

        if(check){
            return {status: false, message: "username is already used."}
        }
        else{
            bcrypt.hash(password,10,async(err,password)=>{
                if(err){
                    console.error(err);
                }
                await userModel.createUser({username,firstname,lastname,password,role,section,status,verify});
            });
            return {status: true, message: "Successfully Registered"}
        }
    } catch (error) {
        errors.TryCatchError(error);
    }
}

const loginAccount = async(req,res)=>{
    try {
        const { username , password } = req.body;

        const validate = validation.checkMultiEmpty({...req.body});
        if(!validate.status){
            res.send(validate);
        }

        const user = await userModel.getByUsername(username);
        
        if(user){
            bcrypt.compare(password,user.password, (error,result)=>{
                if(error){
                    console.error(error);
                }
                
                if(result){
                    if(!user.verify){
                        return res.send({status:false,error: "username", message: "username not found"});
                    }

                    if(user.status){
                        return res.send({status: false, error:'username',message: "account locked."})
                    }

                    const token = jwt.sign({_id: user.user_id},process.env.JWT_SECRET_KEY);
                    
                    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                    return res.json({ status: true, role: user.role });

                }
                else{
                    return res.send({status: false, error: "password", message: "incorrect password"})
                }
            })
        }
        else{
            return res.send({status: false, error: "username" ,message: "username not found"})
        }

    } catch (error) {
        errors.TryCatchError(error);
    }
}

const getAllUserUnVerified = async(req,res)=>{
    try {
        const users = await userModel.getAllUserVerify(false);
        return res.send(users)
    } catch (error) {
        errors.TryCatchError(error);
    }
}

const getAllUserVerified = async(req,res)=>{
    try {
        const users = await userModel.getAllUserVerify(true);
        return res.send(users)
    } catch (error) {
        errors.TryCatchError(error);
    }
}

const verifyAccount = async(req,res)=>{
    const id = req.params.id;
    const update = await userModel.verifyAccount(id);
    return res.send({status: true, message: "Successfully Verified."})
}

const updateStatus = async(req,res)=>{
    const id = req.params.id;
    const update = await userModel.updateStatus(id);
    return res.send(update);
}

const getUserRole = async(req,res)=>{
    try {
        const role = req.params.role;
        const read = await userModel.findByRole(role);
        return res.send(read)
    } catch (error) {
        errors.TryCatchError(error);
    }
}

const generatePassword = async(req,res)=>{
    bcrypt.hash("admin",10,(error,hash)=>{
        res.send(hash)
    });
}

module.exports = {
    userInfo,
    verifyLogin,
    createAccountByRoot,
    loginAccount,
    registration,
    getAllUserUnVerified,
    getAllUserVerified,
    verifyAccount,
    updateStatus,
    getUserRole,
    generatePassword,
    logout
}