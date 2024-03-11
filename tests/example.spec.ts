import { test, expect, defineConfig } from "@playwright/test";
import { FunctionsError } from "@supabase/supabase-js";
//  {deleteUser}from '../AIMS/app/auth/callback/route.ts';

const space = "%20"; // URL encoding for space (ASCII 0x20 = 32)

function getRandomLetter(): string {
  const alphabet = "cdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  const randomLetter = alphabet.charAt(randomIndex);
  return randomLetter;
}

////////// Test for Successful Redirection to Sign Up Page (No account yet) //////////
test("1. Successful Redirection to Sign Up Page", async ({ page }) => {
  await page.goto("https://aims-omega.vercel.app/login"); // Go to login page
  await page.click("text=Sign Up"); // Click the Sign Up button
  await page.waitForNavigation(); // Wait for the page to navigate
  const currentUrl = page.url(); // Get the current URL
  expect(currentUrl).toBe("https://aims-omega.vercel.app/signup"); // Use expect to check the URL
});

////////// Successful Sign In //////////

test("2a. Successful Login", async ({ page }) => {
  // Valid Email and Password Should Sign In Successfully
  await page.goto("https://aims-omega.vercel.app/login");
  await page.fill('input[name="email"]', "hlgregorio@Up.edu.ph");
  await page.fill('input[name="password"]', "AIMS123");
  await page.click("text=Sign In");
  await page.waitForNavigation();
  const currentUrl = page.url();

  expect(currentUrl).toBe(
    `https://aims-omega.vercel.app/main?message=Signed${space}in${space}successfully`,
  );
});

test("2b. Successful Login", async ({ page }) => {
  // Valid Email and Password Should Sign In Successfully
  await page.goto("https://aims-omega.vercel.app/login");
  await page.fill('input[name="email"]', "sample@example.com");
  await page.fill('input[name="password"]', "AIMS123");
  await page.click("text=Sign In");
  await page.waitForNavigation();
  const currentUrl = page.url();

  expect(currentUrl).toBe(
    `https://aims-omega.vercel.app/main?message=Signed${space}in${space}successfully`,
  );
});

////////// Unsuccessful Sign In //////////

test("3. Wrong Password", async ({ page }) => {
  await page.goto("https://aims-omega.vercel.app/login");
  await page.fill('input[name="email"]', "hlgregorio@up.edu.ph");
  await page.fill('input[name="password"]', "WrongPassword");
  await page.click("text=Sign In");
  await page.waitForNavigation();
  const currentUrl = page.url();

  expect(currentUrl).toBe(
    `https://aims-omega.vercel.app/login?message=Invalid${space}login${space}credentials`,
  );
});

test("4. Non-Existing Email", async ({ page }) => {
  await page.goto("https://aims-omega.vercel.app/login");
  await page.fill('input[name="email"]', "NoneExistingEmail@up.edu.ph");
  await page.fill('input[name="password"]', "AIMS123");
  await page.click("text=Sign In");
  await page.waitForNavigation();
  const currentUrl = page.url();

  expect(currentUrl).toBe(
    `https://aims-omega.vercel.app/login?message=Invalid${space}login${space}credentials`,
  );
});

////////// Successful Sign Up NOT YET WORKING //////////
// test('Successful User Sign Up', async ({ page }) => {
//   const user : string = getRandomLetter();

//   await page.goto('https://aims-omega.vercel.app/signup');
//   await page.fill('input[name="email"]', `${user}@example.com`);
//   await page.fill('input[name="password"]', 'AIMS123');
//   await page.click('text=Sign Up');
//   await page.waitForNavigation();
//   const currentUrl = page.url();

//   expect(currentUrl).toBe(`https://aims-omega.vercel.app/main?message=Account%20created!`);
//   deleteUser('sample@example.com');

// });

////////// Unsuccessful Sign Up //////////
test("5. Existing User Signs Up", async ({ page }) => {
  await page.goto("https://aims-omega.vercel.app/signup");
  await page.fill('input[name="email"]', "sample@example.com");
  await page.fill('input[name="password"]', "AIMS123");
  await page.click("text=Sign Up");
  await page.waitForNavigation();
  const currentUrl = page.url();

  expect(currentUrl).toBe(
    `https://aims-omega.vercel.app/signup?message=User${space}already${space}registered`,
  );
});

////////// Unsuccessful Sign Up //////////
test("6a. Invalid Email Format", async ({ page }) => {
  await page.goto("https://aims-omega.vercel.app/signup");
  await page.fill('input[name="email"]', "InvalidEmail");
  await page.fill('input[name="password"]', "AIMS123");
  await page.click("text=Sign Up");
  await page.waitForNavigation();
  const currentUrl = page.url();

  expect(currentUrl).toBe(
    `https://aims-omega.vercel.app/signup?message=Unable${space}to${space}validate${space}email${space}address:${space}invalid${space}format`,
  );
});

test("6b. Invalid Email Format", async ({ page }) => {
  await page.goto("https://aims-omega.vercel.app/signup");
  await page.fill('input[name="email"]', "wala");
  await page.fill('input[name="password"]', "123456");
  await page.click("text=Sign Up");
  await page.waitForNavigation();
  const currentUrl = page.url();

  expect(currentUrl).toBe(
    `https://aims-omega.vercel.app/signup?message=Unable${space}to${space}validate${space}email${space}address:${space}invalid${space}format`,
  );
});

