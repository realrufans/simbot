const { Bot } = require("grammy");
const { Api, TelegramClient } = require("telegram");
const { StoreSession } = require("telegram/sessions/index.js");
const path = require("path");
const MTProto = require("@mtproto/core");
const { Module } = require("module");

const api_id = parseInt(process.env.apiId);
const api_hash = process.env.apiHash;

// 1. Create instance
const mtproto = new MTProto({
  api_id,
  api_hash,

  storageOptions: {
    path: path.resolve(__dirname, "./data/1.json"),
  },
});

// 2. Print the user country code
mtproto.call("help.getNearestDc").then((result) => {
  console.log("country:", result.country);
});

const botToken = process.env.botToken;
const apiId = parseInt(process.env.apiId);
const apiHash = process.env.apiHash;

// Initialize the Telegram bot
const bot = new Bot(botToken);

// Initialize the session
const storeSession = new StoreSession("my_session");

// Initialize the Telegram client with the session
const client = new TelegramClient(storeSession, apiId, apiHash, {
  connectionRetries: 5,
});

// Connect the Telegram client
client
  .connect()
  .then((data) => {
    console.log("Connected to Telegram", data);
  })
  .catch((error) => {
    console.error("Error connecting to Telegram:", error);
  });

// Set up the bot message handler
bot.on("message", async (ctx) => {
  try {
    (async () => {
      //   const client = new TelegramClient(
      //     new StringSession(stringSession),
      //     apiId,
      //     apiHash,
      //     { connectionRetries: 5 }
      //   );

      ctx.reply("h");
      // await client.start({
      //   botAuthToken: botToken,
      // });
      // console.log(client.session.save());
    })();
    // (async () => {
    //   const randomNumber = getRandomInt(0, 1000);

    //   const result = await client.invoke(
    //     new Api.channels.GetMessages({
    //       channel: "aatmakacollection",
    //       id: [randomNumber],
    //     })
    //   );

    //   ctx.reply(result);
    // })();
  } catch (error) {
    console.log("Error:", error);
  }
});

// Function to generate a random integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = bot;
