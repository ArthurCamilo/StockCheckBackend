import express from 'express'
import cors from 'cors'
import { productsRouter } from './routers/products'
import { connectToDatabase } from './databaseConnection'
import { movementsRouter } from './routers/movements'
import { vendorsRouter } from './routers/vendors'
import { notificationsRouter } from './routers/notifications'

const PORT = process.env.PORT || 4000
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})

connectToDatabase()

// Cors
app.use(cors({
    origin: ['http://localhost:3000']
}))

app.use('/api', productsRouter)
app.use('/api', movementsRouter)
app.use('/api', notificationsRouter)
app.use('/api', vendorsRouter)

app.use((req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})