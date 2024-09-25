const mongoose = require('mongoose');
const Election = require('./models/Election');

mongoose.connect('mongodb+srv://shubho:Aa2fBkcH0IPRIcJP@cluster0.oo8ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  await Election.deleteMany({}); // Clear existing data
  await Election.insertMany([
    { title: 'BJP Bharatiya Janata Party', candidates: [{ name: 'Candidate A' }, { name: 'Candidate B' }] },
    { title: 'INC Indian National Congress', candidates: [{ name: 'Candidate X' }, { name: 'Candidate Y' }] },
  ]);
  console.log('Elections added!');
  mongoose.connection.close();
})
.catch(err => console.log(err));
