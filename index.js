var slipshod = require("./slipshod");

slipshod.connect(function(bot){
  bot.on("dm", function(msg){
    console.log("dmd", msg);
  })
  bot.on("mention", function(msg){

    msg.reply(msg.text.split(" ").reverse().join(" "), function(response){
      console.log(response)
    })
  })
})
