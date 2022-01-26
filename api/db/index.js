const mongoose = require('mongoose');

const uri = "mongodb+srv://schedy:3365@cluster0.13vjk.mongodb.net/Schedy?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected to Cluster!'))
.catch(err => { console.log('Error connecting to Cluster', err) }); 
  
module.exports = mongoose