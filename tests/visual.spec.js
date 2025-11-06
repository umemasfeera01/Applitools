import { test } from '@playwright/test';
import { Eyes, ClassicRunner, Target } from '@applitools/eyes-playwright';

const STORE_URL = "https://thapas-technical.myshopify.com";
const STORE_PASSWORD = "ss"; // replace with your actual password if needed

// Function to unlock password-protected Shopify store
async function unlockStore(page) {
  if (!STORE_PASSWORD) return;

  // Go to password page
  await page.goto(`${STORE_URL}/password`);

  // Enter the password
  await page.fill('input[name="password"]', STORE_PASSWORD);

  // Click submit
  await page.click('button[type="submit"]');

  // Wait a few seconds for redirect
  await page.waitForTimeout(5000);

  console.log("✅ Store unlocked successfully!");
}

test('Shopify Homepage and Checkout visual test', async ({ page }) => {
  // Initialize Applitools
  const runner = new ClassicRunner();
  const eyes = new Eyes(runner);

  // Start Applitools visual test
  await eyes.open(page, 'Shopify Store', 'Homepage + Checkout Visual Test', { width: 1280, height: 800 });

  // STEP 1 — Unlock the Shopify store before visiting pages
  await unlockStore(page);

  // STEP 2 — Homepage Visual Check
  await page.goto(`${STORE_URL}`);
    await page.waitForTimeout(3000);
  await eyes.check('Homepage', Target.window());

  // STEP 3 — Checkout Visual Check
  await page.goto(`${STORE_URL}/checkout`);
    await page.waitForTimeout(3000);
  await eyes.check('Checkout', Target.window());

  // STEP 4 — Close Eyes session
  await eyes.closeAsync();

  console.log("✅ Visual test completed!");
});
