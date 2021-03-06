// NODE SERVER WHICH WILL HANDLE SOCKET IO CONNECTIONS
const io=require('socket.io')(8000,{
    cors:{
        origin:'*',
    }
});

const users={};
// console.log("juhi");
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log("New User",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });


   socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
});
})
