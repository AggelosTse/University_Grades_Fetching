import puppeteer from "puppeteer";

export default async function getFreshCookie() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  try {
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    );

    const ditloginURL = process.env.LOGIN_URL;
    await page.goto(ditloginURL, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    await page.waitForSelector("#username", { timeout: 10000 });

    const ditname = process.env.ditusername;
    const ditpass = process.env.ditpassword;
    await page.type("#username", ditname);
    await page.type("#password", ditpass);

    const submitSelector =
      'input[type="submit"], button[type="submit"], .btn-primary, button.btn';
    await page.waitForSelector(submitSelector);

    await Promise.all([
      page.click(submitSelector),
      page
        .waitForNavigation({ waitUntil: "networkidle2", timeout: 15000 })
        .catch(() => {}),
    ]);

    if (page.url().includes("/login")) {
      throw new Error("Invalid Credentials");
    }

    const cookies = await page.cookies();
    const jsession = cookies.find((c) => c.name === "JSESSIONID");

    if (jsession) {
      console.log("Success: Captured authenticated JSESSIONID");
      return jsession.value;
    } else {
      throw new Error("Failed to catch JSESSID");
    }
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
}
