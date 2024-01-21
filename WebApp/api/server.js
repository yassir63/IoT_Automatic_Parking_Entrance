require('dotenv').config();
const app = require('./src')
const port = process.env.PORT || '3001'
const {sequelize}=require('./src/models')



app.listen(port,
    async () => {
        console.log(`server start at: http://localhost:${port}/`)
        try {
            await sequelize.authenticate()
            console.log('connected');
        } catch (error) {
            console.log('fail to connect');
        }
    }
);