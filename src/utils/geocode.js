const axios=require('axios')
const geocode=function(address,callback){
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidW1haXJha3JhbSIsImEiOiJjazhhYmpncWowMG9hM3BxdGp1eWdpODBhIn0.AXEwReXgQMv8NzIRd0S5RQ&limit=1'
    axios.get(url).then((response) =>{
        console.log(response)
        if(response.data.features.length===0){
            callback('Unable to find the Location,Try another search',undefined)
        }else{
            callback(undefined,{
                longitude:response.data.features[0].center[0],
                latitude:response.data.features[0].center[1],
                location:response.data.features[0].place_name                
            })
        }
    }).catch(error=>{
            callback("Unable to connect with location services"+error,undefined)
    })    
}




module.exports=geocode

