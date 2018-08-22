const jwt = require('jsonwebtoken')
const fs = require('fs')

// 创建和签发 token
const payload = {
  name: 'nan',
  admin: true
}
//
// const secret = 'I_LOVE_NAN'
//
// const token = jwt.sign(payload, secret)
//
// console.log(token);
//
// // 验证token
// jwt.verify(token, secret, (error, decoded) => {
//   if(error){
//     console.log(error);
//     return;
//   } else {
//     console.log(decoded);
//   }
// })

// 用rs256 算法签发jwt - (默认为: hs256)
// const privateKey = fs.readFileSync('./config/private.key')
// const token = jwt.sign(payload, privateKey, {algorithm:'RS256'});
//
// console.log(token);
//
// // 验证jwt
// const publicKey = fs.readFileSync('./config/public.key')
// jwt.verify(token, publicKey, (error, decoded) => {
//   if(error){
//     console.log(error.message);
//     return
//   }
//   console.log(decoded);
// })
