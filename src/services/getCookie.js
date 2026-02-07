import puppeteer from "puppeteer";

export default async function getFreshCookie(username, password) {
  console.log("Starting dit login");

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

    await page.goto("https://classweb.uoi.gr/login", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    await page.waitForSelector("#username", { timeout: 10000 });

    await page.type("#username", username);
    await page.type("#password", password);

    const submitSelector =
      'input[type="submit"], button[type="submit"], .btn-primary, button.btn';
    await page.waitForSelector(submitSelector);

    await Promise.all([
      page.click(submitSelector),
      page
        .waitForNavigation({ waitUntil: "networkidle2", timeout: 15000 })
        .catch(() => {}),
    ]);

    const currentUrl = page.url();

    if (page.url().includes("/login")) {
      console.log("Auth failed detected.");
      await browser.close();
      throw new Error("Invalid Credentials");
    }

    const cookies = await page.cookies();
    const jsession = cookies.find((c) => c.name === "JSESSIONID");

    if (jsession) {
      console.log("Success: Captured authenticated JSESSIONID");
      return jsession.value;
    } else {
      throw new Error("JSESSID failed");
    }
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
}
