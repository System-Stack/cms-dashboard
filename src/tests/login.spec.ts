import { test, expect } from '@playwright/test'
import testAxe from './helpers/accessibility'
import PublicPage from './helpers/public-page'

test.describe('Login page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login')
    })

    test('is accessible', async ({ page }) => {
        await testAxe(page, 'Login')()
    })

    test('has layout elements', async ({ page }) => {    
        const publicPage = PublicPage(page)
        await publicPage.hasElements('Sign in')
    })

    test('has page elements', async ({ page }) => {
        // one header
        const h1 = page.getByRole('heading', { level: 1 })
        await expect(h1).toHaveCount(1)
        await expect(h1).toContainText('Welcome to X')

        // a prompt
        await expect(page.getByText('Please enter your credentials to log in')).toBeVisible()

        // a form
        await expect(page.getByRole('form', { name: 'Login form' })).toHaveCount(1)

        // e-mail input field
        const email = page.getByLabel('E-mail')

        await expect(email).toBeVisible()
        await expect(email).toHaveCount(1)
        await expect(email).toHaveAttribute('type', 'email')
        await expect(email).toHaveAttribute('required')
        await expect(email).toHaveAttribute('aria-required', 'true')
        await expect(email).toHaveAttribute('aria-invalid', 'false')
        await expect(email).toHaveAttribute('autoComplete', 'email')

        // password input field
        const password = page.getByLabel('Password')

        await expect(password).toBeVisible()
        await expect(password).toHaveCount(1)
        await expect(password).toHaveAttribute('type', 'password')
        await expect(password).toHaveAttribute('required')
        await expect(password).toHaveAttribute('aria-required', 'true')
        await expect(password).toHaveAttribute('aria-invalid', 'false')
        await expect(password).toHaveAttribute('autoComplete', 'current-password')

        // remember me checkbox
        const remember = page.getByLabel('Remember me')

        await expect(remember).toBeVisible()
        await expect(remember).toHaveCount(1)
        await expect(remember).toHaveAttribute('type', 'checkbox')
        await expect(remember).not.toHaveAttribute('required')
        await expect(remember).toHaveAttribute('aria-required', 'false')
        await expect(remember).toHaveAttribute('aria-invalid', 'false')

        // submit button
        const submit = page.getByRole('button', { name: 'Sign in' })

        await expect(submit).toBeVisible()
        await expect(submit).toHaveCount(1)
        await expect(submit).toHaveAttribute('type', 'submit')

        // link to forgotten password page
        const link = page.getByRole('link', { name: 'Forgot password?' })

        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', '/forgotten-password')

        // link to request access page
        const requestLink = page.getByRole('link', { name: 'Send request' })

        await expect(requestLink).toBeVisible()
        await expect(requestLink).toHaveAttribute('href', '/request-access')
    })

    test.describe('form validation', () => {
        test('accepts valid input', async ({ page }) => {

            const requestPromise = page.waitForRequest('/api/login')

            await page.getByLabel('E-mail').fill('email@example.com')
            await page.getByLabel('Password').fill('pAssw0rd')
            await page.getByRole('button', { name: 'Sign in' }).click()
            
            await expect(page).toHaveURL('/api/login')
            const request = await requestPromise
            expect(request.postData()).toEqual('email=email%40example.com&password=pAssw0rd')
        })

        test('the e-mail field is required', async ({ page }) => {
            await page.getByRole('button', { name: 'Sign in' }).click()

            await expect(page).toHaveURL('/login')
            await expect(page.getByLabel('E-mail').and(page.locator(':invalid'))).toBeVisible()
        })

        test('the e-mail field has to be an e-mail address', async ({ page }) => {
            await page.getByLabel('E-mail').fill('notanemailaddress')
            await page.getByRole('button', { name: 'Sign in' }).click()

            await expect(page).toHaveURL('/login')
            await expect(page.getByLabel('E-mail').and(page.locator(':invalid'))).toBeVisible()
        })

        test('the password field is required', async ({ page }) => {
            await page.getByRole('button', { name: 'Sign in' }).click()

            await expect(page).toHaveURL('/login')
            await expect(page.getByLabel('Password').and(page.locator(':invalid'))).toBeVisible()
        })        
    })
    
})