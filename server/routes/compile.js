const router=require('express').Router();
var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);


router.post("/compile", (req, res) => {
	//getting the required data from the request
	let code = req.body.code;
	let language = req.body.language;
	let input = req.body.input;

	if (language === "python") {
		language = "py"
	}

	let data = {
		"code": code,
		"language": language,
		"input": input
	};
	if(language=='java'){
		try{var envData = { OS : "windows"}; 
		compiler.compileJava( envData , code , function(data){
		   console.log(data)
		   res.send(data);
	   });
	}catch(err){
		res.send(data.error);
	}
}else if(language==='node'){

	}
})

module.exports=router;