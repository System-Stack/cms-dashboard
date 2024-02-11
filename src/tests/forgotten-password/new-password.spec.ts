import { test, expect } from '@playwright/test'
import testAxe from '../helpers/accessibility'
import PublicPage from '../helpers/public-page'

test.describe('New password page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/forgotten-password/new-password')
    })

    test('is accessible', async ({ page }) => {
        await testAxe(page, 'Login')()
    })

    test('has layout elements', async ({ page }) => {    
        const publicPage = PublicPage(page)
        await publicPage.hasElements('Forgotten Password : New Password')
    })

    test('has one header', async ({ page }) => {
        const h1 = page.getByRole('heading', { level: 1 })
        await expect(h1).toHaveCount(1)
        await expect(h1).toContainText('New Password')
    })

    test('has a prompt', async ({ page }) => {
        await expect(page.getByText('Please enter a new your password to use.')).toBeVisible()
    })

    test('has a form', async ({ page }) => {
        await expect(page.getByRole('form', { name: 'New password form' })).toHaveCount(1)
    })

    test('has an input field for e-mail', async ({ page }) => {
        const password = page.getByLabel('New Password', { exact: true })

        await expect(password).toBeVisible()
        await expect(password).toHaveCount(1)
        await expect(password).toHaveAttribute('type', 'password')
        await expect(password).toHaveAttribute('required')
        await expect(password).toHaveAttribute('aria-required', 'true')
        await expect(password).toHaveAttribute('aria-invalid', 'false')
        await expect(password).toHaveAttribute('autoComplete', 'new-password')
    })

    test('has a submit button', async ({ page }) => {
        const submit = page.getByRole('button', { name: 'Save password' })

        await expect(submit).toBeVisible()
        await expect(submit).toHaveCount(1)
        await expect(submit).toHaveAttribute('type', 'submit')
    })

    test.describe('form validation', () => {
        test('accepts valid input', async ({ page }) => {

            const requestPromise = page.waitForRequest('/api/new-password')

            await page.getByLabel('New Password', { exact: true }).fill('pAssw0rd')
            await page.getByRole('button', { name: 'Save password' }).click()
            
            await expect(page).toHaveURL('/api/new-password')
            const request = await requestPromise
            expect(request.postData()).toEqual('new-password=pAssw0rd')
        })

        test('the new password field is required', async ({ page }) => {
            await page.getByRole('button', { name: 'Save password' }).click()

            await expect(page).toHaveURL('/forgotten-password/new-password')
            await expect(page.getByLabel('New Password', { exact: true }).and(page.locator(':invalid'))).toBeVisible()
        })
    })
    
})