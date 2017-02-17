/**
 * Created by moyu on 2017/2/17.
 */
var cp = require('child_process');
// process.chdir('/bin')
// console.log(require.resolve('../lib/find-port'), require('path').resolve('lib/find-port'))

// const out = require('fs').openSync('./out.log', 'a');
// const err = fs.openSync('./out.log', 'a');


var child = cp.spawn("cat", [__filename], {stdio: 'inherit', detached: false});
// var child = cp.spawn("cat", [__filename], {stdio: "inherit"});
// child.stdout.setEncoding(null);
// child.stdout.on('data', console.log);

// By default, the parent will wait for the detached child to exit.
child.unref();
process.on('beforeExit', () => {
    console.log('beforeExit');
})

process.on('exit', code => {
    console.log('exit with code:', code)
})

var net = require('net');

net.createServer({allowHalfOpen: true}, (c) => {
    c.pipe(c);
    c.write('hello\r\n');
    console.log(c.allowHalfOpen)

    c.on('end', () => {
        c.end('end\r\n');
        console.error("ended");
    })
}).listen(8124, () => {
    console.log('server bound');
})

// process.exit(0);
