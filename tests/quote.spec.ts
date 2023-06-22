import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/quote');
});

async function logout(page: Page) {
  await page.goto('http://localhost:3000/session');
  await page.getByRole('button', { name: 'Delete All' }).click();
  await expect(page.getByRole('heading', { name: 'Delete All Session' })).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Deleting All Session')).toBeVisible();
  await expect(page.getByText('Success delete all session')).toBeVisible();
  await page.goto('http://localhost:3000/logout');
  await expect(page).toHaveTitle(/Dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
}

async function login(page: Page) {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Username').fill('develop');
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Success Login')).toBeVisible();
}

async function goToLastPage(page: Page) {
  await page.reload();
  await page.getByRole('button', { name: 'Last' }).click();
}

test.describe('Testing Quote Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await expect(page).toHaveURL(/quote/);
    await expect(page).toHaveTitle(/Quote/);
    await expect(page.getByRole('heading', { name: 'Quote' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add New Quote' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'No' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Quote' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Author' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Action' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '"Be yourself; everyone else is already taken."' })).toBeVisible();
    await expect(
      page
        .getByRole('row', { name: '1 "Be yourself; everyone else is already taken." Oscar Wilde Edit Delete' })
        .getByRole('cell', { name: 'Oscar Wilde' })
    ).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('be yourself');
    await expect(page.getByRole('cell', { name: '"Be yourself; everyone else is already taken."' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Bob Marley' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '"So many books, so little time."' })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Frank Zappa' })).not.toBeVisible();
  });
  test('should only can create new quote after login', async ({ page }) => {
    await page.getByRole('link', { name: 'Add New Quote' }).click();
    await expect(page.getByPlaceholder('Search and Select Author')).toBeVisible();
    await expect(page.getByText('Tags', { exact: true })).toBeVisible();
    await page.getByPlaceholder('Be yourself, everyone else is already taken.').fill('New Quote');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
  test('should fill required field when creating new quote', async ({ page }) => {
    await login(page);
    // go to quote page
    await page.getByRole('link', { name: 'Quote', exact: true }).click();
    // go to add quote page
    await page.getByRole('link', { name: 'Add New Quote' }).click();
    // save without fill any field
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Quote required')).toBeVisible();
  });
  test('should can create new quote after login', async ({ page }) => {
    await login(page);
    // go to quote page
    await page.getByRole('link', { name: 'Quote', exact: true }).click();
    // go to add quote page
    await page.getByRole('link', { name: 'Add New Quote' }).click();
    // create quote
    await page.getByPlaceholder('Be yourself, everyone else is already taken.').fill('New Quote');
    await page.getByRole('button', { name: 'Author Show options' }).click();
    await page.getByRole('option', { name: 'Suzanne Collins' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Success add quote')).toBeVisible();
    // cek new created quote
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: '"New Quote"' })).toBeVisible();
  });
  test('should can edit new created quote after login', async ({ page }) => {
    await login(page);
    // go to quote page
    await page.getByRole('link', { name: 'Quote', exact: true }).click();
    // go to table last page
    await page.getByRole('button', { name: 'Last' }).click();
    await expect(page.getByRole('cell', { name: '"New Quote"' })).toBeVisible();
    // edit new created quote
    await page
      .getByRole('row', { name: '271 "New Quote" Suzanne Collins Edit Delete' })
      .getByRole('link', { name: 'Edit' })
      .click();
    await page.getByPlaceholder('Be yourself, everyone else is already taken.').fill('New Quote Edit');
    await page.getByRole('button', { name: 'Author Show options' }).click();
    await page.getByRole('option', { name: 'Jane Austen' }).click();
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText(/Updating/)).toBeVisible();
    await expect(page.getByText('Success update quote')).toBeVisible();
    // cek new edited quote
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: '"New Quote Edit"' })).toBeVisible();
  });
  test('should can delete quote after login', async ({ page }) => {
    await login(page);
    // go to quote page
    await page.getByRole('link', { name: 'Quote', exact: true }).click();
    // go to table last page
    await page.getByRole('button', { name: 'Last' }).click();
    // delete quote
    await page
      .getByRole('row', { name: '271 "New Quote Edit" Jane Austen Edit Delete' })
      .getByRole('button', { name: 'Delete' })
      .click();
    await expect(page.getByRole('heading', { name: 'Delete Quote' })).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText(/Deleting/)).toBeVisible();
    await expect(page.getByText('Success delete quote')).toBeVisible();
    // cek deleted quote
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: '"New Quote Edit"' })).not.toBeVisible();

    await logout(page);
  });
});
