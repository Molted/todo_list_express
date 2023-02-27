const express = require('express');
const { connectDB } = require('./config/dbConnection');
const { errorHandler } = require('./middleware/errorHandler');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();
app.use('/api/todos', require('./routes/TodoRoute'));
app.use('/api/users', require('./routes/UserRoute'));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));