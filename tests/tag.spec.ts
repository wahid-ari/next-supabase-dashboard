import { test, expect, type Page } from '@playwright/test';

async function goToPage(page: Page) {
  await page.goto('http://localhost:3000/tag');
}

async function logout(page: Page) {
  await page.goto('http://localhost:3000/session');
  await page.getByRole('button', { name: 'Delete All' }).click();
  await expect(page.getByRole('heading', { name: 'Delete All Session' })).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Deleting All Session')).toBeVisible();
  await expect(page.getByText('Success delete all session')).toBeVisible();
  await page.goto('http://localhost:3000/logout');
  // await expect(page).toHaveTitle(/Dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
}

async function login(page: Page) {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Username').fill('develop');
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Success Login')).toBeVisible();
}

test.describe('Testing Tag Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await goToPage(page);
    await expect(page).toHaveURL(/tag/);
    await expect(page).toHaveTitle(/Tag/);
    await expect(page.getByRole('heading', { name: 'Tag' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add New Tag' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await goToPage(page);
    await expect(page.getByRole('cell', { name: 'No', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Action' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Love' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Life' })).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await goToPage(page);
    await page.getByPlaceholder('Search').fill('love');
    await expect(page.getByRole('cell', { name: 'Love' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Life' })).not.toBeVisible();
  });
  test('should only can create new tag after login', async ({ page }) => {
    await goToPage(page);
    await page.getByRole('button', { name: 'Add New Tag' }).click();
    await page.getByPlaceholder('Tag Name').fill('Tag');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
  test('should fill required field when creating new tag', async ({ page }) => {
    // Login
    await login(page);
    // go to tag page
    await page.getByRole('link', { name: 'Tag', exact: true }).click();
    // add new tag
    await page.getByRole('button', { name: 'Add New Tag' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Name required')).toBeVisible();
  });
  test('should can create new tag after login', async ({ page }) => {
    // Login
    await login(page);
    // go to tag page
    await page.getByRole('link', { name: 'Tag', exact: true }).click();
    // add new tag
    await page.getByRole('button', { name: 'Add New Tag' }).click();
    await page.getByPlaceholder('Tag Name').fill('New Tag Test');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Success add tag')).toBeVisible();
    // cek new created tag
    await page.reload();
    await expect(page.getByRole('cell', { name: 'New Tag Test' })).toBeVisible();
  });
  test('should can edit new created tag after login', async ({ page }) => {
    // Login
    await login(page);
    // go to tag page
    await page.getByRole('link', { name: 'Tag', exact: true }).click();
    // edit tag
    await page.getByRole('row', { name: '26 New Tag Test Edit Delete' }).getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Name').fill('Edit Tag Test');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Updating tag')).toBeVisible();
    await expect(page.getByText('Success update tag')).toBeVisible();
    // cek new edited tag
    await page.reload();
    await expect(page.getByRole('cell', { name: 'New Tag Test' })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Edit Tag Test' })).toBeVisible();
  });
  test('should can delete tag after login', async ({ page }) => {
    // Login
    await login(page);
    // go to tag page
    await page.getByRole('link', { name: 'Tag', exact: true }).click();
    // delete tag
    await page
      .getByRole('row', { name: '26 Edit Tag Test Edit Delete' })
      .getByRole('button', { name: 'Delete' })
      .click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText(/Deleting/)).toBeVisible();
    await expect(page.getByText('Success delete tag')).toBeVisible();
    // cek deleted tag
    await page.reload();
    await expect(page.getByRole('cell', { name: 'Edit Tag Test' })).not.toBeVisible();

    await logout(page);
  });
});
