const compiler =require('./routes/compile')
const userAuth =require('./routes/auth')
const mongoose=require('mongoose');
const express = require("express");

const cors = require("cors");
const app = express();
const PORT = 8000;
const url="mongodb://mdjawed:jkmo786@ac-kqhwimf-shard-00-00.bjbhrw7.mongodb.net:27017,ac-kqhwimf-shard-00-01.bjbhrw7.mongodb.net:27017,ac-kqhwimf-shard-00-02.bjbhrw7.mongodb.net:27017/?ssl=true&replicaSet=atlas-v5laex-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(url).then(()=>{
    console.log('DBconnection is successful');
}).catch((err)=>{
    console.log(err);
})
app.use(cors());
app.use(express.json());

app.use("/api", compiler)
app.use('/',userAuth)

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
