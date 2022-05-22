const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const input = { test: 1 };
    const token = jwt.sign(input, 'shh', { expiresIn: '1h' });
    const output = jwt.verify(token, 'shh');
  
    // { test: 1 }
    console.log(input);
    // { test: 1 }
    console.log(output);
  }

  

