const e = require('express')
const express = require ('express')  
const ProductManager = require ("./app.js")

const server = express()
server.use(express.urlencoded({extended: true}))

const Product = new ProductManager("./data.json")

server.get("/product", async (req,res) =>{
    const {limit: limite = ""} = req.query

    if(!limite) {
        let productos = await Product.getProducts()
        res.send(productos)
    }  
    let productos = await Product.getProducts(limite)
    res.send(productos)
})

server.get("/product/:pid", async (req,res)=> {
    const pid = req.params.pid
    let product = await Product.getProductsById(pid)
    if(!product){
        res.send("producto no encontrado")
    } else{
        res.send (product)
    }
})

server.listen(8080, () => {
    console.log("Servidor abrido en puerto 8080 jajaja")
})