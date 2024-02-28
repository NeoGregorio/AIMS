import { test, expect } from "@playwright/test";
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
  await page.goto("https://aims-omega.vercel.app/login");           // Go to login page
  await page.click("text=Sign Up");                                 // Click the Sign Up button
  await page.waitForNavigation();                                   // Wait for the page to navigate
  const currentUrl = page.url();                                    // Get the current URL
  expect(currentUrl).toBe("https://aims-omega.vercel.app/signup");  // Use expect to check the URL
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
    `https://aims-omega.vercel.app/main?message=Signed${space}in${space}successfully`
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
    `https://aims-omega.vercel.app/main?message=Signed${space}in${space}successfully`
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
    `https://aims-omega.vercel.app/login?message=Invalid${space}login${space}credentials`
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
    `https://aims-omega.vercel.app/login?message=Invalid${space}login${space}credentials`
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
    `https://aims-omega.vercel.app/signup?message=User${space}already${space}registered`
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
    `https://aims-omega.vercel.app/signup?message=Unable${space}to${space}validate${space}email${space}address:${space}invalid${space}format`
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
    `https://aims-omega.vercel.app/signup?message=Unable${space}to${space}validate${space}email${space}address:${space}invalid${space}format`
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
    `https://aims-omega.vercel.app/signup?message=Password${space}should${space}be${space}at${space}least${space}6${space}characters.`
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
    `https://aims-omega.vercel.app/signup?message=Password${space}should${space}be${space}at${space}least${space}6${space}characters.`
  );
});

