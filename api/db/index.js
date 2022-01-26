const mongoose = require('mongoose');

const uri = "mongodb+srv://REMOVED_SECRET";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected to Cluster!'))
.catch(err => { console.log('Error connecting to Cluster', err) }); 
  
module.exports = mongoose