"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    user: 'azath',
    host: 'localhost',
    database: 'messanger',
    password: 'waran138',
    port: 5432
});
function registerUser(user, cred) {
    return new Promise(function (res, rej) {
        pool.query("INSERT INTO account(login,pass,name,lname) VALUES('" + cred.login + "','" + cred.password + "','" + user.name + "','" + user.lname + "');", function (err) {
            if (err)
                throw err;
            res();
        });
    });
}
exports.registerUser = registerUser;
function getUserId(login) {
    return new Promise(function (resolve, reject) {
        var id = pool.query("SELECT id FROM account WHERE login LIKE '" + login + "';", function (err, res) {
            if (err)
                throw err;
            resolve(res.rows[0].id);
        });
    });
}
exports.getUserId = getUserId;
function getUser(cred) {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM account WHERE login LIKE '" + cred.login + "' AND pass LIKE '" + cred.password + "';", function (err, res) {
            if (err)
                throw err;
            resolve(res.rows[0]);
        });
    });
}
exports.getUser = getUser;
function authenticate(cred) {
    return new Promise(function (resolve, reject) {
        var stream = pool.query("SELECT auth('" + cred.login + "','" + cred.password + "');", function (err, res) {
            if (res.rows[0].auth) {
                resolve(createToken(cred));
            }
            else {
                reject();
            }
        });
    });
}
exports.authenticate = authenticate;
function createToken(creds) {
    return "token";
}
