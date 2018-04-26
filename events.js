const events = require('events');
var clocktick = new events.EventEmitter();
var tick = true;

setInterval(function () {
    clocktick.emit('sec');
}, 1000)
console.log('clock started');

clocktick.setMaxListeners(2)

clocktick.once('sec', function() {
    console.log('Firing up the clock...');
})

clocktick.on('sec', function() {
    if (tick) {
        console.log('Tick...');
        tick = false;
    } else {
        console.log('Tock...');
        tick = true;
    }
})

setTimeout(function() {
    clocktick.removeAllListeners();
    console.log('clock stopped...')
},10000)
