//prompt user with menu items [choices array in prompt function]
//switch cases
//view products for sale
//add to inventory
//add new product
var mysql = require('mysql');
var inquirer = require("inquirer");

var orderSuccessful = false;

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
     console.log("connected as id " + connection.threadId);
});

inquirer.prompt([
    {
        type: "list",
        name: "menu",
        message: "Manager View:",
        choices: ["View Products for Sale", "Low Inventory < 50 units",
    "Purchase Inventory", "Add New Product"]
    },
]).then(function (answer){
    // console.log(answer.id);
    // console.log(answer.quantity);
    //placeOrder(answer)
    // console.log(answer.menu)
    if(answer.menu === "View Products for Sale"){
     viewProducts();
    }
    else if (answer.menu === "Low Inventory < 50 units"){
        viewLowInventory();
    }
    else if (answer.menu === "Purchase Inventory"){
        addInventory();
    }
    else if( answer.menu === "Add New Product"){
        newProduct();
    }   

});

function viewProducts(){    
    var query = "SELECT id, product_name, price, stock_quantity FROM products";
    connection.query(query, function(err, res){
        //console.log("here's the data");
        for (var i = 0; i < res.length; i++){
            
            console.log("item_id: " + res[i].id + "|| Item: " + res[i].product_name + "|| Price: $" + res[i].price + "|| #In Stock: " + res[i].stock_quantity + "\n");
        }

    })
};

function viewLowInventory(){
    var query = "SELECT id, product_name, price, stock_quantity FROM products";
    connection.query(query, function(err, res){
        // console.log("here's the data");
        for (var i = 0; i < res.length; i++){
            if(res[i].stock_quantity < 50){
                console.log("Item: " + res[i].product_name + "|| Units Left: " + res[i].stock_quantity)
                // console.log("hello")
            }
        }
    })
}

function addInventory(){
    connection.query("SELECT * FROM products", function(err, res){

        inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Choose 'add more' for Inventory request",
                choices: ["add more", "cancel"]
            },
            {
                type: "input",
                name: "id",
                message: "Enter the product id:"
            },
            {
                type: "input",
                name: "requestAmount",
                message: "How many units would you like to order?:"
            }
        ]).then(function(answer){
            //console.log(answer.action)
            if(answer.action === "add more"){
                //console.log(answer.action)
                var chosenItem;
                for (var i = 0; i < res.length; i++){

                    if(answer.id == res[i].id ){
                        //console.log(res[i].id);

                        parseInt(answer.id)
                        chosenItem = res[i].id;
                        connection.query("update products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: (res[i].stock_quantity + parseInt(answer.requestAmount))
                                },
                                {
                                    id: chosenItem
                                }
                            ]
                        )                        
                        console.log(res[i].product_name);
                        console.log("Purchased: " + answer.requestAmount);
                        console.log("Before: " + res[i].stock_quantity)
                        console.log("After: " + (res[i].stock_quantity + parseInt(answer.requestAmount)));
                        console.log("Purchase Order Complete!")                        
                    }
                }                
            }
        });
    })
}

function newProduct(){
    inquirer.prompt([
        {
           type: "input",
           name: "product_name",
           message: "Enter product name:" 
        },
        {
            type: "input",
            name: "dept_name",
            message: "Enter item category/Department:" 
         },
         {
            type: "input",
            name: "stock_quantity",
            message: "Enter current inventory:" 
         },
         {
            type: "input",
            name: "price",
            message: "Enter cost per unit:" 
         },

    ]).then(function(answer){
        connection.query(
            "INSERT into products SET?",
            {
                product_name: answer.product_name,
                dept_name: answer.dept_name,
                stock_quantity: parseInt(answer.stock_quantity),
                price: parseFloat(answer.price),
            }
        )

        console.log("Product Successfully added!")
    })   
}

