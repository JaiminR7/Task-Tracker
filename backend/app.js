const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./routes/taskRoutes');
const notFound = require('./middleware/notFound');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task Tracker API Running',
  });
});

app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;