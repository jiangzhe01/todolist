const db = require("../models/db.js");
module.exports = {
  getItems: (req, res) => {
    const query = 'select * from items order by orderId asc'
    const data = null;
    db.handleBase(query, data, (result)=> {
      var doingItems = [];
      var doneItems = []
      result.forEach(item=> {
        if(item.state == 0) {
          doingItems.push(item)
        } else {
          doneItems.push(item)
        }
      })
      var doingNum = doingItems.length;
      var doneNum = doneItems.length;
      // res.render('index', {
      //   title: "TODOList",
      //   doingItems: doingItems,
      //   doneItems: doneItems,
      //   doingNum: doingNum,
      //   doneNum: doneNum
      // })
      res.json({doingItems, doneItems, doingNum, doneNum})
    })
    
  },
  removeItem: (req, res) => {
    console.log("删除操作")
    const id = req.params.id;
    const query = 'delete from items where id=?';
    const data = [id];
    db.handleBase(query, data, (result)=> {

      res.redirect('/')
    })
  },
  updateState: (req, res) => {
    // var orderId;
    // if(req.params.orderId.includes('doing')) {
    //   orderId = 'done'+ (parseInt(req.params.newOrderId.match(/\d/))+1);
    // }else {
    //   orderId = 'doing'+ (parseInt(req.params.newOrderId.match(/\d/))+1);
    // }
    // // const orderId = req.params.orderId;
    // const id = req.params.id;
    // const state = req.params.state == 0 ? 1 : 0
    // const query = 'update items set state=?, orderId=? where id='+id;
    // const data = [state, orderId];
    // db.handleBase(query, data, (result)=> {
    //   res.redirect('/')
    // })
    const id = req.params.id
    var newOrderId;
    if(req.params.newOrderId.includes('doing')) {
      newOrderId = 'doing'+ (parseInt(req.params.newOrderId.match(/\d/))+1);
    } else {
      newOrderId = 'done'+ (parseInt(req.params.newOrderId.match(/\d/))+1);
    }
    const newQuery = 'update items set state=?, orderId=? where id='+id;
    const state = req.params.state >= 1 ? 0: 1;
    const newData = [state, newOrderId];
    db.handleBase(newQuery, newData, (result) => {
      res.redirect('/')
    })

  },
  updateItem: (req, res) => {
    const id = req.params.id;
    const content = req.body.content;
    console.log(content)
    const query = 'update items set content=? where id = ?';
    const data = [content, id];
    db.handleBase(query, data, (result)=> {
      if(result.affectedRows == 1) {
        res.redirect('/')
      }
    })
  },
  addItem: (req, res) => {
    let content = req.params.item;
    let orderId = req.params.orderId;
    let sql = "insert into items set orderId=?, content = ?, state=0";
    var data = [orderId, content];
    db.handleBase(sql, data, (result) => {
       if(result.affectedRows == 1) {
          res.redirect('/')
       }
    })
  },
  postItem: (req, res) => {
    let content = req.body.content;
    let orderId = req.params.orderId;
    let sql = "insert into items set orderId=?, content = ?, state=0";
    var data = [orderId, content];
    db.handleBase(sql, data, (result) => {
       if(result.affectedRows == 1) {
          res.redirect('/')
       }
    })
  }
}