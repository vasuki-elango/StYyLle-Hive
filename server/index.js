const express = require('express')
const cors = require('cors')
require('dotenv').config()
const getDatabse = require('./config/db')

const PORT = process.env.PORT || 5000

const ProductRoutes = require('./routes/ProductsRoutes')
const UserRoutes = require('./routes/UserRoutes')
const CartRoutes = require('./routes/CartRoutes')
const OrderRoutes = require('./routes/OrderRoutes')

const AdminRoutes = require('./routes/AdminRoutes')
const AdminUserRouter = require('./routes/AdminUserRoutes')
const AdminProductRoutes = require('./routes/AdminProductRoutes')
const AdminOrderRoutes = require('./routes/AdminOrderRoutes')

const app = express();
app.use(cors())
app.use(express.json())

getDatabse()

app.get("/", (req, res) => {
    res.send("Hello from StYyLle Hive 💅");
});

app.use('/uploads', express.static('uploads'));

// user routes
app.use('/api/product',ProductRoutes)
app.use('/api/auth',UserRoutes)
app.use('/api/cart',CartRoutes)
app.use('/api/order',OrderRoutes)

// admin routes
app.use('/api/admin/auth',AdminRoutes)
app.use('/api/admin/user',AdminUserRouter)
app.use('/api/admin/product',AdminProductRoutes)
app.use('/api/admin/order',AdminOrderRoutes)

app.listen(PORT,()=>{
    console.log(`Server running in port at 5000:http://localhost:${PORT}/`); 
})