import express from 'express'
import { ENV } from './lib/env.js'

const app = express()
const Port = ENV.PORT

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'success from backend' })
})

app.listen(Port, console.log('server is running'))
