import { test, expect } from '@playwright/test'
import testAxe from '../helpers/accessibility'
import PublicPage from '../helpers/public-page'

test.describe('Password reset page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/forgotten-password/password-reset')
    })

    test('is accessible', async ({ page }) => {
        await testAxe(page, 'Login')()
    })

    test('has layout elements', async ({ page }) => {    
        const publicPage = PublicPage(page)
        await publicPage.hasElements('Forgotten Password : Password reset')
    })

    test('has one header', async ({ page }) => {
        const h1 = page.getByRole('heading', { level: 1 })
        await expect(h1).toHaveCount(1)
        await expect(h1).toContainText('Password reset')
    })

    test('has a link to the login page', async ({ page }) => {
        const link = page.getByRole('link', { name: 'You can log in now' })

        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', '/login')
    })
    
})