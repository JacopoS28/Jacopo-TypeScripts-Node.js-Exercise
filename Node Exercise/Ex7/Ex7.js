/* Command-line art */

const figlet = require('figlet');

const text = 'Hello, Jacopo Sangregorio!';

figlet(text, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
