const request=require('request')
const forecast = (latitude,longitude,callback)=>{
    url= 'http://api.weatherstack.com/current?access_key=18a2ad25eba1a6d74d4de01083e0ad6f&query='+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
         if(error)
         callback(undefined,'Unable to connect to weatherstack')
         else if(body.error)
         callback(undefined,body.error.info)
         else
         {
           const data=body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature + ' degree out there and it feels like '+ body.current.feelslike
           callback(data,undefined)
         }
    })
  
  }
  module.exports=forecast