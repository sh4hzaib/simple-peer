function wsTasker(ip, channel, message, command) {

    var W3CWebSocket = require('websocket').w3cwebsocket;

    var client = new W3CWebSocket('ws:/' + ip + '/', 'echo-protocol');
    console.log('Inserted IP to WS was: ' + ip);
    console.log('Task Name WS was: ' + command);
    console.log('Inserted VariableName WS was: ' + message);
    console.log('Inserted Value to WS was: ' + channel);
    

    client.onerror = function() {
        console.log('Connection Error');
    };
    
    client.onopen = function() {
        var selectedCP = soundSystem;
        console.log('WebSocket Client Connected');
        var registryWriteJson = {
          "Message":"Post Message",
          "Number":2010,
          "Content":"{\"Message\":\"task.execute\",\"TaskName\":\""+ command +"\",\"Variables\":{\"" + message + "\":"+ channel + "}}"
      };

        function sendNumber() {
            if (client.readyState === client.OPEN) {

                client.send(JSON.stringify(registryWriteJson));
                console.log(registryWriteJson);
                // setTimeout(sendNumber, 5000);
                
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

  const emptyFunction = (value) => {
    console.log("EMPTY:" + value);
    wsMute("192.168.68.102", value)
  };

  export default wsTasker; 