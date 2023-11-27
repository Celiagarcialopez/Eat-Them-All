const connection = require('../config/db');

class DishControllers {
  viewDishes = (req, res) => {
    let sql = "SELECT * FROM dish WHERE dish_isdeleted = 0"
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render('dishes', {result});
    })
  }

  showAddDish = (req, res) => {
    let id = req.params.id;
    res.render('newDishForm', {restaurant_id:id});
  }

  addDish = (req, res) => {
    let id = req.params.id;
    const {title, dish_description} = req.body;
    
    let sql = `INSERT INTO dish (title, dish_description, image, restaurant_id) VALUES ("${title}", "${dish_description}", "nopicture.jpg", ${id})`;

    if(req.file != undefined){
      let img = req.file.filename;
      let sql = `INSERT INTO dish (title, dish_description, image, restaurant_id) VALUES ("${title}", "${dish_description}", "${img}", ${id})`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/oneRestaurant/${id}`);
    })

  }

  showEditDish = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM dish WHERE dish_id = ${id} AND dish_isdeleted = 0`
    
    connection.query(sql, (err, result_dish) =>{
        if(err) throw err;

        res.render("editDishForm", {result_dish})

    })

  }

  editDish = (req, res) => {
    
    let {id, restaurant_id} = req.params;
    const {title, dish_description} = req.body;
    
    let sql = `UPDATE dish SET title = "${title}", dish_description = "${dish_description}" WHERE dish_id = ${id}`;

    if(req.file != undefined){
      let img = req.file.filename;
      let sql = `UPDATE dish SET title = "${title}", dish_description = "${dish_description}", image = "${img}" WHERE dish_id = ${id}`;
    } 

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/oneRestaurant/${restaurant_id}`);
    })
  }   

  deleteDish = (req, res) => {
    let {id, restaurant_id} = req.params;

    let sql = `DELETE FROM dish WHERE dish_id = ${id}`
    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/oneRestaurant/${restaurant_id}`)
    })
  }
}

module.exports = new DishControllers;