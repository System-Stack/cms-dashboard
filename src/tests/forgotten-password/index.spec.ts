import { test, expect } from '@playwright/test'
import testAxe from '../helpers/accessibility'
import PublicPage from '../helpers/public-page'

test.describe('Forgotten password page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/forgotten-password')
    })

    test('is accessible', async ({ page }) => {
        await testAxe(page, 'Login')()
    })

    test('has layout elements', async ({ page }) => {    
        const publicPage = PublicPage(page)
        await publicPage.hasElements('Forgotten Password')
    })

    test('has one header', async ({ page }) => {
        const h1 = page.getByRole('heading', { level: 1 })
        await expect(h1).toHaveCount(1)
        await expect(h1).toContainText('Forgotten Password')
    })

    test('has a prompt', async ({ page }) => {
        await expect(page.getByText('Please enter your e-mail and we\'ll send you a link to reset your password.')).toBeVisible()
    })

    test('has a form', async ({ page }) => {
        await expect(page.getByRole('form', { name: 'Password reset request form' })).toHaveCount(1)
    })

    test('has an input field for e-mail', async ({ page }) => {
        const email = page.getByLabel('E-mail')

        await expect(email).toBeVisible()
        await expect(email).toHaveCount(1)
        await expect(email).toHaveAttribute('type', 'email')
        await expect(email).toHaveAttribute('required')
        await expect(email).toHaveAttribute('aria-required', 'true')
        await expect(email).toHaveAttribute('aria-invalid', 'false')
        await expect(email).toHaveAttribute('autoComplete', 'email')
    })

    test('has a submit button', async ({ page }) => {
        const submit = page.getByRole('button', { name: 'Send link to e-mail' })

        await expect(submit).toBeVisible()
        await expect(submit).toHaveCount(1)
        await expect(submit).toHaveAttribute('type', 'submit')
    })

    test('has a link to the login page', async ({ page }) => {
        const link = page.getByRole('link', { name: 'Back to Sign in' })

        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', '/login')
    })

    test('has a link to request access to dashboard', async ({ page }) => {
        const link = page.getByRole('link', { name: 'Send request' })

        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', '/request-access')
    })

    test.describe('form validation', () => {
        test('accepts valid input', async ({ page }) => {

            const requestPromise = page.waitForRequest('/api/password-reset')

            await page.getByLabel('E-mail').fill('email@example.com')
            await page.getByRole('button', { name: 'Send link to e-mail' }).click()
            
            await expect(page).toHaveURL('/api/password-reset')
            const request = await requestPromise
            expect(request.postData()).toEqual('email=email%40example.com')
        })

        test('the e-mail field is required', async ({ page }) => {
            await page.getByRole('button', { name: 'Send link to e-mail' }).click()

            await expect(page).toHaveURL('/forgotten-password')
            await expect(page.getByLabel('E-mail').and(page.locator(':invalid'))).toBeVisible()
        })

        test('the e-mail field has to be an e-mail address', async ({ page }) => {
            await page.getByLabel('E-mail').fill('notanemailaddress')
            await page.getByRole('button', { name: 'Send link to e-mail' }).click()

            await expect(page).toHaveURL('/forgotten-password')
            await expect(page.getByLabel('E-mail').and(page.locator(':invalid'))).toBeVisible()
        })    
    })
    
})