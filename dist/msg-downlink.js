"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
/* Importing Constants */
var constants_1 = require("./constants");
/* Importing Utils */
var utils_1 = require("./utils");
/* Importing Message Components */
var msg_components_1 = require("./msg-components");
var DlMsg_PosOnDem = /** @class */ (function (_super) {
    __extends(DlMsg_PosOnDem, _super);
    function DlMsg_PosOnDem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DlMsg_PosOnDem.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DlMsgType.POSITION_ON_DEMAND, 'DlMsg_PosOnDem.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_PosOnDem.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'DlMsg_PosOnDem.setFromBuffer(): Invalid buffer legth!');
        this.header = new msg_components_1.DlHeaderShort(x);
    };
    DlMsg_PosOnDem.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return DlMsg_PosOnDem;
}(utils_1.BufferTempl));
exports.DlMsg_PosOnDem = DlMsg_PosOnDem;
var DlMsg_SetMode = /** @class */ (function (_super) {
    __extends(DlMsg_SetMode, _super);
    function DlMsg_SetMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DlMsg_SetMode.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DlMsgType.SET_MODE, 'DlMsg_SetMode.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DlMsg_SetMode.prototype, "mode", {
        get: function () {
            return this._props.mode;
        },
        // *** mode ***
        set: function (x) {
            assert.ok(x in constants_1.E_OperatingMode, 'DlMsg_SetMode.mode: Invalid value!');
            this._props.mode = x;
            this._props._mode = constants_1.E_OperatingMode[x];
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_SetMode.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 3, 'DlMsg_SetMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new msg_components_1.DlHeaderShort(x.slice(0, 2));
        this.mode = x[2];
    };
    DlMsg_SetMode.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(3);
        this.header.toBuffer().copy(y);
        y[2] = this.mode;
        return y;
    };
    return DlMsg_SetMode;
}(utils_1.BufferTempl));
exports.DlMsg_SetMode = DlMsg_SetMode;
var DlMsg_ReqConf = /** @class */ (function (_super) {
    __extends(DlMsg_ReqConf, _super);
    function DlMsg_ReqConf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DlMsg_ReqConf.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DlMsgType.REQUEST_CONFIGURATION, 'DlMsg_ReqConf.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DlMsg_ReqConf.prototype, "paramIDs", {
        get: function () {
            return this._props.paramIDs;
        },
        // *** paramIDs ***
        set: function (x) {
            var paramIDsLength = x.length;
            assert.ok(paramIDsLength <= 20, 'DlMsg_ReqConf.paramIDs: Invalid length!');
            var _x = [];
            for (var i in x) {
                assert.ok(x[i] in constants_1.E_ParameterId, 'DlMsg_ReqConf.paramIDs: Invalid value!');
                _x.push(constants_1.E_ParameterId[i]);
            }
            this._props.paramIDs = x;
            this._props._paramIDs = _x;
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_ReqConf.prototype.setFromBuffer = function (x) {
        var l = x.length;
        assert.ok((2 <= l) && (l <= 22), 'DlMsg_ReqConf.setFromBuffer(): Invalid buffer legth!');
        this.header = new msg_components_1.DlHeaderShort(x.slice(0, 2));
        var paramIDs = [];
        for (var i = 2; i < l; i++) {
            paramIDs.push(x[i]);
        }
        this.paramIDs = paramIDs;
    };
    DlMsg_ReqConf.prototype.toBuffer = function () {
        var paramIDsLength = this.paramIDs.length;
        var y = Buffer.allocUnsafe(2 + paramIDsLength);
        this.header.toBuffer().copy(y);
        for (var i = 0; i < paramIDsLength; i++) {
            y[2 + i] = this.paramIDs[i];
        }
        return y;
    };
    return DlMsg_ReqConf;
}(utils_1.BufferTempl));
exports.DlMsg_ReqConf = DlMsg_ReqConf;
var DlMsg_SOSMode = /** @class */ (function (_super) {
    __extends(DlMsg_SOSMode, _super);
    function DlMsg_SOSMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DlMsg_SOSMode.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok((x.type === constants_1.E_DlMsgType.START_SOS_MODE) || (x.type === constants_1.E_DlMsgType.STOP_SOS_MODE), 'DlMsg_SOSMode.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_SOSMode.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'DlMsg_SOSMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new msg_components_1.DlHeaderShort(x);
    };
    DlMsg_SOSMode.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return DlMsg_SOSMode;
}(utils_1.BufferTempl));
exports.DlMsg_SOSMode = DlMsg_SOSMode;
var DlMsg_SetParam = /** @class */ (function (_super) {
    __extends(DlMsg_SetParam, _super);
    function DlMsg_SetParam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DlMsg_SetParam.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DlMsgType.SET_PARAM, 'DlMsg_SetParam.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DlMsg_SetParam.prototype, "params", {
        get: function () {
            return this._props.params;
        },
        // *** params ***
        set: function (x) {
            this._props.params = x;
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_SetParam.prototype.setFromBuffer = function (x) {
        var paramsLength = (x.length - 2) / 5;
        assert.ok([1, 2, 3, 4, 5].includes(paramsLength), 'DlMsg_SetParam.setFromBuffer(): Invalid buffer legth!');
        this.header = new msg_components_1.DlHeaderShort(x.slice(0, 2));
        var params = [];
        for (var i = 0; i < paramsLength; i++) {
            params.push(new msg_components_1.Parameter(x.slice(2 + (i * 5), 7 + (i * 5))));
        }
        this.params = params;
    };
    DlMsg_SetParam.prototype.toBuffer = function () {
        var paramsLength = this.params.length;
        var y = Buffer.allocUnsafe(2 + (paramsLength * 5));
        this.header.toBuffer().copy(y);
        for (var i = 0; i < paramsLength; i++) {
            this.params[i].toBuffer().copy(y, 2 + (i * 5));
        }
        return y;
    };
    return DlMsg_SetParam;
}(utils_1.BufferTempl));
exports.DlMsg_SetParam = DlMsg_SetParam;
var DlMsg_DebugCmd = /** @class */ (function (_super) {
    __extends(DlMsg_DebugCmd, _super);
    function DlMsg_DebugCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DlMsg_DebugCmd.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DlMsgType.DEBUG_COMMAND, 'DlMsg_DebugCmd.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DlMsg_DebugCmd.prototype, "debugCmd", {
        get: function () {
            return this._props.debugCmd;
        },
        // *** debugCmd ***
        set: function (x) {
            assert.ok(x in constants_1.E_DebugCmd, 'DlMsg_DebugCmd.debugCmd: Invalid value!');
            this._props.debugCmd = x;
            this._props._debugCmd = constants_1.E_DebugCmd[x];
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_DebugCmd.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 3, 'DlMsg_DebugCmd.setFromBuffer(): Invalid buffer legth!');
        this.header = new msg_components_1.DlHeaderShort(x.slice(0, 2));
        this.debugCmd = x[2];
    };
    DlMsg_DebugCmd.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(3);
        this.header.toBuffer().copy(y);
        y[2] = this.debugCmd;
        return y;
    };
    return DlMsg_DebugCmd;
}(utils_1.BufferTempl));
exports.DlMsg_DebugCmd = DlMsg_DebugCmd;
exports.decodeDlMsg = function (buf) {
    var msg;
    switch (buf[0]) {
        case constants_1.E_DlMsgType.POSITION_ON_DEMAND:
            msg = new DlMsg_PosOnDem(buf);
            break;
        case constants_1.E_DlMsgType.SET_MODE:
            msg = new DlMsg_SetMode(buf);
            break;
        case constants_1.E_DlMsgType.REQUEST_CONFIGURATION:
            msg = new DlMsg_ReqConf(buf);
            break;
        case constants_1.E_DlMsgType.START_SOS_MODE:
        case constants_1.E_DlMsgType.STOP_SOS_MODE:
            msg = new DlMsg_SOSMode(buf);
            break;
        case constants_1.E_DlMsgType.SET_PARAM:
            msg = new DlMsg_SetParam(buf);
            break;
        case constants_1.E_DlMsgType.DEBUG_COMMAND:
            msg = new DlMsg_DebugCmd(buf);
            break;
        default:
            msg = undefined;
            break;
    }
    if (msg) {
        return msg.toJSON();
    }
    else {
        return JSON.stringify({ error: "Unknown message type: " + constants_1.E_UlMsgType[buf[0]] }, null, 4);
    }
};
//# sourceMappingURL=msg-downlink.js.map