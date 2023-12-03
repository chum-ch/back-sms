const express = require('express');
const cors = require('cors');
const IndexAPI = require('./apis/index');

const app = express();
// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to my sms! 🥰');
})
// Route School
app.get('/schools', IndexAPI.SchoolAPI.listSchools);
app.post('/schools', IndexAPI.SchoolAPI.createSchool);
app.put('/schools/:schoolId', IndexAPI.SchoolAPI.updateSchool);
app.get('/schools/:schoolId', IndexAPI.SchoolAPI.getSchool);
app.delete('/schools/:schoolId', IndexAPI.SchoolAPI.deleteSchool);


app.listen(3003, ()=>{
    console.log('Server running:: => http://localhost:3003');
})



module.exports = app;