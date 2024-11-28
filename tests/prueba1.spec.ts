import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://safeguru.com/');
    await page.getByLabel('Accept all cookies').click();

});

test('Homepage loads correctly', async ({ page }) => {
    await page.goto('https://safeguru.com/');
    await expect(page).toHaveTitle('Safeguru | Expertos en seguridad laboral e industrial');
});

test('Homepage include header, footer and featured product sections', async ({page}) =>{
    await expect(page.locator('div').filter({ hasText: '¿Qué estás buscando?' }).nth(2)).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('button').first()).toBeVisible();
    await page.getByRole('navigation').getByRole('button').first().click();
    await expect(page.getByText('ProductosOfertas')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
});

test('Search and verify a product that you selected', async ({page}) =>{
    await page.getByRole('button', { name: 'search' }).click();
    await page.getByPlaceholder('¿Qué estás buscando?').fill('guantes');
    await page.getByPlaceholder('¿Qué estás buscando?').press('Enter');
    await expect(page.getByText('Buscar :Guantes')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Guantes anticorte POLIDYN' })).toBeVisible();
});

test('Select a product from the search and verify the product details', async ({page}) =>{
    await page.getByRole('button', { name: 'search' }).click();
    await page.getByPlaceholder('¿Qué estás buscando?').fill('guantes');
    await page.getByPlaceholder('¿Qué estás buscando?').press('Enter');
    await expect(page.getByText('Buscar :Guantes')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Guantes anticorte POLIDYN' })).toBeVisible();
    await page.getByRole('link', { name: 'Guantes anticorte POLIDYN' }).click();
    await expect(page.getByRole('heading', { name: 'Guantes anticorte POLIDYN' })).toBeVisible();
    await expect(page.getByText('3,36 €')).toBeVisible();
    await expect(page.getByText('Guantes anticorte de')).toBeVisible();
    await page.getByRole('img', { name: 'Guantes anticorte POLIDYN' }).nth(1).click();
    await expect(page.locator('[id="headlessui-dialog-panel-\\:rj\\:"]').getByRole('img', { name: 'Guantes anticorte POLIDYN' }).first()).toBeVisible();
    await page.locator('[id="headlessui-dialog-panel-\\:rj\\:"]').getByRole('img', { name: 'Guantes anticorte POLIDYN' }).nth(3).click();
    await expect(page.locator('[id="headlessui-dialog-panel-\\:rj\\:"]').getByRole('img', { name: 'Guantes anticorte POLIDYN' }).nth(1)).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.locator('label').filter({ hasText: 'Añadira la cesta' }).click();
    await page.locator('li').filter({ hasText: /^9$/ }).locator('button[name="Add unit"]').click();
    await page.locator('label').filter({ hasText: 'Añadira la cesta' }).click();
});

test('Add mutiple items to the cart and verify', async ({page}) =>{
    await page.getByRole('link', { name: 'Profile' }).click();
    await expect(page.getByRole('heading', { name: 'Tu carrito está vacío. Volver' })).toBeVisible();
    await page.getByRole('button', { name: 'search' }).click();
    await page.getByPlaceholder('¿Qué estás buscando?').fill('guantes');
    await page.getByPlaceholder('¿Qué estás buscando?').press('Enter');
    await page.getByRole('link', { name: 'Guantes anticorte POLIDYN' }).click();
    await expect(page.getByText('3,36 €')).toBeVisible();
    await page.locator('label').filter({ hasText: 'Añadira la cesta' }).click();
    await page.locator('li').filter({ hasText: /^9$/ }).locator('button[name="Add unit"]').click();
    await page.locator('label').filter({ hasText: 'Añadira la cesta' }).click();
    await page.getByRole('link', { name: 'Profile' }).click();
    await expect(page.getByRole('heading', { name: 'Carro (1 producto)' })).toBeVisible();
    await expect(page.locator('#price').getByText('€')).toBeVisible();
    await page.locator('#quantity-btn-increase').click();
    await expect(page.getByRole('heading', { name: 'Carro (2 productos)' })).toBeVisible();
    await expect(page.locator('#price').getByText('€')).toBeVisible();
    await page.locator('#quantity-btn-decrease').click();
    await expect(page.getByRole('heading', { name: 'Carro (1 producto)' })).toBeVisible();
    await expect(page.locator('#price').getByText('€')).toBeVisible();
});





  