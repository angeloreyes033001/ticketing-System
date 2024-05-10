const errors = require('../utils/errors');
const ticketModel = require('../models/ticket.model');

const createTicket = async(req,res)=>{
    try {
        const { device,prefix,form,requested,problem} = req.body;
        let ticket = await ticketModel.create(prefix,device,form,requested,problem);
        return res.send({status: true,message: "Successfully Requested.",ticket:ticket})
    } catch (error) {
        errors.TryCatchError(error);
    }
}

const readTicket = async()=>{
    try {
        const tickets = ticketModel.read(); 
        return tickets;
    } catch (error) {
        errors.TryCatchError(error)
    }
}

const assigned_ticket = async(req,res)=>{
    try {
        const {ticket_id,assigned_in}  =req.body;
        ticketModel.assignedTicket(ticket_id,assigned_in);
        return res.send({status: true, message: "Successfully Assigned"})

    } catch (error) {
        errors.TryCatchError(error)
    }
}

const readAssignedTicket = async(status) =>{
    try {
        let tickets =  await ticketModel.readAssignedTicket(status);
        return tickets;
    } catch (error) {
        errors.TryCatchError(error)
    }
}

const takeAnAction = async(req,res)=>{
    const id = req.params.id;
    let take = await ticketModel.takeAnAction(id);
    if(take.status){
        return res.send({
            status: true,
            tech_support: take.tech_support
        })
    }
}

const updateTakeAction = async(req,res)=>{
    try {
        const { action,recommendation, categories, assigned_ticket,tech_id ,status } = req.body;
        let updateData = await ticketModel.updateTakeAction(action,recommendation,categories,assigned_ticket,tech_id,status);
        return res.send(updateData);

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createTicket,
    readTicket,
    assigned_ticket,
    readAssignedTicket,
    takeAnAction,
    updateTakeAction,
}