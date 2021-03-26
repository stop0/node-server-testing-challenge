const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('hobbits').truncate()
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('process.env.DB_ENV must be "testing"', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

describe('hobbits endpoints', () => {
  describe('[GET] /hobbits', () => {
    it('returns all the hobbits', async () => {
      const res = await request(server).get('/hobbits')
      expect(res.body).toHaveLength(4)
    })
    it('responds with a 200 OK', async () => {
      const res = await request(server).get('/hobbits')
      expect(res.status).toBe(200)
    })
  })
  describe('[POST] /hobbits', () => {
    it('responds with the new hobbit', async () => {
      const res = await request(server)
        .post('/hobbits')
        .send({ name: 'bilbo' })
      expect(res.body).toMatchObject({ id: 5, name: 'bilbo' })
    })
  })
})
