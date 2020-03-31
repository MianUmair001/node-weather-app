const request_promice=require('request-promise')

const weatherForcast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/b3b186b490908e1faef41d4b072e8709/'+latitude+','+longitude+'?units:si&exclude:hourly,minutely'
    request_promice({url, json:true },(error,{body})=>{
        if(error){
            callback("Unable to connnect with weather services",undefined)
        }else if(body.error){
            callback("Unable to find Location",undefined)
        }else{
            callback(undefined,
                body.daily.data[0].summary + 'It is currently '+
                body.currently.temperature + ' degress out. There is a '+
                body.currently.precipProbability +'% chance of rain')  
        }
    })
}

module.exports=weatherForcast
