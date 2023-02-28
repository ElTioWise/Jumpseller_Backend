// Dependencias requeridas
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const api = require('axios');
//valida que no estemos usando las variables de entorno de un ambiente de producción
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
//Puerto en el que está corriendo
app.listen(PORT, ()=> console.log(`Servidor corriendo en el puerto ${PORT}`));
app.use(bodyParser.json());
//Variables globales
const login = process.env.LOGIN;
const token = process.env.TOKEN;
const urlProducts = process.env.URLPRODUCTS
const urlPromotions = process.env.URLPROMOTIONS
let productsId = []
let products = []
let productCreate = []
let Giftcard = []

//Ent-point Ruta Gatilladora
app.post('/api/v1', (req, res) => {
    //Email del comprador de la orden
    // const customerEmail = req.body.order.customer.email

    products = req.body.order.products //asignación de todos los productos a variable global
    products.forEach(e => {
        obtenerCategorías(e.id)
    })
    //Consulta los ids de los productos que cuentan con la categoría de giftcard
    
    setTimeout(() => {
        filterForId()
        productCreate.forEach(delayLoop(createPromotion,2))//delay en segundos
    }, "1000")
    setTimeout(() => {
        res.send(`${Giftcard}`);
    },"5000")
});

//Funciones
//Función de validación de categoría
async function obtenerCategorías (e) {
    await api
        .get(`${urlProducts}${e}.json?login=${login}&authtoken=${token}`)
        .then( res => {
        // handle success
        const data = res.data.product.categories
        // const productName = res.data.product.name
        const idProduct = res.data.product.id
        data.forEach(f => {
            if(f.id == 1439748){
                // console.log(`el producto ${productName} si cuenta con la categoría de Giftcard`)
                productsId.push(idProduct)
                return
            }
            else{
                // console.log(`el producto ${productName} no cuenta con la categoría de Giftcard`)
            }
            });
        })
        .catch(function (error) {
            console.log(error)
        })
}
function filterForId(){
    productCreate = products.filter(f => {
        if(f.id == productsId[0]){
            return f
        }
    })
}
const delayLoop = (e, f) => {
    return (e, f) => {
        setTimeout(() => {
            createPromotion(e)
        }, f * 1000);//tiempo de intervalo para la función
    }
}
function createPromotion (e) {
    let date= new Date();
    let dateNr = (Date.parse(date));
    let dateFinal = Math.floor(dateNr/1000);
    createGiftcard(e,dateFinal)
}
function createGiftcard (data,data2) {
        for (let i = 0; i < data.qty; i++) { 
            const estructuraRep = {
                "promotion": {
                    "name": `Giftcard-${data2}-${i}`,
                    "enabled": true,
                    "discount_target": "order",
                    "buys_at_least": "price",
                    "condition_price": 0,
                    "condition_qty": 0,
                    "quantity_x": 0,
                    "type": "fix",
                    "discount_amount_fix": `${data.price}`,
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
                            "code": `${data2}-${i}`,
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
                .post(`${urlPromotions}?login=${login}&authtoken=${token}`,estructuraRep)
                .then(res =>{
                    console.log("funcionó")
                    Giftcard.push(`${data2}-${i}`)
                })
                .catch(err => {
                    if(err.response.status == 400){
                        console.log("Numero repetido")
                    }
                })
        }
}