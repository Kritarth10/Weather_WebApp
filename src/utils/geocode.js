const request = require('request')
const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoia2dvdmlsIiwiYSI6ImNrbXc1dzZyczBiejUyb3FuMXY0dmo2dGUifQ.zgLsZ7MsUrN17wJ0HaASHw&limit=1'
    request({url,json:true},(error,{body}={})=>{
      if(error)
      callback('Unable to connect to Mapbox Service', undefined)
      else if (body.features.length===0)
      callback(undefined,'Please enter the valid address')
      else
      {
        const data={
          longitude:body.features[0].center[0],
          latitude:body.features[0].center[1],
          place:body.features[0].place_name
        }
        callback(data,undefined)
      }
    })

}

module.exports = geocode