var slipshod = require("./slipshod");

slipshod.connect(function(bot){
  bot.on("dm", function(msg){
    console.log(msg)
  })
})
