import { expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createHtmlReport } from 'axe-html-reporter'

const testAxe = (page: Page, key: string) => {
    return async () => {
        const scan = await new AxeBuilder({ page }).analyze()

        createHtmlReport({
            results: scan,
            options: {
                projectKey: key,
                outputDirPath: 'src/tests/reports',
            },
        })

        expect(scan.violations).toEqual([])
    }
}

export default testAxe