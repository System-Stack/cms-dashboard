import { test, expect } from '@playwright/test'
import testAxe from '../helpers/accessibility'
import PublicPage from '../helpers/public-page'

test.describe('E-mail sent page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/forgotten-password/email-sent')
    })

    test('is accessible', async ({ page }) => {
        await testAxe(page, 'Login')()
    })

    test('has layout elements', async ({ page }) => {    
        const publicPage = PublicPage(page)
        await publicPage.hasElements('Forgotten Password : E-mail sent')
    })

    test('has one header', async ({ page }) => {
        const h1 = page.getByRole('heading', { level: 1 })
        await expect(h1).toHaveCount(1)
        await expect(h1).toContainText('E-mail sent')
    })

    test('has a prompt', async ({ page }) => {
        await expect(page.getByText('Check your e-mail application and open the link we sent to continue.')).toBeVisible()
    })
    
})