function wsMute(ip, cpType, value) {

    var W3CWebSocket = require('websocket').w3cwebsocket;

    var client = new W3CWebSocket('ws:/' + ip + '/', 'echo-protocol');
    console.log('Inserted IP to WS was: ' + ip);
    console.log('DeviceType WS was: ' + cpType);
    console.log('Inserted Value to WS was: ' + value);

    client.onerror = function() {
        console.log('Connection Error');
    };

    const soundSystem = cpType;

    client.onopen = function() {
        var selectedCP = soundSystem;
        console.log('WebSocket Client Connected');
        if (soundSystem === "Dolby") {
          selectedCP = "DolbyMute";
        } else {
          selectedCP = "DCP300Mute";
        }
        var registryWriteJson = {
          "Message":"Post Message",
          "Number":2010,
          "Content":"{\"Message\":\"task.execute\",\"TaskName\":\""+ selectedCP +"\",\"Variables\":{\"mute\":"+ value + "}}"
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

  export default wsMute; 