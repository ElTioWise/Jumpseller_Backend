const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const api = require('axios');

app.listen(PORT, ()=> console.log(`Servidor corriendo en el puerto ${PORT}`));

app.use(bodyParser.json());

// Route
app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});
let productsId = []
let products = []

app.post('/api/v1', (req, res) => {
    const customerEmail = req.body.order.customer.email
    products = req.body.order.products
    const preguntar = async () =>{
            products.forEach(e => {
            console.log(`${e.name} tiene el id ${e.id}`)
            obtenerCategorías(e.id)
        })
    }
    preguntar()
    setTimeout(() => {
        getValueForId(productsId[0],req.body.order.products)
        products.forEach(delayLoop(createPromotion,1))
      }, "1000")
    res.send(`funciona`);
});
const login = '59c8deed7a6436f0509b31e98cedd508'
const token = '4515c208fa02f6460a5b775f30519731'
const urlProducts = 'https://api.jumpseller.com/v1/products/'
const urlPromotions = 'https://api.jumpseller.com/v1/promotions.json'
function getValueForId(i,o){
    products.forEach(e => {
        return e.id === productsId[0]
    })
}
const delayLoop = (fn, delay) => {
    return (e, i) => {
        setTimeout(() => {
            createPromotion(e)
        }, i * 1000);
    }
}
function createPromotion (e) {
    let date= new Date();
    let dateNr = (Date.parse(date));
    let dateFinal = Math.floor(dateNr/1000);
    createGiftcard(e,dateFinal)
}
async function obtenerCategorías (e) {
    await api
        .get(`${urlProducts}${e}.json?login=${login}&authtoken=${token}`)
        .then( res => {
      // handle success
    const data = res.data.product.categories
    const productName = res.data.product.name
    const idProduct = res.data.product.id
    data.forEach(f => {
        if(f.id == 1439748){
            console.log(`el producto ${productName} si cuenta con la categoría de Giftcard`)
            productsId.push(idProduct)
            return
        }
        else{
            console.log(`el producto ${productName} no cuenta con la categoría de Giftcard`)
        }
        });
    })
    .catch(function (error) {
        console.log(error)
    })
}
function createGiftcard (data,data2) {
    console.log(data)
    console.log(data2)
    const estructura = {
        "promotion": {
            "name": "TestNuevo",
            "enabled": true,
            "discount_target": "order",
            "buys_at_least": "price",
            "condition_price": 0,
            "condition_qty": 0,
            "quantity_x": 0,
            "type": "fix",
            "discount_amount_fix": 10000,
            "discount_amount_percent": 0,
            "lasts": "none",
            "begins_at": "string",
            "expires_at": "string",
            "max_times_used": 1,
            "cumulative": false,
            "customers": "string",
            "categories": [
                {
                    "id": 0
                }
            ],
            "customer_categories": [
                {
                    "id": 0
                }
            ],
            "products": [
                {
                    "id": 0
                }
            ],
            "products_x": [
                {
                    "id": 0
                }
            ],
            "coupons": [
                {
                    "code": `${data2}`,
                    "usage_limit": 1
                }
            ],
            "countries": [
                "string"
            ],
            "regions": [
                "string"
            ],
            "municipalities": [
                "string"
            ]
        }
    }
    api
        .post(`${urlPromotions}?login=${login}&authtoken=${token}`,estructura)
        .then(res =>{
            console.log("funcionó")
            console.log(res.data)
        })
        .catch(err => {
            if(err.response.status == 400){
                console.log("Numero repetido")
            }
        })
}