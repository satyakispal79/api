"use strict";
const userService = require("../services/userService");

const findUsers = async (req, res, next) => {
  try {
    const usersRes = await userService.findUser(req.query);
    console.log("usersRes==", usersRes);
    res.send({
      message: "User data fetched successfully",
      status: 200,
      success: true,
      usersRes,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 500,
      success: false,
      error: error,
    });
  }
};
const addUsers = async (req, res, next) => {
  let usersdata;
  let message = "";
  try {
    console.log("req.body ==", req.body);
    usersdata = await userService.insertUser(req.body);

    if (!usersdata) {
      throw "Something Went Wrong !";
    }
    message = "User data added successfully";

    return res.status(200).send({
      success: true,
      status: 200,
      message: message,
      data: usersdata,
    });
  } catch (err) {
    console.log("catch err==", err);
    if (err.message) {
      message = err.message;
    } else {
      {
        message = err;
      }
    }
    console.log("catch err.message==", err.message);
    return res.status(err.status || 500).send({
      success: false,
      status: 500,
      message: message,
    });
  }
};
async function login(req, res, next) {
  console.log("req.body==", req.body);
  try {
    if (!req.body.email && !req.body.phone) {
      throw "Email or Mobile required !";
    }
    if (!req.body.password) {
      throw "Password is required !";
    }
    const userExist = await userService.findbyEmailOrPhone(req.body);
    console.log("userExist==", userExist);
    if (!userExist) {
      console.log("The user doesn't exist !");
      throw "The user doesn't exist !";
    }
    const passwordMatch = await userService.comparePassword({
      entered_pw: userExist.password,
      found_pw: req.body.password,
    });
    console.log("passwordMatch==", passwordMatch);
    if (!passwordMatch) {
      console.log("Wrong Password entered !");
      throw "Wrong Password entered !";
    }
    // const jwt = await userservice.jwtCreate()
    // console.log("jwt==", jwt)
    // if (!jwt) {
    //   throw "Token is not present !"
    // }

    return res.send({
      success: true,
      message: "Login Successful",
      usersdata: userExist,
      // jwt,
    });
  } catch (error) {
    // return next(error)
    return res.send({
      success: false,
      message: error,
    });
  }
}
///////////////////////////////////////
const generateTicket = async (req, res, next) => {
  try {
    var cols,
      finalTicket,
      flag = true,
      colPlaceholder = [];
    while (flag) {
      cols = Array(9).fill(2);
      finalTicket = Array(6);
      finalTicket[0] = Array(9).fill(0);
      finalTicket[1] = Array(9).fill(0);
      finalTicket[2] = Array(9).fill(0);
      finalTicket[3] = Array(9).fill(0);
      finalTicket[4] = Array(9).fill(0);
      finalTicket[5] = Array(9).fill(0);
      var r = getUniqueRandomNumber(0, 8, 6);
      for (i = 0; i < r.length; i++) {
        cols[r[i]] = 1;
      }
      colPlaceholder = [];
      for (i = 0; i < cols.length; i++) {
        colPlaceholder.push(getUniqueRandomNumber(0, 2, cols[i]));
      }
      for (i = 0; i < colPlaceholder.length; i++) {
        nums = getUniqueRandomNumber(
          i * 10 + 1,
          i * 10 + 10,
          colPlaceholder[i].length
        );
        for (j = 0; j < colPlaceholder[i].length; j++) {
          finalTicket[colPlaceholder[i][j]][i] = nums[j];
        }
      }
      flag = testFinalTicket(finalTicket);
    }
    return finalTicket;
  } catch (err) {
    console.log("catch err==", err);
    if (err.message) {
      message = err.message;
    } else {
      {
        message = err;
      }
    }
    console.log("catch err.message==", err.message);
    return res.status(err.status || 500).send({
      success: false,
      status: 500,
      message: message,
    });
  }
};
Array.prototype.count = function (obj) {
  var count = this.length;
  if (typeof obj !== "undefined") {
    var array = this.slice(0),
      count = 0;
    for (i = 0; i < array.length; i++) {
      if (array[i] == obj) {
        count++;
      }
    }
  }
  return count;
};
function testFinalTicket(ticket) {
  for (i = 0; i < 6; i++) {
    var arr = ticket[i];
    count = 0;
    for (j = 0; j < arr.length; j++) {
      if (arr[j] === 0) count++;
    }
    if (count != 7) return true;
  }
  return false;
}
function getDrawSequence() {
  return getUniqueRandomNumber(1, 90, 90, false);
}
function sortNumbersinArray(a, b) {
  return a > b ? 1 : 0;
}
function getUniqueRandomNumber(min, max, count, sort = true) {
  var random = [];
  for (var i = 0; i < count; i++) {
    flag = true;
    while (flag) {
      r = randomNumber(min, max);
      if (random.indexOf(r) === -1) {
        random.push(r);
        flag = false;
      }
    }
  }
  if (sort) random.sort(sortNumbersinArray);
  return random;
}
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

///////////////////////////////////////

module.exports = {
  findUsers,
  addUsers,
  login,
  generateTicket,
  getDrawSequence: getDrawSequence,
};
