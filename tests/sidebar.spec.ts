import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test.describe('Testing Sidebar Link', () => {
  test('should in Dashboard page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/');
    await expect(page).toHaveURL('http://localhost:3000');
    await expect(page).toHaveTitle(/Dashboard/);
  });
  test('should open Search page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Search' })).toHaveAttribute('href', '/search');
    await page.getByRole('link', { name: 'Search' }).click();
    await expect(page).toHaveURL(/search/);
    await expect(page).toHaveTitle(/Search/);
  });
  test('should open Author page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Author', exact: true })).toHaveAttribute('href', '/author');
    await page.getByRole('link', { name: 'Author', exact: true }).click();
    await expect(page).toHaveURL(/author/);
    await expect(page).toHaveTitle(/Author/);
  });
  test('should open Book page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Book', exact: true })).toHaveAttribute('href', '/book');
    await page.getByRole('link', { name: 'Book', exact: true }).click();
    await expect(page).toHaveURL(/book/);
    await expect(page).toHaveTitle(/Book/);
  });
  test('should open Quote page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Quote', exact: true })).toHaveAttribute('href', '/quote');
    await page.getByRole('link', { name: 'Quote', exact: true }).click();
    await expect(page).toHaveURL(/quote/);
    await expect(page).toHaveTitle(/Quote/);
  });
  test('should open Genre page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Genre', exact: true })).toHaveAttribute('href', '/genre');
    await page.getByRole('link', { name: 'Genre', exact: true }).click();
    await expect(page).toHaveURL(/genre/);
    await expect(page).toHaveTitle(/Genre/);
  });
  test('should open Tag page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Tag', exact: true })).toHaveAttribute('href', '/tag');
    await page.getByRole('link', { name: 'Tag', exact: true }).click();
    await expect(page).toHaveURL(/tag/);
    await expect(page).toHaveTitle(/Tag/);
  });
  test('should open Settings page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Settings' })).toHaveAttribute('href', '/settings');
    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page).toHaveURL(/settings/);
    await expect(page).toHaveTitle(/Settings/);
  });
});
