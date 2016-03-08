var WebSocket = require ( "ws" );
var request = require("request");

var listeners = { dm: [], mention: []};

function reply( message, callback ){
  request( "https://slack.com/api/chat.postMessage?token=" + process.env.token + "&text=" + encodeURIComponent(message) + "&channel=" + this.channel, function( err, response, body ){
    callback(JSON.parse(body))
  })
}

var slipshod = {
  connect: function( callback ){
    var self = this;
    request( "https://slack.com/api/rtm.start?token=" + process.env.token, function( err, response, body ){
      self.user = JSON.parse(body).self;
      var ws = new WebSocket( JSON.parse( body ).url );
      callback(self);
      ws.on( "message", function( msgObj ){
        var msg = JSON.parse(msgObj);
        msg.reply = reply;
        if(msg.type == "message" && msg.channel.substr(0,1) == "D"){
          for(var i = 0; i < listeners.dm.length; i++){
            listeners.dm[i].call(msg, msg);
          }
          return;
        }
        if(msg.type == "message" && !msg.subtype && msg.text.match(self.user)){
          for(var i = 0; i < listeners.mention.length; i++){
            listeners.mention[i].call(msg, msg);
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
