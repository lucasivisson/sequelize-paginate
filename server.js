const express = require('express')
const app = express()
const port = 3000
const User = require('./models/user')
const DigitalAccountAccounting = require('./models/digitalaccountaccounting')
const { Op } = require('sequelize')
const moment = require('moment')
const Sequelize = require('sequelize');

app.post('/users', async (req, res) => {
  const user = await User.create({
    firstName: 'Marta',
    lastName: 'Marta',
    email: 'Marta@gmail.com',
  })
  res.json(user)
})

app.get('/users', async (req, res) => {
  const page = 1
  const perPage = 5
  // const where = { firstName: { [Op.like]: `%a%` }}
  console.log(moment('2023-12-15'))
  const initialDateFormatted = moment('2023-12-15').format('YYYY-MM-DDT16:10:13')
  const finalDateFormatted = moment('2023-12-15').format('YYYY-MM-DDT16:10:29')
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

app.post('/digital', async (req, res) => {
  const digitalAccountAccounting = await DigitalAccountAccounting.create({
    eventId: '002',
    eventName: 'TevPJ',
    accountCredt: '0000233454-02',
    accountDebt: '0000233452-01',
    amount: '20000',
    type: 'credit'
  })

  res.json(digitalAccountAccounting)
})

app.get('/digital', async (req, res) => {
  const initialDateFormatted = moment('2023-12-18').format('YYYY-MM-DDT03:00:00')
  const finalDateFormatted = moment('2023-12-18').add(1, 'day').format('YYYY-MM-DDT02:59:59')
  // 2023-12-18 16:17:08.487 -0300
  const a = await DigitalAccountAccounting.findAll({
    attributes: [
      'eventId',
      'eventName',
      'accountCredt',
      'accountDebt',
      [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount'],
    ],
    group: ['eventId', 'eventName', 'accountCredt', 'accountDebt'],
    where: {
      createdAt: {
        [Op.between]: [initialDateFormatted, finalDateFormatted]
      }
    }
  })

  res.json(a)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})