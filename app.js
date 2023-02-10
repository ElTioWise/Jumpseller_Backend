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

app.post('/api/v1', (req, res) => {
    const customerEmail = req.body.order.customer.email
    const products = req.body.order.products
    const preguntar = async () =>{
        await products.forEach(e => {
            console.log(`${e.name} tiene el id ${e.id}`)
            obtenerCategorías(e.id)
        })
    }
    preguntar()
    console.log(productsId);
    res.send(`funciona`);
});

async function obtenerCategorías (e) {
    await api
        .get(`https://api.jumpseller.com/v1/products/${e}.json?login=59c8deed7a6436f0509b31e98cedd508&authtoken=4515c208fa02f6460a5b775f30519731`)
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
// let webhook = req.body.order.subtotal
// webhook = webhook / 100 * 5
// console.log(webhook)
// res.send(`Se creó un cupón de ${webhook} por su compra de ${req.body.order.subtotal},asignada al correo ${req.body.order.customer.email} ,Gracias por usar nuestro sistema de puntos :)`);