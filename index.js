const udp = require('dgram');
const FileData = require("./server/FileData");

const fileData = new FileData('./public/udp')
const server = udp.createSocket('udp4');

server.on('error',function(error){
    console.log('Error: ' + error);
    server.close();
});
server.on('message',function(msg,info){

    server.send(msg,info.port,'localhost',function(error){
        if(error){
            client.close();
        }else{
            fileData.create(msg.toString())
            console.log('Set data');
        }

    });

});
server.on('listening',function(){
    const address = server.address();
    const port = address.port;
    const family = address.family;
    const ipaddr = address.address;
    console.log('Server is listening at port: ' + port);
    console.log('Server ip: ' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);
});
server.on('close',function(){
    console.log('Socket is closed !');
});

require('express')().listen(3001, () => {
    server.bind(2222);
    console.log(`Server running on port ${3001}`)
})
