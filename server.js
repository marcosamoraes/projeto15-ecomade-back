import app from './src/app.js'
import dotenv from 'dotenv'

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`Server listen on PORT ${PORT}`)
})