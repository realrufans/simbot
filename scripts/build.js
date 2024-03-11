import { getURL } from "vercel-grammy";
import bot from "../src/bot.mjs";

const { VERCEL_ENV } = process.env;

// List of allowed environments
const allowedEnvs = ["production", "preview"];

// Выход, если окружение не подходит
if (!allowedEnvs.includes(VERCEL_ENV)) {
  console.log(
    `Environment  "${VERCEL_ENV}" is not supported. Process terminated.`
  );
  process.exit(1);
}

// Generate URL for webhook
const url = getURL({ path: "api/update" });
console.log("URL webhook:", url);

// Webhook setup parameters
const options = {};

// Set webhook
try {
  await bot.api.setWebhook(url, options);
  const webhookInfo = await bot.api.getWebhookInfo();
  console.info("Webhook set to URL:", webhookInfo.url);
} catch (error) {
  console.error("Error setting webhook:", error);
  process.exit(1);
}
