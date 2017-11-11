var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "james3",

    // Your password
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
     //console.log("connected as id " + connection.threadId);
});

function promptSupervisor(){
    connection.query(
        "SELECT id, product_name, price FROM products",
    
        function (err, res) {
            for (var i = 0; i < res.length; i++) {
            
            } 
        }
    );   

    inquirer.prompt([
        {
            type: "list",
            name: "supervisor",
            message: "Supervisor View: ",
            choices: ["View Product Sales by Dept", "Create New Dept"]
        }
    ]).then(function(answer){
        console.log(answer.supervisor)
    });
}

promptSupervisor();