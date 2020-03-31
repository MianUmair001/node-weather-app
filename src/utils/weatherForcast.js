const axios=require('axios')
const weatherForcast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/b3b186b490908e1faef41d4b072e8709/'+latitude+','+longitude+'?units:si&exclude:hourly,minutely'
    axios.get(url).then((response)=>{
        if(response.data.error){
            callback("Unable to find Location",undefined)
        }else{
            callback(undefined,
                response.data.daily.data[0].summary + 'It is currently '+
                response.data.currently.temperature + ' degress out.The High today is '+response.data.daily.data[0].temperatureHigh +' with the low of '+ response.data.daily.data[0].temperatureLow +'. There is a '+
                response.data.currently.precipProbability +'% chance of rain')  
        }
    }).catch(error=>{
        callback("Unable to connnect with weather services",undefined)
    })
}






module.exports=weatherForcast
