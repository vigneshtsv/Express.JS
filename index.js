// const express = require('express') //common.js
import express from 'express'  //intha mathiri import pananum entral package.json -il (type = module) entru irukkanum
import AppRoutes from './src/routes/index.js'
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.use('/',AppRoutes)

app.listen(PORT,()=>console.log(`App is listening port ${PORT}`))