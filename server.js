const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.status(200).send('Welcome to my sms! 🥰');
})
app.listen(3003, ()=>{
    console.log('Server running:: => http://localhost:3003');
})



module.exports = app;