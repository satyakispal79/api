"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userSchema = require("../models/users");

exports.findUser = async (query) => {
  let searchQuery = {};
  if (query._id) {
    searchQuery._id = query._id;
  }
  return await userSchema.find(searchQuery);
};
// insert new user
exports.insertUser = async (body) => {
  console.log("body==", body);
  // body.password = encrypt(body.password)
  const userDoc = new userSchema({
    ...body,
  });
  //   console.log("userDoc==", userDoc)
  return userDoc.save();
};

// update user data
exports.updateuser = (body) => {
  console.log("body==", body);
  return users.findOneAndUpdate({ _id: body._id }, { ...body }, { new: true });
};

// function for encrypting anything
function encrypt(text) {
  // console.log("text==", text)
  let cipher = crypto.createCipher(
    process.env.algorithm,
    process.env.supersecret
  );
  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}
// function for decrypting anything
function decrypt(text) {
  const decipher = crypto.createDecipher(
    process.env.algorithm,
    process.env.supersecret
  );
  let decryptedData = decipher.update(text, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}
// function for encrypting with hash
function hashEncrypt(text) {
  bcrypt.hash(text, 8, function (err, resp) {
    if (err) {
      console.log("password hash error==", err);
      return err;
    }
    console.log(" hashed resp==", resp);
    return resp;
  });
}
// find user by email or phone number
exports.findbyEmailOrPhone = (body) => {
  console.log("body==", body);
  const query = {};
  if (body.email || body.phone) {
    if (body.email) {
      query.email = body.email.trim().toLowerCase();
    }
    if (body.phone) {
      query.phone = body.phone;
    }

    return userSchema.findOne(query, "email phone password");
  } else return null;
};

// match passwords
exports.comparePassword = (data) => {
  console.log("data==", data);
  if (encrypt(data.entered_pw) == encrypt(data.found_pw)) return true;
  else return false;
};
