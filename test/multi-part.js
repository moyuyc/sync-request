'use strict';

var FormData = require('form-data');
var https = require('https');
var http = require('http');
var concat = require('concat-stream');
var request = require('../');
var asyncRequest = require('then-request')

var res = request("GET", "https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png");
var imgBuffer = res.getBody();

asyncRequest("GET", "https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png")
    .done((res) => {
        var imgBuffer = res.getBody();
        require('fs').writeFileSync('./img.png', imgBuffer)

        var form = new FormData();
        form.append('smfile', imgBuffer, {
            filename: 'nodejs-new-pantone-black.png',
            contentType: res.headers['content-type'],
            knownLength: +res.headers['content-length']
        });

        var headers = form.getHeaders();
        var chunks = [];

        form.on('data', (chunk) => {
            if (typeof chunk === 'string') {
                chunk = new Buffer(chunk);
            }
            console.log(chunk.toString())
            chunks.push(chunk);
        });

        form.on('end', () => {
            var res = request("POST", "https://sm.ms/api/upload", {body: Buffer.concat(chunks), headers});
            console.log(res.getBody().toString())
            // asyncRequest("POST", "https://sm.ms/api/upload", {body: Buffer.concat(chunks), headers})
            //     .done(res => console.log(res.getBody().toString()))
        });
        form.resume();
    })


var res = request("POST", "https://sm.ms/api/upload", {body: Buffer.concat(chunks), form: true});
console.log(res.getBody().toString())

