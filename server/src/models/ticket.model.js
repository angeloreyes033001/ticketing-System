const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const create = async(prefix,device,form,requested,problem) =>{
    const ticket =  await prisma.tickets.create({
        data:{
            device_prefix: parseInt(prefix),
            problem: problem,
            device_no: device,
            form_id: parseInt(form),
            requested_by: parseInt(requested),
        }
    });
    return ticket;
}


const read = async()=>{
    return await prisma.$queryRaw`SELECT  tickets.ticket_id , device_prefixs.prefix, tickets.device_no as device ,forms.type as form , users.firstname , users.firstname,users.lastname , tickets.received_date as received , tickets.problem as problem FROM tickets LEFT JOIN assigned_tickets ON tickets.ticket_id = assigned_tickets.ticket_id 
    INNER JOIN device_prefixs ON tickets.device_prefix = device_prefixs.prefix_id INNER JOIN forms ON tickets.form_id = forms.form_id INNER JOIN users ON tickets.requested_by =users.user_id
   WHERE assigned_tickets.assigned_in IS NULL ORDER BY received_date DESC`
}

const assignedTicket = async(ticket_id,assigned_in)=>{
    return await prisma.assigned_tickets.create({
        data:{
            status: "pending",
            ticket_id: parseInt(ticket_id),
            assigned_in: parseInt(assigned_in)
        }
    })
}

const takeAnAction = async(id)=>{

    //create data in tech_support_action  NULL
    const tech_support = await prisma.tech_support_actions.create({
        data:{
            categories: "{component:{software: '',hardware:'',hardwareSpecify:'', softwareSpecify:''}, network:{lan:false, internet:false,specify:''}, system: {his:false, lis:false,dms:false, eNgas:false,phic:false,packWithRis:false,hrips:false,specify:''},others: {web:false,training:false,specify:''}}",
            assigned_to: parseInt(id)
        }
    });

    if(tech_support){
         //update status
        await updateStatus(id,'in_process');
        return {status: true, tech_support: tech_support.tech_id};
    }
}

const updateTakeAction = async(action,recommendation,categories,assigned_ticket,tech_id , status='condemned' )=>{
    try {
        const tech_support = await prisma.tech_support_actions.update({
            where:{
                assigned_to: parseInt(assigned_ticket),
                tech_id: parseInt(tech_id)
            },
            data:{
                action: action,
                recommendation: recommendation,
                categories: categories,
            },
        });

        await updateStatus(assigned_ticket,status);
        return (status == "completed") ? {status: true, message: 'Completed'}: {status: true,message:"Condemned"};

    } catch (error) {
        console.error(error);
    }
}

const updateStatus = async(id,status="condemnend")=>{
    return await prisma.assigned_tickets.update({
        data: {
            status: status,
        },
        where:{
            assigned_id: parseInt(id)
        }
    })
}

const readAssignedTicket = async(status)=>{
    return await prisma.$queryRaw`SELECT tickets.ticket_id,
                                        assigned_tickets.assigned_id , users.firstname, users.lastname ,
                                        device_prefixs.prefix as prefix, divisions.name as division ,sections.name as section ,
                                        tickets.device_no as device ,tickets.problem ,tickets.received_date as received , assigned_tickets.assigned_in as staff
                                    FROM assigned_tickets 
                                    INNER JOIN tickets ON assigned_tickets.ticket_id = tickets.ticket_id 
                                    INNER JOIN users ON tickets.requested_by = users.user_id 
                                    INNER JOIN device_prefixs ON tickets.device_prefix = device_prefixs.prefix_id 
                                    INNER JOIN sections ON users.section_id = sections.section_id 
                                    INNER JOIN divisions ON sections.division_id = divisions.division_id 
                                    WHERE assigned_tickets.status = ${status} ORDER BY assigned_id ASC`
                                };

const totalTicketCompleted = async()=>{
    try {
        return await totalTicket('completed');
    } catch (error) {
        console.error(error)
    }
}

const totalTicketPending = async()=>{
    try {
        return await totalTicket();
    } catch (error) {
        console.error(error)
    }
}

const totalTicketInProcess = async()=>{
    try {
        return await totalTicket('in_process');
    } catch (error) {
        console.error(error)
    }
}

const totalTicket = async(status='pending')=>{
    try {
        return await prisma.assigned_tickets.count({
            where:{
                status: status
            }
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    create,
    read,
    assignedTicket,
    readAssignedTicket,
    takeAnAction,
    updateTakeAction,
    totalTicketCompleted,
    totalTicketPending,
    totalTicketInProcess
}