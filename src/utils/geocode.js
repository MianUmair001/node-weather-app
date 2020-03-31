const request_promice=require('request-promise')

const geocode=function(address,callback){
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidW1haXJha3JhbSIsImEiOiJjazhhYmpncWowMG9hM3BxdGp1eWdpODBhIn0.AXEwReXgQMv8NzIRd0S5RQ&limit=1'
    request_promice({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect with location services",undefined)
        }else if(body.features.length===0){
            callback('Unable to find the Location,Try another search',undefined)
        }else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name                
            })
        }
    })    
}

module.exports=geocode

