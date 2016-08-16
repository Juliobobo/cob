var say = require('say');


// Fire a callback once the text has completed being spoken
say.speak('whats up, dog?', 'Good News', 1.0, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Text has been spoken.');
});
