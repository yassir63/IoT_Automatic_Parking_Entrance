const express = require('express')
const {sequelize}=require('./models');
const indexrouter=require('./routes')
const app = express();
const cors = require('cors');

//Create tables
// const dbSync= async()=> {
//     try {
//     await sequelize.sync({ force: true });
//     console.log("All models were synchronized successfully.");
//     } catch (error) {
//         console.log('fail to synchronize models');
//     }
// }
// dbSync();


app.use(cors());
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api',indexrouter)

app.get('/', (req, res) => {
    res.send('Use /api');
  });


app.use('*', (req, res) => {
    res.status(404).send('Page not found');
  });



module.exports = app;