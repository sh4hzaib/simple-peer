function wsTasker(ip, message, taskName, variableName, value) {

    var W3CWebSocket = require('websocket').w3cwebsocket;

    var client = new W3CWebSocket('ws:/' + ip + '/', 'echo-protocol');
    console.log('Inserted IP to WS was: ' + ip);
    console.log('Inserted Message WS was: ' + message);
    console.log('Inserted TaskName WS was: ' + taskName);
    console.log('Inserted VariableName to WS was: ' + variableName);
    console.log('Inserted Value to WS was: ' + value);
    

    client.onerror = function() {
        console.log('Connection Error');
    };
    
    client.onopen = function() {
        console.log('WebSocket Client Connected');
        var registryWriteJson = {
          "Message":"Post Message",
          "Number":2010,
          "Content":"{\"Message\":\""+ message +"\",\"TaskName\":\""+ taskName +"\",\"Variables\":{\"" + variableName + "\":"+ value + "}}"
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