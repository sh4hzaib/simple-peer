/*
 JNIOR Monitor/Configuration Page
 INTEG Process Group, Inc., 2919 E Hardies Rd, Gibsonia PA 
 724.933.9350
 
 File: comm.js
 
 Javascript here creates a persistent Websocket connection back to the server. Initialize
 the connection as follows:
 
 var web_socket = new Comm();
 
 The user is hereby granted license to use, modify, and redistribute the contents of this
 file for any purpose, commercial or otherwise. No prior authorization by INTEG Process 
 Group, Inc. is required.
 */

function Comm() {
    this.ws = null;
    this.onopen = null;
    this.onmessage = null;
    this.onclose = null;
    this.onerror = null;

    this.onauth = null;
    this.username = null;
    this.password = null;
    this.nonce = null;

    this.conn = 0;
    this.open = false;
    this.auth = 0;

    // get current URI for the connection
    this.wsUri = "ws://" + "81.167.56.241";
    if (window.location.protocol == "https:")
        this.wsUri = "wss://" + "81.167.56.241";

    this.connect = function() {
        // TRUE once we are open and receiving Monitor packets
        this.open = false;
        this.auth = 0;
        loggedin = false;

        // Indicates unique connection
        this.conn++;

        // establish the connection
        this.ws = new WebSocket(this.wsUri);
        this.sendJson({'Message': ''});

        this.ws.onerror = function(evt) {
            if (this.onerror)
                this.onerror(evt);
        }.bind(this);

        this.ws.onmessage = function(evt) {
            console.log("COMM" + this.conn + ":   RECV <--:   " + evt.data);

            var jobj = JSON.parse(evt.data);
            if (jobj['Message'] === 'Error') {
                if (jobj['Text'] === '401 Unauthorized') {
                    this.nonce = jobj['Nonce'];

                    if (this.auth == 0 && this.username && this.password)
                        var digest = this.username + ":" + md5(this.username + ":" + this.nonce + ":" + this.password);
                    else if (this.onauth) {
                        this.onauth(evt);
                        return;
                    }
                    else
                        var digest = "jnior:" + md5("jnior:" + this.nonce + ":jnior");

                    // can provide autnentication now
                    var response = new Object();
                    response['Auth-Digest'] = digest;
                    this.sendJson(response);
                    this.auth++;
                }
            }
            else {
                if (!this.open && jobj['Message'] === 'Monitor') {
                    // we are now open
                    this.open = true;
                    if (this.onopen)
                        this.onopen(evt);
                }
                if (this.onmessage)
                    this.onmessage(evt);
            }
        }.bind(this);

        // called to provide authentication
        this.authenticate = function(username, password) {
            if (this.nonce && username && password) {
                this.auth = 0;
                this.username = username;
                this.password = password;
                var digest = username + ":" + md5(username + ":" + this.nonce + ":" + password);

                var response = new Object();
                response['Auth-Digest'] = digest;
                this.sendJson(response);
                this.auth++;
                this.nonce = null;
            }
        }.bind(this);

        // cause reconnect if we close		
        this.ws.onclose = function(evt) {
            this.reconnect();
            if (this.onclose)
                this.onclose(evt);
        }.bind(this);
    };

    this.reconnect = function() {
        if (!this.ws || this.ws.readyState == 3)
            this.connect();
    }.bind(this);

    // background check to catch any odd disconnect
    setInterval(this.reconnect, 5000);

    this.sendJson = function(json) {
        var message = JSON.stringify(json);

        // wait for socket ready to send
        this.socketWait(this.conn, function() {
            console.log("COMM" + this.conn + ":   SEND -->:   " + message);	// $$$$$$$$$$
            this.ws.send(message);
        }.bind(this));
    }.bind(this);

    this.socketWait = function(conn, callback) {
        if (conn == this.conn) {
            if (this.ws.readyState === 1) {
                if (callback != null)
                    callback();
                return;
            }
            else if (this.ws.readyState === 0)
                setTimeout(function() {
                    this.socketWait(conn, callback);
                }.bind(this), 1000);
        }
    }.bind(this);
}
;

function istrue(str) {
    var val = str.trim();
    val = val.toLowerCase();
    if (val === "1" || val === "on" || val === "yes" || val === "true" || val === "enable" || val === "enabled")
        return (true);
    return (false);
}

