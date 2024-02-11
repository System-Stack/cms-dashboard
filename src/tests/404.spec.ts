import { test, expect } from '@playwright/test'
import testAxe from './helpers/accessibility'
import PublicPage from './helpers/public-page'

test.describe('404 page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/notexistingurl')
    })

    test('is accessible', async ({ page }) => {
        await testAxe(page, '404')()
    })

    test('has layout elements', async ({ page }) => {    
        const publicPage = PublicPage(page)
        await publicPage.hasElements('Page Not Found')
    })

    test('has page elements', async ({ page }) => {
        // one header
        const h1 = page.getByRole('heading', { level: 1 })
        await expect(h1).toHaveCount(1)
        await expect(h1).toContainText('404 | Page not found')

        // a prompt
        await expect(page.getByText('The page you are looking for cannot be found')).toBeVisible()

        // link to login page
        const link = page.getByRole('link', { name: 'Go Sign in' })

        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', '/login')

        // link to request access page
        const requestLink = page.getByRole('link', { name: 'Send request' })

        await expect(requestLink).toBeVisible()
        await expect(requestLink).toHaveAttribute('href', '/request-access')
    })
    
})