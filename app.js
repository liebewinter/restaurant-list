const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  console.log('req query', req.query)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    const filteredRestaurants = restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      restaurant.category.includes(keyword)
    return filteredRestaurants
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:reataurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.reataurant_id)
  res.render('show', { restaurant: restaurant })
})


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})