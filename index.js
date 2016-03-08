var slipshod = require("./lib/slipshod");

slipshod.connect(function(bot){
  bot.on("dm", function(msg){
    console.log(msg)
  })
})
