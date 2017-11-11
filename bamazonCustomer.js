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



function promptCustomer(){
    connection.query(
        "SELECT id, product_name, price FROM products",
    
        function (err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("Product id: " + res[i].id);
                console.log("Item: " + res[i].product_name);
                console.log("Price: $" + res[i].price);
                console.log("---------")            
            } 
        }
    );   

    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter the id# of the product you would like to order:"
        },
    
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to order?:"
        },
    ]).then(function (answer){
        // console.log(answer.id:);
        // console.log(answer.quantity); 

        placeOrder(answer)                        
    })     
}

function placeOrder(answer){
    var query = "SELECT product_name, price, stock_quantity, product_sales FROM products WHERE ?";
    connection.query(query, {id: answer.id}, function(err, res){
        //console.log(res[0].stock_quantity);
        //console.log("You selected: " + res[0].product_name + "@" + res[0].price + " per unit")
        
        console.log("Order Summary")
        console.log(answer.quantity + " x " + res[0].product_name + "(s)");        
        console.log("Price per unit: $" + res[0].price);
        console.log("Total Cost: $" + (res[0].price * answer.quantity));
        console.log("Order Successful!");
        orderSuccessful = true;
        var orderTotal = res[0].price * answer.quantity;
        if (answer.quantity < res[0].stock_quantity){
            connection.query("update products SET ? WHERE ?",
            [
                {
                stock_quantity: (res[0].stock_quantity - answer.quantity),
                product_sales: (res[0].product_sales + orderTotal)
                },
                {
                    id: answer.id
                }
            ])
            
            
        }
        else{
            console.log("Order Attempt Failed!")
            console.log(answer.quantity + " x " + res[0].product_name + "(s)");        
            console.log("Price per unit: $" + res[0].price);
            console.log("Total Cost: $" + (res[0].price * answer.quantity));
            console.log("Sorry, your order cannot be completed!")
            console.log("Reason: Quantity limit");
        }
        
    })
}

promptCustomer();



