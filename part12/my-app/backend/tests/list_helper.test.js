const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes returns 36', () => {
  const result = listHelper.totalLikes(helper.TEST_BLOGS)
  assert.strictEqual(result, 36)
})

describe('favoriteBlog returns TEST_BLOGS[2]', () => {
  const result = listHelper.favoriteBlog(helper.TEST_BLOGS)
  assert.deepStrictEqual(result, helper.TEST_BLOGS[2])
})

describe('mostBlogs returns Robert C. Martin, 3', () => {
  const result = listHelper.mostBlogs(helper.TEST_BLOGS)
  assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
})

describe('mostLikes returns Edsger W. Dijkstra, 17', () => {
  const result = listHelper.mostLikes(helper.TEST_BLOGS)
  assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
})
