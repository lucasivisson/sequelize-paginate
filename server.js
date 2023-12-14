const express = require('express')
const app = express()
const port = 3000
const User = require('./models/user')
const { Op } = require('sequelize')

app.post('/post', async (req, res) => {
  const user = await User.create({
    firstName: 'Lais',
    lastName: 'Lais',
    email: 'Lais@gmail.com',
  })
  res.json(user)
})

app.get('/get', async (req, res) => {
  const page = 1
  const perPage = 5
  const where = { firstName: { [Op.like]: `%i%` }}
  const { docs, pages, total } = await User.paginate({
    page,
    paginate: perPage,
    order: [['createdAt', 'DESC']],
    where
  })
  res.json({
    page: Number(page), // pagina acessada no momento
    perPage: Number(perPage), // quantidade de objetos por pagina 
    total: total, // quantidade de itens no total juntando todas as paginas
    totalPages: pages, // quantidade total de paginas retornadas
    data: docs // objetos retornado pela paginação})
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})