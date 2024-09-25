const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://shubho:Aa2fBkcH0IPRIcJP@cluster0.oo8ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/elections', require('./routes/election'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
