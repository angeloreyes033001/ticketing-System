const socketIO = require('socket.io');
const ticketController = require('./controllers/tickets.controller');

const getTickets = async()=>{
    const tickets = await ticketController.readTicket();
    return tickets;
}

const getAssignedTicket = async(status)=>{
    const assigned = await ticketController.readAssignedTicket(status);
    return assigned;
}

const InitializeSocket = (server)=>{
    const io = socketIO(server,{
        cors: {
            origin: '*', // Change this to your desired origin
            methods: ['GET', 'POST'] // Allow the methods you need
        }
    });


    io.on('connection',async(socket)=>{

        const tickets = await getTickets();
        const pedingTickets = await getAssignedTicket('pending');

        io.emit('tickets',tickets);
        io.emit('pedingTickets',pedingTickets);

        socket.on('create-ticket',async()=>{
            let tickets = await getTickets();
            socket.broadcast.emit('new-added-ticket',tickets);
        });

        //helpdesk update fetched tickets/ NOTE HELPDESK TICKET
        socket.on('helpdesk-assigned-ticket',async(ticket_id)=>{
            let updatedTickets = (await getTickets()).filter(ticket => ticket.ticket_id !== ticket_id);
            io.emit('update-ticket-helpdesk',updatedTickets);
        });

        //helpdesk 
        socket.on('staff-assigned-ticket',async()=>{
            let pedingTickets = await getAssignedTicket('pending');
            io.emit('update-ticket-staff',pedingTickets);
        })

        socket.on('disconnect',()=>{
            console.log(`left user: ${socket.id}`)
        });
    });

    return io;
}

module.exports = InitializeSocket;
