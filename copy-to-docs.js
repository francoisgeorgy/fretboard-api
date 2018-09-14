var fs = require('fs-extra');

var source = './dist/index.js';
var dest = './docs/index.js';

fs.copy(source, dest, function (err) {

    if (err)
    {
        return console.error(err);
    }

    console.log('Copied to ' + dest);

});
