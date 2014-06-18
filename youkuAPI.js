var express = require('express');
var fs = require('fs');
var request = require('request');
var app     = express();


var outputObject = new Object();
var output = new Array();

app.get('/scrape', function(req,res){
	


	var vid = req.query.vid;

	url = 'http://api.flvxz.com/site/youku/vid/'+vid+'/jsonp/purejson';
	//url = 'http://api.flvxz.com/site/youku/vid/request.query.vid/jsonp/purejson';


	request(url,function(error,response,json){

		var json1 = new Object();   
		var data = JSON.parse(json);
		var url = data[0].files[0].furl;
		var type = data[0].files[0].ftype;
		var title = data[0].title;

		json1.id = vid;
		//json1.type = type;
		json1.url = url;
		output.push(json1);		
		outputObject[title] = output;
		output = new Array();

		if(type==="mp4"){

		fs.writeFile('output1.json', JSON.stringify(outputObject, null, 4), function(err){

        		console.log('File successfully written! - Check your project directory for the output.json file');
        		
        		});

        httpResponse(res ,JSON.stringify(outputObject, null, 4));
    }

        outputObject = new Object();

	}) // end of request
	


}) // end of app


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;


// the function required to show data on the API
function httpResponse(response, data) {
        try {
                response.setHeader('Content-Length', Buffer.byteLength(data));
                response.setHeader('Content-Type', 'application/json; charset="utf-8"');
                response.write(data);
                response.end();
        } catch(err) {
                console.log(err);
        }

}
