var env = require("./env");
var WebSocket = require ( "ws" );
var request = require("request");

var listeners = { dm: [], mention: []};

var slipshod = {
  connect: function( callback ){
    var self = this;
    request( "https://slack.com/api/rtm.start?token=" + env.token, function( err, response, body ){
      self.user = JSON.parse(body).self;
      var ws = new WebSocket( JSON.parse( body ).url );
      callback(self);
      ws.on( "message", function( msgObj ){
        var msg = JSON.parse(msgObj);
        if(msg.type == "message" && msg.channel.substr(0,1) == "D"){
          for(var i = 0; i < listeners.dm.length; i++){
            listeners.dm[i](msg);
          }
          return;
        }
        if(msg.type == "message" && msg.text.match(self.user)){
          for(var i = 0; i < listeners.mention.length; i++){
            listeners.mention[i](msg);
          }
        }
      });
    });
  },
  on: function( event, callback ){
    listeners[event].push(callback)
  },
  user: null
}

module.exports = slipshod;
