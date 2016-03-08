# Slipshod

## Installation

```
$ npm install --save slipshod
```

```js
// app.js

var slipshod = require("slipshod");
slipshod.connect(function(bot){
  bot.on("dm", function(msg){
    msg.reply(msg.text.split(" ").reverse().join(" "))
  })
});
```

- Create a bot user: https://my.slack.com/services/new/bot

```
token=the-token-you-got-from-above-url node app.js
```

## Contributing

- `git clone https://github.com/ga-dc/slipshod.git`
- `cd slipshod/`
- `npm install`
