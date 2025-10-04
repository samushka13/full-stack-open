const LOGIN_BUTTON_TEXT = 'Login'

const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: LOGIN_BUTTON_TEXT }).click()
  await page.getByLabel('Username:').fill(username)
  await page.getByLabel('Password:').fill(password)
  await page.getByRole('button', { name: LOGIN_BUTTON_TEXT }).click()
}

const addBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Add blog' }).click()
  await page.getByLabel('Title:').fill(title)
  await page.getByLabel('Author:').fill(author)
  await page.getByLabel('Url:').fill(url)
  await page.getByRole('button', { name: 'Save' }).click()
  await page.getByText(`"${title}" added!`).waitFor()
}

const addAnotherBlog = async (page, title, author, url) => {
  await page.getByLabel('Title:').fill(title)
  await page.getByLabel('Author:').fill(author)
  await page.getByLabel('Url:').fill(url)
  await page.getByRole('button', { name: 'Save' }).click()
  await page.getByText(`"${title}" added!`).waitFor()
}

const likeBlog = async (page, title) => {
  await page.getByRole('button', { name: 'View' }).click()
  await page.getByRole('button', { name: 'Like' }).click()
  await page.getByText(`"${title}" liked!`).waitFor()
}

export { loginWith, addBlog, addAnotherBlog, likeBlog }
