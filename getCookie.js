import puppeteer from "puppeteer";

export default async function getFreshCookie(username, password) {
  console.log("Starting automated login...");

  const browser = await puppeteer.launch({
    headless: "new",
  });

  try {
    const page = await browser.newPage();

    await page.goto("https://classweb.uoi.gr/login", {
      waitUntil: "networkidle2",
    });

    await page.type("#username", username);
    await page.type("#password", password);

    await Promise.all([
      page.click('input[type="submit"], button[type="submit"], .btn-submit'),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    const context = browser.defaultBrowserContext();

    const cookies = await context.cookies();

    const jsession = cookies.find((c) => c.name === "JSESSIONID");

    if (jsession) {
      console.log("captured JSESSIONID:", jsession.value);
      return jsession.value;
    } else {
      throw new Error("Finding JSESSID");
    }
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
}
