const udp = require("dgram");


class ClientUdp {
    client = udp.createSocket('udp4');

    /**
     * Send JSON data to udp server
     * @param value {Object} - JSON data
     * @return {Promise<{isSuccess: boolean}>} - response is success or not
     */
    clientSend(value) {
        const data = Buffer.from(JSON.stringify(value))
        return new Promise((resolve, reject) => {
            this.client.send([data],2222,'localhost',function(error){
                if(error){
                    this.client.close();
                    reject({isSuccess: false})
                }else{
                    resolve({isSuccess: true})
                }
            });
        })
    }

    /**
     * Close session client
     */
    close() {
        this.client.close();
    }

}

module.exports = ClientUdp
