  
# Discord-Chatbot

Quick Alt account finder for Discord.js.

  

![djs-alt-finder](https://nodei.co/npm/djs-alt-finder.png)

  

# Features

- Beginner friendly

- Easy to use

  

# Quick Example

  

```js

const {Checker} =  require("djs-alt-finder");
const {Client} = require("discord.js");
const client = new Client();
const alts = new Checker(client, {days:14, guildOnly: false})
client.on("ready", () => {
    console.log("I am Ready");
    const checked = alts.checkUser(client.user)
    console.log(checked);
    /*
    [{
        user: ClientUser {
      id: '798139341922369566Use',
      system: null,
      locale: null,
      flags: null,
      username: 'test bot',
      bot: true,
      discriminator: '0931',   
      avatar: null,
      lastMessageID: null,     
      lastMessageChannelID: null,
      verified: true,
      mfaEnabled: true,
    },
        time: {
            days: 2,
            hours: 0,
            minutes: 57,
            seconds: 18,
            milliseconds: 56,
            microseconds: 0,
            nanoseconds: 0
        }
        }]
    */
})

```


# Links
- **[Documentation](https://dev.udit.gq/djs-alt-finder)**
- **[Discord Support Server](https://discord.gg/2SUybzb)**
- **[GitHub](https://github.com/udit2303/djs-alt-finder)**



# Discord Server
[![](https://i.imgur.com/f6hNUfc.png)](https://discord.gg/2SUybzb)