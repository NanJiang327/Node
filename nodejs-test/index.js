const crypto = require('crypto')
const hash = crypto.createHash('sha256')

hash.update('password')
console.log(hash.digest('base64'));


const bcrypt = require('bcrypt')
const password = 'password'

bcrypt.genSalt(10, (error, salt) => {
  console.log('salt: ' +salt);

  bcrypt.hash(password, salt, (error, hash) => {
    console.log(hash);
  })
})
