import { expect, type Page } from '@playwright/test'
import config from '../../data/config.json' assert { type: "json" }

const PublicPage = (page: Page) => {

    const hasElements = async (title: string) => {
        await expect(page).toHaveTitle(`${ title } :: ${ config.title }`)

        const h1 = page.getByRole('heading', { level: 2 })
        await expect(h1).toHaveCount(1)
        await expect(h1).toContainText(config.public.heading)
        
        await expect(page.getByText(config.public.text)).toBeVisible()
    }

    return { hasElements }
}

export default PublicPage