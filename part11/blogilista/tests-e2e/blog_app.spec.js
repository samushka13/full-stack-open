import { describe, beforeEach, test, expect } from '@playwright/test'
import { loginWith, addBlog, addAnotherBlog } from './helper'

const TEST_USER = {
  username: 'playwright-test-username',
  password: 'playwrighttestpassword',
  name: 'Playwright Test User'
}

const TEST_USER_2 = {
  username: 'playwright-test-username-2',
  password: 'playwrighttestpassword2',
  name: 'Playwright Test User 2'
}

const LOGIN_BUTTON_TEXT = 'Login'

describe('The Bloglist App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', { data: TEST_USER })
    await request.post('/api/users', { data: TEST_USER_2 })
    await page.goto('/')
  })

  test('front page can be shown', async ({ page }) => {
    const locator = page.getByText('Welcome', { exact: false })
    await expect(locator).toBeVisible()
  })

  test('login form can be shown', async ({ page }) => {
    await page.getByRole('button', { name: LOGIN_BUTTON_TEXT }).click()
    await expect(page.getByLabel('Username:')).toBeVisible()
    await expect(page.getByLabel('Password:')).toBeVisible()
    await expect(page.getByRole('button', { name: LOGIN_BUTTON_TEXT })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, TEST_USER.username, TEST_USER.password)
      await expect(page.getByRole('heading', { name: TEST_USER.name })).toBeVisible()
    })

    test('fails with wrong username', async ({ page }) => {
      await loginWith(page, 'wrong-username', TEST_USER.password)
      await expect(page.getByRole('heading', { name: TEST_USER.name })).not.toBeVisible()
    })

    test('fails with wrong password', async ({ page }) => {
      await loginWith(page, TEST_USER.username, 'wrongpassword')
      await expect(page.getByRole('heading', { name: TEST_USER.name })).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, TEST_USER.username, TEST_USER.password)
    })

    describe('a blog can', () => {
      beforeEach(async ({ page }) => {
        await addBlog(page, 'test title', 'test author', 'test url')
      })

      test('be created', async ({ page }) => {
        await expect(page.getByText('"test title" added!')).toBeVisible()
      })

      test('be added to visible blogs', async ({ page }) => {
        await expect(page.getByText('test title by test author')).toBeVisible()
      })

      test('be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes: 1', { exact: false })).toBeVisible()
      })

      test('be deleted by its adder', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        page.on('dialog', async (dialog) => await dialog.accept())
        await page.getByRole('button', { name: 'Delete' }).click()
        await expect(page.getByText('test title by test author')).not.toBeVisible()
      })
    })

    test('logout succeeds', async ({ page }) => {
      await page.getByRole('button', { name: 'Logout' }).click()
      await expect(page.getByRole('heading', { name: TEST_USER.name })).not.toBeVisible()
    })

    test('a blog can not be deleted by another user', async ({ page }) => {
      await addBlog(page, 'test title', 'test author', 'test url')
      await page.getByRole('button', { name: 'Logout' }).click()
      await loginWith(page, TEST_USER_2.username, TEST_USER_2.password)
      await page.getByRole('button', { name: 'View' }).click()
      await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
    })

    test('blogs are sorted based on likes in descending order', async ({ page }) => {
      await addBlog(page, 'test title 1', 'test author', 'test url 1')
      await addAnotherBlog(page, 'test title 2', 'test author', 'test url 2')
      await addAnotherBlog(page, 'test title 3', 'test author', 'test url 3')

      let items = await page.getByRole('button', { name: 'View' }).all()

      await items[1].click()
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByText('"test title 2" liked!').waitFor()
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByText('"test title 2" liked!').waitFor()
      await page.getByRole('button', { name: 'Hide' }).click()

      await items[2].click()
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByText('"test title 3" liked!').waitFor()
      await page.getByRole('button', { name: 'Hide' }).click()

      items = await page.getByText('by test author', { exact: false }).all()

      await expect(items[0]).toContainText('test title 2')
      await expect(items[1]).toContainText('test title 3')
      await expect(items[2]).toContainText('test title 1')
    })
  })
})
