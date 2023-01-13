const express = require('express')
const productManager = require ('./productManager')
const server = express()


server.get('/products', async(req,res) =>{
    const {limit} = req.query
})

server.listen('8080', () => {
    console.log('running from express')
})