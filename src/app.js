const path=require('path');
const geocode=require('./utils/geocode')
const weatherForcast=require('./utils/weatherForcast')
const hbs =require('hbs');
const express=require('express')
const publicDirectoryPath=path.join(__dirname,'../public')
console.log(publicDirectoryPath)
const pathViews=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const app=express()
const port=process.env.PORT||3000
app.use(express.static(publicDirectoryPath))
app.set("view engine",'hbs')
app.set('views',pathViews)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Muhammad Umair'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You must provide a search item'})
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }else{
                weatherForcast(latitude, longitude, (error, forcastData) => {
                    if(error){
                        return res.send({error})
                    }else{
                        res.send({
                            forcastData,
                            location,
                            address:req.query.address                   
                        })
                    }
                })
            }
            
                
        })
    }

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Muhammad Umair'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helptext:'This is the helpfultext',
        name:'Muhammad Umair' 
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404 Page',
        message:'Help article not found',
        name:'Muhammad Umair' 
    })
})


app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404 Page',
        message:'Page not found',
        name:'Muhammad Umair' 
    })
})


// app.get('/help/*',(req,res)=>{
//     res.send("Help article not found")
// })


// app.get('*',(req,res)=>{
//     res.send("My 404 Page")
// })


app.listen(port,()=>{
    console.log("Server is running on port:"+port)
})






