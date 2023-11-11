const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

// Optional: If you'd like to use the legacy headless mode. "new" is the default.
chromium.setHeadlessMode = true;

// Optional: If you'd like to disable webgl, true is the default.
chromium.setGraphicsMode = false;

const handler = async (event = { url: "https://bntharu.com.np" }, context) => {
  const executablePath = await chromium.executablePath;
  console.log(`executable path: ${executablePath}`);

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  let pageTitle = "";

  try {
    console.log("event url", event.url);
    await page.goto(event.url);
    pageTitle = await page.title();
  } catch (error) {
    console.error(error);
  } finally {
    await page.close();
    await browser.close();
  }
  return {
    pageTitle,
  };
};

module.exports.handler = handler;
