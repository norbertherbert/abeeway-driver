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
/* Constants */
var constants_1 = require("./constants");
/* Utils */
var utils_1 = require("./utils");
/* Component Protocol Data Units (CPDU) */
var CPDU_1 = require("./CPDU");
var DPDU_PosOnDem = /** @class */ (function (_super) {
    __extends(DPDU_PosOnDem, _super);
    function DPDU_PosOnDem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DPDU_PosOnDem.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DPDUType.POSITION_ON_DEMAND, 'DPDU_PosOnDem.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    DPDU_PosOnDem.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'DPDU_PosOnDem.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_DlHeaderShort(x);
    };
    DPDU_PosOnDem.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return DPDU_PosOnDem;
}(utils_1.PDUTemplate));
exports.DPDU_PosOnDem = DPDU_PosOnDem;
var DPDU_SetMode = /** @class */ (function (_super) {
    __extends(DPDU_SetMode, _super);
    function DPDU_SetMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DPDU_SetMode.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DPDUType.SET_MODE, 'DPDU_SetMode.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DPDU_SetMode.prototype, "mode", {
        get: function () {
            return this._props.mode;
        },
        // *** mode ***
        set: function (x) {
            assert.ok(x in constants_1.E_OperatingMode, 'DPDU_SetMode.mode: Invalid value!');
            this._props.mode = x;
            this._props._mode = constants_1.E_OperatingMode[x];
        },
        enumerable: true,
        configurable: true
    });
    DPDU_SetMode.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 3, 'DPDU_SetMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_DlHeaderShort(x.slice(0, 2));
        this.mode = x[2];
    };
    DPDU_SetMode.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(3);
        this.header.toBuffer().copy(y);
        y[2] = this.mode;
        return y;
    };
    return DPDU_SetMode;
}(utils_1.PDUTemplate));
exports.DPDU_SetMode = DPDU_SetMode;
var DPDU_ReqConf = /** @class */ (function (_super) {
    __extends(DPDU_ReqConf, _super);
    function DPDU_ReqConf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DPDU_ReqConf.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DPDUType.REQUEST_CONFIGURATION, 'DPDU_ReqConf.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DPDU_ReqConf.prototype, "paramIDs", {
        get: function () {
            return this._props.paramIDs;
        },
        // *** paramIDs ***
        set: function (x) {
            var paramIDsLength = x.length;
            assert.ok(paramIDsLength <= 20, 'DPDU_ReqConf.paramIDs: Invalid length!');
            var _x = [];
            for (var i in x) {
                assert.ok(x[i] in constants_1.E_ParameterId, 'DPDU_ReqConf.paramIDs: Invalid value!');
                _x.push(constants_1.E_ParameterId[i]);
            }
            this._props.paramIDs = x;
            this._props._paramIDs = _x;
        },
        enumerable: true,
        configurable: true
    });
    DPDU_ReqConf.prototype.setFromBuffer = function (x) {
        var l = x.length;
        assert.ok((2 <= l) && (l <= 22), 'DPDU_ReqConf.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_DlHeaderShort(x.slice(0, 2));
        var paramIDs = [];
        for (var i = 2; i < l; i++) {
            paramIDs.push(x[i]);
        }
        this.paramIDs = paramIDs;
    };
    DPDU_ReqConf.prototype.toBuffer = function () {
        var paramIDsLength = this.paramIDs.length;
        var y = Buffer.allocUnsafe(2 + paramIDsLength);
        this.header.toBuffer().copy(y);
        for (var i = 0; i < paramIDsLength; i++) {
            y[2 + i] = this.paramIDs[i];
        }
        return y;
    };
    return DPDU_ReqConf;
}(utils_1.PDUTemplate));
exports.DPDU_ReqConf = DPDU_ReqConf;
var DPDU_SOSMode = /** @class */ (function (_super) {
    __extends(DPDU_SOSMode, _super);
    function DPDU_SOSMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DPDU_SOSMode.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok((x.type === constants_1.E_DPDUType.START_SOS_MODE) || (x.type === constants_1.E_DPDUType.STOP_SOS_MODE), 'DPDU_SOSMode.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    DPDU_SOSMode.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'DPDU_SOSMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_DlHeaderShort(x);
    };
    DPDU_SOSMode.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return DPDU_SOSMode;
}(utils_1.PDUTemplate));
exports.DPDU_SOSMode = DPDU_SOSMode;
var DPDU_SetParam = /** @class */ (function (_super) {
    __extends(DPDU_SetParam, _super);
    function DPDU_SetParam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DPDU_SetParam.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DPDUType.SET_PARAM, 'DPDU_SetParam.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DPDU_SetParam.prototype, "params", {
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
    DPDU_SetParam.prototype.setFromBuffer = function (x) {
        var paramsLength = (x.length - 2) / 5;
        assert.ok([1, 2, 3, 4, 5].includes(paramsLength), 'DPDU_SetParam.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_DlHeaderShort(x.slice(0, 2));
        var params = [];
        for (var i = 0; i < paramsLength; i++) {
            params.push(new CPDU_1.CPDU_Parameter(x.slice(2 + (i * 5), 7 + (i * 5))));
        }
        this.params = params;
    };
    DPDU_SetParam.prototype.toBuffer = function () {
        var paramsLength = this.params.length;
        var y = Buffer.allocUnsafe(2 + (paramsLength * 5));
        this.header.toBuffer().copy(y);
        for (var i = 0; i < paramsLength; i++) {
            this.params[i].toBuffer().copy(y, 2 + (i * 5));
        }
        return y;
    };
    return DPDU_SetParam;
}(utils_1.PDUTemplate));
exports.DPDU_SetParam = DPDU_SetParam;
var DPDU_DebugCmd = /** @class */ (function (_super) {
    __extends(DPDU_DebugCmd, _super);
    function DPDU_DebugCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DPDU_DebugCmd.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_DPDUType.DEBUG_COMMAND, 'DPDU_DebugCmd.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DPDU_DebugCmd.prototype, "debugCmd", {
        get: function () {
            return this._props.debugCmd;
        },
        // *** debugCmd ***
        set: function (x) {
            assert.ok(x in constants_1.E_DebugCmd, 'DPDU_DebugCmd.debugCmd: Invalid value!');
            this._props.debugCmd = x;
            this._props._debugCmd = constants_1.E_DebugCmd[x];
        },
        enumerable: true,
        configurable: true
    });
    DPDU_DebugCmd.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 3, 'DPDU_DebugCmd.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_DlHeaderShort(x.slice(0, 2));
        this.debugCmd = x[2];
    };
    DPDU_DebugCmd.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(3);
        this.header.toBuffer().copy(y);
        y[2] = this.debugCmd;
        return y;
    };
    return DPDU_DebugCmd;
}(utils_1.PDUTemplate));
exports.DPDU_DebugCmd = DPDU_DebugCmd;
exports.decodeDlMsg = function (buf) {
    var msg;
    switch (buf[0]) {
        case constants_1.E_DPDUType.POSITION_ON_DEMAND:
            msg = new DPDU_PosOnDem(buf);
            break;
        case constants_1.E_DPDUType.SET_MODE:
            msg = new DPDU_SetMode(buf);
            break;
        case constants_1.E_DPDUType.REQUEST_CONFIGURATION:
            msg = new DPDU_ReqConf(buf);
            break;
        case constants_1.E_DPDUType.START_SOS_MODE:
        case constants_1.E_DPDUType.STOP_SOS_MODE:
            msg = new DPDU_SOSMode(buf);
            break;
        case constants_1.E_DPDUType.SET_PARAM:
            msg = new DPDU_SetParam(buf);
            break;
        case constants_1.E_DPDUType.DEBUG_COMMAND:
            msg = new DPDU_DebugCmd(buf);
            break;
        default:
            msg = undefined;
            break;
    }
    if (msg) {
        return msg.toComponents();
    }
    else {
        return { error: "Unknown message type: " + constants_1.E_UPDUType[buf[0]] };
    }
};
exports.createDPDU = function (x) {
    var buf;
    if (typeof (x) == 'string') {
        buf = Buffer.from(x, 'hex');
    }
    else {
        buf = x;
    }
    var dpdu;
    switch (buf[0]) {
        case constants_1.E_DPDUType.POSITION_ON_DEMAND:
            dpdu = new DPDU_PosOnDem(buf);
            break;
        case constants_1.E_DPDUType.SET_MODE:
            dpdu = new DPDU_SetMode(buf);
            break;
        case constants_1.E_DPDUType.REQUEST_CONFIGURATION:
            dpdu = new DPDU_ReqConf(buf);
            break;
        case constants_1.E_DPDUType.START_SOS_MODE:
        case constants_1.E_DPDUType.STOP_SOS_MODE:
            dpdu = new DPDU_SOSMode(buf);
            break;
        case constants_1.E_DPDUType.SET_PARAM:
            dpdu = new DPDU_SetParam(buf);
            break;
        case constants_1.E_DPDUType.DEBUG_COMMAND:
            dpdu = new DPDU_DebugCmd(buf);
            break;
        default:
            dpdu = undefined;
            break;
    }
    return dpdu;
};
//# sourceMappingURL=DPDU.js.map