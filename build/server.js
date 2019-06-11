"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var users = __importStar(require("./users"));
var msg = __importStar(require("./messages"));
var _ = __importStar(require("underscore"));
var redis = require("socket.io-redis");
var app = Express();
app.use('bodyparser');
var http = require("http").Server(app);
var io = require("socket.io")(http);
io.adapter(redis({ host: 'localhost', port: 6379 }));
var tokens = [];
app.post('/register', function (req, res) {
    var user = req.body.user;
    user.lname = req.body.lname;
    var cred = req.body.credentials;
    users.registerUser(user, cred)
        .then(function () {
        res.sendStatus(200);
    })
        .catch(function () {
        res.sendStatus(500);
    });
});
app.post('/login', function (req, res) {
    var cred = req.body;
    users.authenticate(cred)
        .then(function (token) {
        res.send(token);
    })
        .catch(function () {
        res.sendStatus(403);
    });
});
app.post('/logout', function (req, res) {
    _.find(tokens, function (elem, i) {
        if (elem.token === req.body.token) {
            tokens.splice(i, 1);
            return true;
        }
        return false;
    });
    res.sendStatus(200);
});
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("message", function (message) {
        msg.saveMessage(message.mgs, message.us1, message.us2)
            .then(function () {
            socket.emit(message);
        })
            .catch(function () {
            console.log("something with connection");
        });
    });
});
app.post('/whole_conversation', function (req, res) {
    var us1 = req.body.users[0];
    var us2 = req.body.users[1];
    msg.fetchAllMsg(us1, us2)
        .then(function (msgs) {
        res.send(msgs);
    })
        .catch(function () {
        res.sendStatus(203);
    });
});
io.listen(8081);
app.listen(8080, function () {
    console.log("serv init");
});
