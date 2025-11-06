import { test } from '@playwright/test';
import { Eyes, ClassicRunner, Target } from '@applitools/eyes-playwright';

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
