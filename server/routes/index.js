const Home = require('./home.js')
module.exports = app => {
	app.get('/', (req, res) => {
    res.redirect('/items')
  })
  app.get('/items', Home.getItems);
  app.get('/item/:orderId/:item', Home.addItem)
  app.post('/item/:orderId', Home.postItem)
  app.get('/deleteItem/:id', Home.removeItem);
  app.get('/updateState/:id/:newOrderId/:state', Home.updateState)
  // app.get('/updateItem/:orderId/:state/:item', Home.updateItem)
  app.post('/updateItem/:id/:state', Home.updateItem)

}