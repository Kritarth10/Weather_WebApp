const path=require('path')
const express = require('express')
const hbs=require('hbs')
const request = require('request')
const geocode= require('./utils/geocode')
const forecast=require('./utils/forecast')
const app= express()
const htmldirectory = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000
app.use(express.static(htmldirectory))

app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
  res.render('index',{
      title:'Home Page',
      name:'Kritarth Govil'
  })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Kritarth Govil'
    })
})
 app.get('/weather',(req,res)=>{
     if(!req.query.address)
     {
         return res.send({
             Error:'Please provde an address'
         })
     }
     geocode(req.query.address,({latitude,longitude,place}={},error)=>{
        if(error)
        return res.send({
            error:error
        })
         forecast(latitude,longitude,(forecastdata,error)=>{
          if(error)
          return res.send({
            error:error
        })
        res.send({
            Address:place,
            forecast:forecastdata
        })
         
        })  
      })
 })
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Kritarth Govil'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help article cannot be found',
        name:'Kritarth Govil'
    })
})
app.get('*',(req,res)=>{
   res.render('error',{
       title:'Page not found',
       name:'Kritarth Govil'

   })
})
 app.listen(port,()=>{
     console.log('server is up and running')
 })