const express = require('express')
const app = express()
const port = 3000
const User = require('./models/user')
const { Op } = require('sequelize')
const moment = require('moment')

app.post('/post', async (req, res) => {
  const user = await User.create({
    firstName: 'Ribeiro',
    lastName: 'Ribeiro',
    email: 'Ribeiro@gmail.com',
  })
  res.json(user)
})

app.get('/get', async (req, res) => {
  const page = 1
  const perPage = 5
  // const where = { firstName: { [Op.like]: `%a%` }}
  console.log(moment('2023-12-15'))
  const initialDateFormatted = moment('2023-12-14').format('YYYY-MM-DDT14:38:18')
  const finalDateFormatted = moment('2023-12-14').add(1, 'day').format('YYYY-MM-DDT13:34:34')
  const where = { 
    createdAt: {
      [Op.between]: [initialDateFormatted, finalDateFormatted]
    }
  }
  const paginateResult = await User.paginate({
    page,
    paginate: perPage,
    order: [['createdAt', 'ASC']],
    where
  })
  console.log(paginateResult.docs)
  res.json({
    count: paginateResult.docs.length,
    // timesQueried: number,
    limit: Number(perPage),
    lastKey: Number(paginateResult.pages) > Number(page) ? Number(page) + 1 : undefined,
    data: paginateResult.docs})
  // res.json({
  //   page: Number(page), // pagina acessada no momento - lastKey
  //   perPage: Number(perPage), // quantidade de objetos por pagina - limit
  //   total: total, // quantidade de itens no total juntando todas as paginas - nao precisa
  //   totalPages: pages, // quantidade total de paginas retornadas
  //   data: docs // objetos retornado pela paginação}) - dados
  // })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})