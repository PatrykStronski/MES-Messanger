"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var users = __importStar(require("../users"));
// insert user to db
{
    var cred = { login: "fajnyUser", password: "chujowechasło" };
    var cred2 = { login: "głupiUser", password: "chujowechasło" };
    var us_1 = { name: "fajny user", lname: "barszo fajny" };
    users.getUser(cred)
        .then(function (repl) {
        chai_1.expect(repl).to.be.an('object');
        chai_1.expect(repl.name).to.be.equal(us_1.name);
        chai_1.expect(repl.lname).to.be.equal(us_1.lname);
    })
        .catch(function (err) {
        throw err;
    });
    users.authenticate(cred)
        .then(function (str) {
        chai_1.expect(str).to.be.a('string');
    })
        .catch(function () {
    });
    users.authenticate(cred2)
        .then(function (str) {
        chai_1.assert.fail("should not be found");
    })
        .catch(function () {
    });
}
