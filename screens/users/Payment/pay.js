const express = require("express");
var path = require('path');
const engines = require("consolidate");
const paypal = require("paypal-rest-sdk");

const app = express();

app.engine("ejs", engines.ejs);
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sb-kg3hf3817895@personal.example.com
//i.EE,A2B

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYD26a6gT3F33HnHwskQFjGjfLhNqsZ564iVfrOMmlgSwjlTnHjgdv4FO-oDIop_arFmTdxLU1NUFYR3',
    'client_secret': 'EEzV1wL7zkO6YxGu5YJ239eHCwKDemmdYgPwHPiicX7gQqoHmcqcC4-0Lhj2LIOZJPYVeNsL9yGrFIKX'
  });


app.get('/',(req, res)=>{
    res.render("goPay");
});

app.get('/paypal',(req,res)=>{
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href)
        }
    });
})

app.get('/success',(req,res)=>{
    //res.send('Success');

    var PayerId = req.query.PayerID;
    var paymentId = req.query.paymentId;

    var execute_payment_json = {
        "payer_id": PayerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    };
    
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render('success');
        }
    });

});
app.get('cancel',(req,res)=>{
    res.render('cancel');
});

app.listen(3000, () => {
    console.log("Server is running");
});