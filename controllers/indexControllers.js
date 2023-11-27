const connection = require('../config/db');
const bcrypt = require('bcrypt');

class IndexControllers {
  viewHome = (req, res) => {
    let sql = "SELECT * FROM restaurant WHERE restaurant_isdeleted = 0"
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render('index', {result});
    })
  }
  viewOneRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT restaurant.*, dish.* from restaurant 
    left join dish on restaurant.restaurant_id = dish.restaurant_id and dish.dish_isdeleted = 0
    WHERE restaurant.restaurant_isdeleted = 0 AND restaurant.restaurant_id = ${id}`;
    connection.query(sql, (err, result) => {
      if(err) throw (err);
      console.log(result);
      //limpiar respuesta
      let finalResult = {};
      let dishes = [];
      let dish = {};

      result.forEach(elem => {
        if(elem.dish_id){ //es igual que añadirle !=null pero es redundante
          dish = {
            dish_id: elem.dish_id,
            title: elem.title,
            image: elem.image,
            dish_description: elem.dish_description,

          }
          dishes.push(dish);
        }
      })
      finalResult= {
        restaurant_id: id, //este id viene de params
        name: result[0].name,
        picture: result[0].picture,
        restaurant_description: result[0].restaurant_description,
        style: result[0].style,
        phone_number: result[0].phone_number,
        email: result[0].email,
        dishes: dishes
      }
      res.render("oneRestaurant", {finalResult});
    })

  }

  viewRegister = (req, res) => {
    res.render('registerForm');
  }

  register = (req, res) => {
    const {name, style, restaurant_description, phone_number, email, password} = req.body;
    if (
      name === "" ||
      style === "" ||
      restaurant_description === "" ||
      phone_number === "" ||
      email === "" ||
      password === "" 
    ){
        return res.render("registerForm", {message: "No olvides rellenar todos los campos"})
     }

    bcrypt.hash(password, 10, function(err, hash){
      if(err) throw err;

      let sql = `INSERT INTO restaurant (name, style, restaurant_description, phone_number, email, password, picture) VALUES ("${name}","${style}", "${restaurant_description}", "${phone_number}", "${email}", "${hash}", "nopicture.jpg")`;

      if(req.file != undefined){
        let img = req.file.filename;
        sql = `INSERT INTO restaurant (name, style, restaurant_description, phone_number, email, password, picture) VALUES ("${name}","${style}", "${restaurant_description}", "${phone_number}", "${email}","${hash}", "${img}")`;
      }

      connection.query(sql, (err, result) => {
        if(err){
          if(err.errno == 1062){
            return res.render("registerForm", {message:"El email ya existe en la aplicación"})
          }
          else{
            throw err;
          }
        } 
          res.redirect("/");
      })
    })
  }

  showEditRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} and restaurant_isdeleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render('editRestaurantForm', {result});
    })
  }

  editRestaurant = (req, res) => {
    let id = req.params.id;
    const {name, style, restaurant_description, phone_number, email, password} = req.body;

    let sql = `UPDATE restaurant SET name = "${name}", style = "${style}", restaurant_description = "${restaurant_description}", phone_number = "${phone_number}", email = "${email}", password = "${password}" WHERE restaurant_id = ${id}`;

    if(req.file != undefined){
      let img = req.file.filename;
      sql = `UPDATE restaurant SET name = "${name}", style = "${style}", restaurant_description = "${restaurant_description}", phone_number = "${phone_number}", picture = "${img}", email = "${email}", password = "${password}" WHERE restaurant_id = ${id}`;
    }

    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.redirect(`/oneRestaurant/${id}`)
    })
  }

  notDelete = (req, res) => {
    let id = req.params.id;
    let sql = `UPDATE restaurant LEFT JOIN dish ON restaurant.restaurant_id = dish.restaurant_id SET restaurant.restaurant_isdeleted = 1, dish_isdeleted = 1 WHERE restaurant.restaurant_id = ${id}`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect('/');
    })
  }

  viewAbout = (req, res) => {
    res.render('aboutUs');
  }

  viewLogin = (req, res) => {
    res.render('login');
  }
  login = (req, res) => {
    const {email, password} = req.body;

        let sql = `SELECT * FROM restaurant WHERE email = "${email}"`

        connection.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);

            if(result.length == 1){
                let hash = result[0].password;
                bcrypt.compare(password, hash, (err, resultCompare)=>{
                    if(err) throw err;

                    if(resultCompare){
                        res.redirect(`/oneRestaurant/${result[0].restaurant_id}`)
                    }else{
                        res.render("login",{message:"Contraseña incorrecta"})
                    }
                })  
            }else{
                return res.render("login", {message: "Email no existe"})
            }
        })
  }
  

}

module.exports = new IndexControllers;