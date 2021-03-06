"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var users_1 = require("./users");
var pool = new pg_1.Pool({
    user: 'azath',
    host: 'localhost',
    database: 'messanger',
    password: 'waran138',
    port: 5432
});
function saveMessage(msg, login1, login2) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        pool.query("SELECT convExists(" + msg.conv + ");", function (err, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(res.rows[0].convexists == false)) return [3 /*break*/, 2];
                        _a = msg;
                        return [4 /*yield*/, createConversation(login1, login2)];
                    case 1:
                        _a.conv = _c.sent();
                        _c.label = 2;
                    case 2:
                        _b = msg;
                        return [4 /*yield*/, users_1.getUserId(msg.author)];
                    case 3:
                        _b.author_id = _c.sent();
                        pool.query("INSERT INTO message(author,date_written,conv,content) VALUES (" + msg.author_id + ",'" + msg.date_written + "'," + msg.conv + ",'" + msg.content + "');", function (err, res) {
                            if (err)
                                throw err;
                            resolve();
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
exports.saveMessage = saveMessage;
function fetchAllMsg(us1, us2) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var conv_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchConv(us1, us2)];
                case 1:
                    conv_id = _a.sent();
                    pool.query("SELECT * FROM message WHERE conv=" + conv_id + ";", function (err, res) {
                        if (err)
                            throw err;
                        if (res) {
                            if (res.rowCount > 0) {
                                resolve(res.rows);
                            }
                            else {
                                reject();
                            }
                        }
                        else {
                            reject();
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.fetchAllMsg = fetchAllMsg;
function fetchConv(us1, us2) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var us1_id, us2_id, stream;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, users_1.getUserId(us1)];
                            case 1:
                                us1_id = _a.sent();
                                return [4 /*yield*/, users_1.getUserId(us2)];
                            case 2:
                                us2_id = _a.sent();
                                return [4 /*yield*/, pool.query('SELECT id FROM conversation WHERE (account1 = ' + us1_id + ' AND account2 = ' + us2_id + ') OR ( account1 = ' + us2_id + ' AND account2 = ' + us1_id + ');', function (err, res) {
                                        if (err)
                                            throw err;
                                        if (res.rowCount > 0) {
                                            resolve(res.rows[0].id);
                                        }
                                        else {
                                            reject();
                                        }
                                    })];
                            case 3:
                                stream = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function greatestId(tablename) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    pool.query("SELECT MAX(id) FROM " + tablename + ";", function (err, res) {
                        if (err)
                            throw err;
                        resolve(res.rows[0].max);
                    });
                })];
        });
    });
}
function createConversation(userlog1, userlog2) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        pool.query("SELECT id FROM account WHERE login LIKE '" + userlog1 + "' OR login LIKE '" + userlog2 + "';", function (err, log_ids) {
                            var userid1 = log_ids.rows[0].id;
                            var userid2 = log_ids.rows[1].id;
                            pool.query("INSERT INTO conversation(account1, account2) VALUES(" + userid1 + "," + userid2 + ");", function (err, res) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (err)
                                                throw err;
                                            _a = resolve;
                                            return [4 /*yield*/, greatestId('conversation')];
                                        case 1:
                                            _a.apply(void 0, [_b.sent()]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        });
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
function getMessage(msgId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    pool.query('SELECT * FROM message WHERE id=' + msgId + ' AS msg;', function (err, res) {
                        if (err)
                            throw err;
                        resolve(res.rows[0]);
                    });
                })];
        });
    });
}
exports.getMessage = getMessage;
