const Hobbit = require('./hobbits-model')
const db = require('../../data/dbConfig')

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

describe('Hobbit model', () => {
  it('works', () => {
    expect(true).toBe(true)
  })
  describe('getAll', () => {
    let hobbits
    beforeEach(async () => {
      hobbits = await Hobbit.getAll()
    })
    it('can retrieve all hobbits', async () => {
      expect(hobbits).toHaveLength(4)
    })
    it('retrieves hobbits with { id, name }', async () => {
      expect(hobbits[0]).toMatchObject({ id: 1, name: 'sam' })
      expect(hobbits[1]).toMatchObject({ id: 2, name: 'frodo' })
    })
  })

  describe('getById', () => {
    it('can get hobbit object { id, name } by its id', async () => {
      const sam = await Hobbit.getById(1)
      expect(sam).toMatchObject({ id: 1, name: 'sam' })
    })
  })

  describe('insert', () => {
    it('can insert a hobbit into the db', async () => {
      // declare a var holding a new hobbit
      const bilbo = { name: 'bilbo' }
      // use Hobbit.insert to put it in db
      await Hobbit.insert(bilbo)
      // use db to grab the inserted hobbits
      // assert that it exists and has certain
      expect(await db('hobbits')).toHaveLength(5)
      const bilbo2 = await db('hobbits')
        .where({ id: 5 }).first()
      expect(bilbo2).toMatchObject({ id: 5, name: 'bilbo' })
    })
    it('resolves the newly inserted hobbit', async () => {
      // here we are not _really_ testing that the db changed
      const bilbo = { name: 'bilbo' }
      const result = await Hobbit.insert(bilbo)
      expect(result).toMatchObject({ id: 5, name: 'bilbo' })
    })
  })

  describe('update', () => {

  })

  describe('remove', () => {

  })
})
