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
var msg = __importStar(require("../messages"));
{
    var log1_1 = 'xxxuser';
    var log2_1 = 'yyyuser';
    var msg1 = {
        author: log1_1,
        date_written: '2019/12/04 12:42:42',
        conv: 1,
        content: "caidscbyisfbvuadfnvoudnfo",
        read: false
    };
    msg.fetchAllMsg(log1_1, log2_1)
        .then(function (data) {
        chai_1.assert.fail();
    })
        .catch(function () {
    });
    msg.saveMessage(msg1, log1_1, log2_1)
        .then(function () {
        msg.fetchAllMsg(log1_1, log2_1)
            .then(function (conv) {
            chai_1.expect(conv.length).to.be.at.least(1);
        })
            .catch(function () {
            chai_1.assert.fail();
        });
    })
        .catch(function () {
        chai_1.assert.fail();
    });
}
