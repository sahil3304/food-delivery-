const express = require ('express');
const app = express();
app.listen(3000);
app.get('/',(req, res) =>{
    res.send('<h1>Hello</h1>');
});

app.get('/about',(req,res)=>{
    res.sendFile('./views/about.html',{root:__dirname});
});

app.get('./about-us', (req, res)=>{

})

app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
});

