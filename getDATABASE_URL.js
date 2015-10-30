var fs = require('fs');

console.log("#########################\n\n")
console.log("Hello from getDATABASE_URL.js! here is your url: \n\n")
console.log(process.env.DATABASE_URL)
console.log("\n\n#########################\n\n")


module.exports = {
  host: "ec2-107-21-219-142.compute-1.amazonaws.com",
  port: "5432",
  user: process.env.DATABASE_URL.split(':')[1].slice(2),
  password: process.env.DATABASE_URL.split(':')[2].split('@')[0],
  database: process.env.DATABASE_URL.split(':')[3].split('/')[1],
  ssl: true
};

// fs.writeFile('localPWD.js', 'module.exports = ' + module.exports + '; \n', function (err) {
//   if (err) throw err;
//   console.log('It\'s saved!');
//   console.log(module.exports.password);
// });

