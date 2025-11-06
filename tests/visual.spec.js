import { test } from '@playwright/test';
import { Eyes, ClassicRunner, Target } from '@applitools/eyes-playwright';

const STORE_URL = "https://thapas-technical.myshopify.com/";
const STORE_PASSWORD = 'ss';

async function unlockStore(page) {
  if (!STORE_PASSWORD) return;
  await page.goto(`${STORE_URL}/password`);
  await page.fill('input[name="password"]', STORE_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000); // ✅ updated
}

test('Shopify Homepage and Checkout visual test', async ({ page }) => {
  // Initialize Applitools
  const runner = new ClassicRunner();
  const eyes = new Eyes(runner);

  // Start visual test
  await eyes.open(page, 'Shopify Store', 'Homepage + Checkout Visual Test', { width: 1280, height: 800 });

  // Test 1: Homepage
  await page.goto('https://thapas-technical.myshopify.com/');
  await eyes.check('Homepage', Target.window());

  // Test 2: Checkout
  await page.goto('https://thapas-technical.myshopify.com/checkout');
  await eyes.check('Checkout', Target.window());

  // Close Eyes
  await eyes.closeAsync();
});
