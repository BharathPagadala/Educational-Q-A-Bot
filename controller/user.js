const { response } = require("express");
const fs = require("fs");
const userInfo = fs.readFileSync("E:/projects/dataBase/database.json");
const userData = JSON.parse(Buffer.from(userInfo).toString());

async function signUp(req, res) {
  
  const user = req.body.user;

  try {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].user === user) {
        return {
          status: 400,
          data: "User already present in the database! Please try login...",
        };
      }
    }
    userData.push(req.body);
    const _wData = JSON.stringify(userData);
    console.log(_wData);
    fs.writeFileSync("E:/projects/dataBase/database.json", _wData);
    return {
      status: 201,
      data: "Sign Up Complete!",
    };
  } catch (e) {
    console.log(e);
  }
}

async function login(req, res) {
    const user = req.body.user;
    const password = req.body.password;
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].user === user ) {
            if(userData[i].password != password){
                return{
                    status: 404,
                    data: "username or password is incorrect.. please try again.."
                }
            }
            if(userData[i].allowed === 'no'){
                return{
                    status: 401,
                    data: "user Blocked! ..."
                }
            }
          return {
            status: 200,
            data: "login succesfull..",
          };
        }
      }
      return {
        status: 404,
        data: "User Not Found! please try singup...",
      };
}

module.exports = {
  signUp,
  login
};