test("7a. Invalid Password Format", async ({ page }) => {
  await page.goto("https://aims-omega.vercel.app/signup");
  await page.fill('input[name="email"]', "sample@example.com");
  await page.fill('input[name="password"]', "5char");
  await page.click("text=Sign Up");
  await page.waitForNavigation();
  const currentUrl = page.url();

  expect(currentUrl).toBe(
    `https://aims-omega.vercel.app/signup?message=Password${space}should${space}be${space}at${space}least${space}6${space}characters.`,
  );
});

test("7b. Invalid Password Format", async ({ page }) => {
  await page.goto("https://aims-omega.vercel.app/signup");
  await page.fill('input[name="email"]', "sample@example.com");
  await page.fill('input[name="password"]', " ");
  await page.click("text=Sign Up");
  await page.waitForNavigation();
  const currentUrl = page.url();

  expect(currentUrl).toBe(
    `https://aims-omega.vercel.app/signup?message=Password${space}should${space}be${space}at${space}least${space}6${space}characters.`,
  );
});

test("8. Add new Item", async ({ page }) => {
  test.setTimeout(100000);
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "abc@gmail.com");
  await page.fill('input[name="password"]', "abcdef");
  await page.click("text=Sign in");
  await page.waitForNavigation();
  await page.goto("http://localhost:3000/inventory");
  await page.click("text=Add new item");
  await page.fill('input[name="name"]', "Sample Item");
  await page.fill('input[name="category"]', "Sample category");
  await page.fill('input[name="price"]', "100", { force: true });
  await page.click("button#additembtn", { force: true });
  await page.waitForNavigation();
  const currentUrl = page.url();
  expect(currentUrl).toBe(
    `http://localhost:3000/inventory?message=Item%20added%20successfully`,
  );
});

test("9a. Does not allow adding new items if they did not input a name.", async ({
  page,
}) => {
  const errors: any[] = [];
  page.on("dialog", (alert) => {
    errors.push(alert.message());
  });
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "abc@gmail.com");
  await page.fill('input[name="password"]', "abcdef");
  await page.click("text=Sign in");
  await page.waitForNavigation();
  await page.goto("http://localhost:3000/inventory");
  await page.click("text=Add new item");
  await page.fill('input[name="category"]', "Sample category");
  await page.fill('input[name="price"]', "100", { force: true });
  await page.click("button#additembtn", { force: true });
  await page.waitForTimeout(5000);
  expect(errors).toStrictEqual([
    "Please fill up every field with valid inputs",
  ]);
});

test("9b. Does not allow adding new items if they did not input a category.", async ({
  page,
}) => {
  const errors: any[] = [];
  page.on("dialog", (alert) => {
    errors.push(alert.message());
  });
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "abc@gmail.com");
  await page.fill('input[name="password"]', "abcdef");
  await page.click("text=Sign in");
  await page.waitForNavigation();
  await page.goto("http://localhost:3000/inventory");
  await page.click("text=Add new item");
  await page.fill('input[name="name"]', "Sample name");
  await page.fill('input[name="price"]', "100", { force: true });
  await page.click("button#additembtn", { force: true });
  await page.waitForTimeout(5000);
  expect(errors).toStrictEqual([
    "Please fill up every field with valid inputs",
  ]);
});

test("9c. Does not allow adding new items if they did not input a price.", async ({
  page,
}) => {
  const errors: any[] = [];
  page.on("dialog", (alert) => {
    errors.push(alert.message());
  });
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "abc@gmail.com");
  await page.fill('input[name="password"]', "abcdef");
  await page.click("text=Sign in");
  await page.waitForNavigation();
  await page.goto("http://localhost:3000/inventory");
  await page.click("text=Add new item");
  await page.fill('input[name="name"]', "Sample name");
  await page.fill('input[name="category"]', "Sample category");
  await page.click("button#additembtn", { force: true });
  await page.waitForTimeout(5000);
  expect(errors).toStrictEqual([
    "Please fill up every field with valid inputs",
  ]);
});

test("9d. Does not allow adding new items if they did not input an invalid price.", async ({
  page,
}) => {
  const errors: any[] = [];
  page.on("dialog", (alert) => {
    errors.push(alert.message());
  });
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "abc@gmail.com");
  await page.fill('input[name="password"]', "abcdef");
  await page.click("text=Sign in");
  await page.waitForNavigation();
  await page.goto("http://localhost:3000/inventory");
  await page.click("text=Add new item");
  await page.fill('input[name="name"]', "Sample name");
  await page.fill('input[name="category"]', "Sample category");
  await page.fill('input[name="price"]', "-1", { force: true });
  await page.click("button#additembtn", { force: true });
  await page.waitForTimeout(5000);
  expect(errors).toStrictEqual([
    "Please fill up every field with valid inputs",
  ]);
});

test("11. Add stock to Item", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "abc@gmail.com");
  await page.fill('input[name="password"]', "abcdef");
  await page.click("text=Sign in");
  await page.waitForNavigation();
  await page.goto("http://localhost:3000/inventory");
  await page.click("button#Samplerestockbtn");
  await page.fill('input[name="quantity"]', "10", { force: true });
  await page.click("text=Save");
  await page.waitForNavigation();
  const currentUrl = page.url();
  expect(currentUrl).toBe(
    `http://localhost:3000/inventory?message=Stock%20added%20successfully`,
  );
});
