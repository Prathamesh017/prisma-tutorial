import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.get('/', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany()
    res.status(200).json({ status: 'success', Users: allUsers })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 'failure', message: error?.message })
  }
})

app.post('/', async (req, res) => {
  try {
    const { firstname, lastname, age } = req.body
    if (!(firstname && lastname && age)) {
      res.status(400).json({ status: 'failure', message: 'Send All Data' })
    }
    const new_user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        age,
      },
    })
    if (new_user) {
      res.status(200).json({ status: 'success', user: new_user })
    }
  } catch (error) {
    res.status(400).json({ status: 'failure', message: error?.message })
  }
})
app.put('/:id', async (req, res) => {
  try {
    const { firstname, lastname, age } = req.body
    const id = req.params.id
    if (!id) {
      res.status(400).json({ status: 'failure', message: 'Please Send Id' })
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstname,
        lastname,
        age,
      },
    })
    if (updatedUser) {
      res.status(200).json({ status: 'success', user: updatedUser })
    }
  } catch (error) {
    res.status(400).json({ status: 'failure', message: error?.message })
  }
})
app.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      res.status(400).json({ status: 'failure', message: 'Please Send Id' })
    }
    await prisma.user.delete({
      where: {
        id: id,
      },
    })

    res.status(200).json({ status: 'success', message: 'User Deleted' })
  } catch (error) {
    res.status(400).json({ status: 'failure', message: error?.message })
  }
})

app.post('/house', async (req, res) => {
  try {
    const { city, ownerId } = req.body
    if (!(city, ownerId)) {
      res.status(400).json({ status: 'failure', message: 'Send All Data' })
    }
    const new_house = await prisma.house.create({
      data: {
        city,
        ownerId,
      },
    })
    if (new_house) {
      res.status(200).json({ status: 'success', user: new_house })
    }
  } catch (error) {
    res.status(400).json({ status: 'failure', message: error?.message })
  }
})

app.get('/house', async (req, res) => {
  try {
    const allhouses = await prisma.house.findMany({ include: { owner: true } })
    res.status(200).json({ status: 'success', Users: allhouses })
  } catch (error) {
    console.log(error)
    res.status(400).json({ status: 'failure', message: error?.message })
  }
})
app.listen(3001, () => {
  console.log('Hello World')
})
