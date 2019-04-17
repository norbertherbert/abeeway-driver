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
var Param_ConfigFlags = /** @class */ (function (_super) {
    __extends(Param_ConfigFlags, _super);
    function Param_ConfigFlags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Param_ConfigFlags.prototype, "BLEAdvertisingActive", {
        get: function () {
            return this._props.BLEAdvertisingActive;
        },
        // *** BLEAdvertisingActive ***
        set: function (x) {
            this._props.BLEAdvertisingActive = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param_ConfigFlags.prototype, "WiFiPayloadCyphered", {
        get: function () {
            return this._props.WiFiPayloadCyphered;
        },
        // *** WiFiPayloadCyphered ***
        set: function (x) {
            this._props.WiFiPayloadCyphered = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param_ConfigFlags.prototype, "ConfigReqsAcknoledged", {
        get: function () {
            return this._props.ConfigReqsAcknoledged;
        },
        // *** ConfigReqsAcknoledged ***
        set: function (x) {
            this._props.ConfigReqsAcknoledged = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param_ConfigFlags.prototype, "DoubleShortButtonPressForSOS", {
        get: function () {
            return this._props.DoubleShortButtonPressForSOS;
        },
        // *** DoubleShortButtonPressForSOS ***
        set: function (x) {
            this._props.DoubleShortButtonPressForSOS = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param_ConfigFlags.prototype, "LongButtonPressToSwitchOff", {
        get: function () {
            return this._props.LongButtonPressToSwitchOff;
        },
        // *** LongButtonPressToSwitchOff ***
        set: function (x) {
            this._props.LongButtonPressToSwitchOff = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param_ConfigFlags.prototype, "FramePendingMechanismActive", {
        get: function () {
            return this._props.FramePendingMechanismActive;
        },
        // *** FramePendingMechanismActive ***
        set: function (x) {
            this._props.FramePendingMechanismActive = x;
        },
        enumerable: true,
        configurable: true
    });
    Param_ConfigFlags.prototype.setFromValue = function (x) {
        assert.ok(utils_1.isUint8(x), 'Param_ConfigFlags.setFromValue(): Invalid value!');
        this.BLEAdvertisingActive = (x & 32) === 32;
        this.WiFiPayloadCyphered = (x & 16) === 16;
        this.ConfigReqsAcknoledged = (x & 8) === 8;
        this.DoubleShortButtonPressForSOS = (x & 4) === 4;
        this.LongButtonPressToSwitchOff = (x & 2) === 2;
        this.FramePendingMechanismActive = (x & 1) === 1;
    };
    Param_ConfigFlags.prototype.toValue = function () {
        var y = 0;
        y |= this.BLEAdvertisingActive ? 32 : 0;
        y |= this.WiFiPayloadCyphered ? 16 : 0;
        y |= this.ConfigReqsAcknoledged ? 8 : 0;
        y |= this.DoubleShortButtonPressForSOS ? 4 : 0;
        y |= this.LongButtonPressToSwitchOff ? 2 : 0;
        y |= this.FramePendingMechanismActive ? 1 : 0;
        return y;
    };
    return Param_ConfigFlags;
}(utils_1.ValueTempl));
exports.Param_ConfigFlags = Param_ConfigFlags;
var Status = /** @class */ (function (_super) {
    __extends(Status, _super);
    function Status() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Status.prototype, "operatingMode", {
        get: function () {
            return this._props.operatingMode;
        },
        // *** operatingMode ***
        set: function (x) {
            assert.ok(x in constants_1.E_OperatingMode, 'Status.operatingMode: invalid value');
            this._props.operatingMode = x;
            this._props._operatingMode = constants_1.E_OperatingMode[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "sosState", {
        get: function () {
            return this._props.sosState;
        },
        // *** sosState ***
        set: function (x) {
            this._props.sosState = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "trackingState", {
        get: function () {
            return this._props.trackingState;
        },
        // *** trackingState ***
        set: function (x) {
            this._props.trackingState = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "movingState", {
        get: function () {
            return this._props.movingState;
        },
        // *** trackingState ***
        set: function (x) {
            this._props.movingState = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "periodicPositionMessage", {
        get: function () {
            return this._props.periodicPositionMessage;
        },
        // *** periodicPositionMessage ***
        set: function (x) {
            this._props.periodicPositionMessage = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "positionOnDemandMessage", {
        get: function () {
            return this._props.positionOnDemandMessage;
        },
        // *** positionOnDemandMessage ***
        set: function (x) {
            this._props.positionOnDemandMessage = x;
        },
        enumerable: true,
        configurable: true
    });
    Status.prototype.setFromValue = function (x) {
        assert.ok(utils_1.isUint8(x), 'Status.setFromValue(): Invalid value!');
        this.operatingMode = (x >>> 5);
        this.sosState = (x & 16) === 16;
        this.trackingState = (x & 8) === 8;
        this.movingState = (x & 4) === 4;
        this.periodicPositionMessage = (x & 2) === 2;
        this.positionOnDemandMessage = (x & 1) === 1;
    };
    Status.prototype.toValue = function () {
        var y = 0;
        y = this.operatingMode << 5;
        y |= this.sosState ? 16 : 0;
        y |= this.trackingState ? 8 : 0;
        y |= this.movingState ? 4 : 0;
        y |= this.periodicPositionMessage ? 2 : 0;
        y |= this.positionOnDemandMessage ? 1 : 0;
        return y;
    };
    return Status;
}(utils_1.ValueTempl));
exports.Status = Status;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Header.prototype, "type", {
        get: function () {
            return this._props.type;
        },
        // *** type ***
        // TODO: header should be read only!!!
        set: function (x) {
            assert.ok(x in constants_1.E_UlMsgType, 'Header.type: invalid value');
            this._props.type = x;
            this._props._type = constants_1.E_UlMsgType[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "status", {
        get: function () {
            return this._props.status;
        },
        // *** status ***
        set: function (x) {
            this._props.status = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "battery", {
        get: function () {
            return this._props.battery;
        },
        // *** battery ***
        set: function (x) {
            assert.ok((2.8 <= x) && (x <= 4.2), 'Header.battery: Invalid value!');
            this._props.battery = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "temperature", {
        get: function () {
            return this._props.temperature;
        },
        // *** temperature ***
        set: function (x) {
            assert.ok((-44 <= x) && (x <= 85), 'Header.temperature: Invalid value!');
            this._props.temperature = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "ackToken", {
        get: function () {
            return this._props.ackToken;
        },
        // *** ackToken ***
        set: function (x) {
            assert.ok((x & 0x0f) === x, 'Header.ackToken: Invalid value!');
            this._props.ackToken = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Header.prototype, "optData", {
        get: function () {
            return this._props.optData;
        },
        // *** optData ***
        set: function (x) {
            assert.ok((x & 0x0f) === x, 'Header.optData: invalid value');
            switch (this.type) {
                case constants_1.E_UlMsgType.POSITION:
                    assert.ok(x in constants_1.E_PositionInformation, 'Header.optData: invalid value');
                    this._props.optData = x;
                    this._props._optData = constants_1.E_PositionInformation[x];
                    break;
                default:
                    this._props.optData = x;
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    Header.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 5, 'Header.setFromBuffer(): Invalid buffer legth!');
        // this.type = x[0];
        assert.ok(x[0] in constants_1.E_UlMsgType, 'Header.type: invalid value');
        this._props.type = x[0];
        this._props._type = constants_1.E_UlMsgType[x[0]];
        this.status = new Status(x[1]);
        this.battery = utils_1.mt_value_decode(x[2], 2.8, 4.2, 8, 2);
        this.temperature = utils_1.mt_value_decode(x[3], -44.0, 85.0, 8, 0);
        this.ackToken = x[4] >>> 4;
        this.optData = x[4] & 0x0f;
    };
    Header.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(5);
        y[0] = this.type;
        y[1] = this.status.toValue();
        y[2] = utils_1.mt_value_encode(this.battery, 2.8, 4.2, 8, 2);
        y[3] = utils_1.mt_value_encode(this.temperature, -44.0, 85.0, 8, 0);
        y[4] = (this.ackToken << 4) | this.optData;
        return y;
    };
    return Header;
}(utils_1.BufferTempl));
exports.Header = Header;
var UlHeaderShort = /** @class */ (function (_super) {
    __extends(UlHeaderShort, _super);
    function UlHeaderShort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlHeaderShort.prototype, "type", {
        get: function () {
            return this._props.type;
        },
        // *** type ***
        set: function (x) {
            assert.ok(x in constants_1.E_UlMsgType, 'UlHeaderShort.type: invalid value');
            this._props.type = x;
            this._props._type = constants_1.E_UlMsgType[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlHeaderShort.prototype, "ackToken", {
        get: function () {
            return this._props.ackToken;
        },
        // *** ackToken ***
        set: function (x) {
            assert.ok((x & 0x0f) === x, 'UlHeaderShort.ackToken: Invalid value!');
            this._props.ackToken = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlHeaderShort.prototype, "optData", {
        get: function () {
            return this._props.optData;
        },
        // *** optData ***
        set: function (x) {
            assert.ok((x & 0x0f) === x, 'UlHeaderShort.optData: invalid value');
            this._props.optData = x;
        },
        enumerable: true,
        configurable: true
    });
    UlHeaderShort.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'UlHeaderShort.setFromBuffer(): Invalid buffer legth!');
        this.type = x[0];
        this.ackToken = x[1] >>> 4;
        this.optData = x[1] & 0x0f;
    };
    UlHeaderShort.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(2);
        y[0] = this.type;
        y[1] = (this.ackToken << 4) | this.optData;
        return y;
    };
    return UlHeaderShort;
}(utils_1.BufferTempl));
exports.UlHeaderShort = UlHeaderShort;
var DlHeaderShort = /** @class */ (function (_super) {
    __extends(DlHeaderShort, _super);
    function DlHeaderShort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DlHeaderShort.prototype, "type", {
        get: function () {
            return this._props.type;
        },
        // *** type ***
        set: function (x) {
            assert.ok(x in constants_1.E_DlMsgType, 'DlHeaderShort.type: invalid value');
            this._props.type = x;
            this._props._type = constants_1.E_DlMsgType[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DlHeaderShort.prototype, "ackToken", {
        get: function () {
            return this._props.ackToken;
        },
        // *** ackToken ***
        set: function (x) {
            assert.ok((x & 0x0f) === x, 'DlHeaderShort.ackToken: Invalid value!');
            this._props.ackToken = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DlHeaderShort.prototype, "optData", {
        get: function () {
            return this._props.optData;
        },
        // *** optData ***
        set: function (x) {
            assert.ok((x & 0x0f) === x, 'DlHeaderShort.optData: invalid value');
            this._props.optData = x;
        },
        enumerable: true,
        configurable: true
    });
    DlHeaderShort.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'DlHeaderShort.setFromBuffer(): Invalid buffer legth!');
        this.type = x[0];
        this.ackToken = x[1] >>> 4;
        this.optData = x[1] & 0x0f;
    };
    DlHeaderShort.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(2);
        y[0] = this.type;
        y[1] = (this.ackToken << 4) | this.optData;
        return y;
    };
    return DlHeaderShort;
}(utils_1.BufferTempl));
exports.DlHeaderShort = DlHeaderShort;
var WiFiBSSIDs = /** @class */ (function (_super) {
    __extends(WiFiBSSIDs, _super);
    function WiFiBSSIDs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WiFiBSSIDs.prototype, "bssid", {
        get: function () {
            return this._props.bssid;
        },
        // *** bssid ***
        set: function (x) {
            assert.ok(x.match(/^[0-9A-Fa-f]{12}$/), 'WiFiBSSIDs.bssid: Invalid value!');
            this._props.bssid = x.toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WiFiBSSIDs.prototype, "rssi", {
        get: function () {
            return this._props.rssi;
        },
        // *** rssi ***
        set: function (x) {
            assert.ok((-0x7f <= x) && (x <= 0x7f), 'WiFiBSSIDs.rssi: Invalid value!');
            this._props.rssi = x;
        },
        enumerable: true,
        configurable: true
    });
    WiFiBSSIDs.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 7, 'WiFiBSSIDs.setFromBuffer(): Invalid buffer legth!');
        this.bssid = x.slice(0, 6).toString('hex');
        this.rssi = x.readInt8(6);
    };
    WiFiBSSIDs.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(7);
        for (var i = 0; i < 6; i++) {
            var s = this.bssid;
            y[i] = parseInt(s.substring(2 * i, 2 * (i + 1)), 16);
        }
        y.writeInt8(this.rssi, 6);
        return y;
    };
    return WiFiBSSIDs;
}(utils_1.BufferTempl));
exports.WiFiBSSIDs = WiFiBSSIDs;
var Parameter = /** @class */ (function (_super) {
    __extends(Parameter, _super);
    function Parameter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Parameter.prototype, "id", {
        get: function () {
            return this._props.id;
        },
        // *** id ***
        set: function (x) {
            assert.ok(x in constants_1.E_ParameterId, 'Parameter.id: Invalid value!');
            this._props.id = x;
            this._props._id = constants_1.E_ParameterId[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "value", {
        get: function () {
            switch (this.id) {
                case constants_1.E_ParameterId.CONFIG_FLAGS:
                    return this._props.value;
                    break;
                default:
                    return this._props.value;
                    break;
            }
        },
        // *** value ***
        set: function (x) {
            switch (this.id) {
                case constants_1.E_ParameterId.CONFIG_FLAGS:
                    this._props.value = new Param_ConfigFlags(x);
                    break;
                default:
                    this._props.value = x;
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    Parameter.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 5, 'Parameter.setFromBuffer(): Invalid buffer legth!');
        this.id = x[0];
        switch (this.id) {
            case constants_1.E_ParameterId.CONFIG_FLAGS:
                this.value = new Param_ConfigFlags(x[4]);
                break;
            default:
                this.value = (x[1] << 24) + (x[2] << 16) + (x[3] << 8) + x[4];
                break;
        }
    };
    Parameter.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(5);
        y[0] = this.id;
        switch (this.id) {
            case constants_1.E_ParameterId.CONFIG_FLAGS:
                y[1] = 0;
                y[2] = 0;
                y[3] = 0;
                y[4] = (this.value).toValue();
                break;
            default:
                var v = this.value;
                y[1] = (v >> 24) & 0xff;
                y[2] = (v >> 16) & 0xff;
                y[3] = (v >> 8) & 0xff;
                y[4] = (v) & 0xff;
                break;
        }
        return y;
    };
    return Parameter;
}(utils_1.BufferTempl));
exports.Parameter = Parameter;
//# sourceMappingURL=msg-components.js.map