import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Unicode route rendering', () => {
  test('should render non-latin route correctly', async ({ page, baseURL }) => {
    await page.goto('/대한민국')

    await expect(page.locator('body')).toContainText('Hello "/대한민국"!')

    expect(page.url()).toBe(`${baseURL}/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD`)
  })

  test('should handle Link href generation correctly for special characters', async ({ page, baseURL }) => {
    await page.goto('/')
    
    // Check that the Link href is properly generated
    const linkHref = await page.getAttribute('[data-testid="korean-link"]', 'href')
    expect(linkHref).toBe('/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD')
    
    // Click the link and verify URL
    await page.click('[data-testid="korean-link"]')
    expect(page.url()).toBe(`${baseURL}/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD`)
  })

  test('should handle Link component navigation to 대한민국 route without SSR errors', async ({ page, baseURL }) => {
    // Start at home page
    await page.goto('/')
    await expect(page.locator('h3')).toContainText('Welcome Home!!!')
    
    // Click the Link component to navigate to Korean route
    await page.click('[data-testid="korean-link"]')
    
    // Verify navigation worked
    await expect(page.locator('body')).toContainText('Hello "/대한민국"!')
    expect(page.url()).toBe(`${baseURL}/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD`)
    
    // Reload the page - this is where the SSR error typically occurs with Link-based navigation
    await page.reload()
    
    // Verify the page still renders correctly after reload
    await expect(page.locator('body')).toContainText('Hello "/대한민국"!')
    expect(page.url()).toBe(`${baseURL}/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD`)
  })
})