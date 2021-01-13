const ms = require('parse-ms');

const {EventEmitter} = require("events");

class Client extends EventEmitter{ 

    /**

     * 

     * @param {instance} client Discord.js Client Instance 

     * @param {object} options Options for Checking

     * @param {number} options.days Number of Minimum days the account must be old

     * @param {boolean} options.autocheck Wheter to auto check if the account is an alt on guildMemberAdd event

     * @param {boolean} options.guildOnly Wheter to auto check for a specific guild

     * @param {string} options.GuildId The Guild ID if options.guildOnly is true 

     */

    constructor(client, ops = {days:14, autocheck: false, guildOnly: false, GuildId:null}){

        if(!client) throw new Error("No client instance was specified");

        super(client);

        if(ops.guildOnly && !ops.GuildId) throw new Error("Option for guildOnly was enabled but no GuildID was provided");

        if(ops.guildOnly && typeof ops.GuildId !==  'string') throw new Error(`Expected ops.GuildID to be string, recieved ${typeof ops.GuildId}`);

        if(typeof ops.days !== 'number') throw new Error(`Expected Days to be ops.number, recieved ${typeof ops.days}`);

        if(typeof ops.autocheck !== 'boolean') throw new Error(`Expected ops.autocheck to be boolean, recieve ${typeof ops.autocheck}`); 

        this.ops = ops;

        this.autocheck();

    }

    /**

     * 

     * @param {object} user Discord.js User Object 

     * @returns {Array} List Of found accounts

     * @returns {Array.user} The user found

     * @returns {Array.time} Time the account has been registered on discord for

     */

 checkUser(user){

     if(!user) throw new Error("No User or Array of Users was specified");

     if(!user.createdAt && !user[0].createdAt) throw new Error(`Expected a Discord.js user, Recieved Unknown`);

     let found = [];

     if(Array.isArray(user)){

         user.forEach(u => {

             const time = new Date().getTime() - u.createdAt.getTime();

             if(ms(time).days <= this.ops.days){

                 found.push({user: u, time: ms(time)});

             }

         });

     } else {

        const time = new Date().getTime() - user.createdAt.getTime();

        if(ms(time).days <= this.ops.days){

            found.push({user: user, time: ms(time)});

     }

 }

 return found;

}

/**

 * @ignore

 */

autocheck(){

    if(this.ops.autocheck){

        this.client.on('guildMemberAdd', member => {

            if(this.ops.guildOnly && this.ops.GuildId == member.guild.guild.id){

                const time = new Date().getTime() - member.user.createdAt.getTime();

            if(ms(time).days <= this.ops.days){

                this.emit('altFound', member, ms(time));

            }

            } else if(!this.ops.guildOnly){

                const time = new Date().getTime() - member.user.createdAt.getTime();

            if(ms(time).days <= this.ops.days){

                this.emit('altFound', member, ms(time));

            }

            }

        })

    }

}

}

/**

 * Emitted when an Alt is found

 * @event altFound 

 * @param {Object} Member The member that is a suspected alternate account

 * @param {object} Time Time the member has been registered on discord for

 */

module.exports = Client;