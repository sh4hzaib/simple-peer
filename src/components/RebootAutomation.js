function rebootJniorWs(ip) {

    var W3CWebSocket = require('websocket').w3cwebsocket;

    var client = new W3CWebSocket('ws:/' + ip + '/', 'echo-protocol');
    console.log('Reboot was sent to: ' + ip);

    client.onerror = function() {
        console.log('Connection Error');
    };

    client.onopen = function() {
        console.log('WebSocket Client Connected');
        var registryWriteJson1 = {
            "Message": "Console Open"
          };
        var registryWriteJson2 = {
            "Message":"Console Stdin",
            "Data":"jnior\r"
           };
        var registryWriteJson3 = {
            "Message":"Console Stdin",
            "Data":"jnior\r"
           };
        var registryWriteJson4 = {
            "Message":"Console Stdin",
            "Data":"reboot -f\r"
           };

        function sendNumber() {
            if (client.readyState === client.OPEN) {

                client.send(JSON.stringify(registryWriteJson1));
                console.log(registryWriteJson1);
                client.send(JSON.stringify(registryWriteJson2));
                console.log(registryWriteJson2);
                client.send(JSON.stringify(registryWriteJson3));
                console.log(registryWriteJson3);
                client.send(JSON.stringify(registryWriteJson4));
                console.log(registryWriteJson4);
                
            }
        }
        sendNumber();
        client.close();
    };

    client.onclose = function() {
        console.log('echo-protocol Client Closed');
    };

    client.onmessage = function(e) {
        if (typeof e.data === 'string') {
            // console.log("Received: '" + e.data + "'");
        }
    };
}

export default rebootJniorWs;