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
var buffer_1 = require("buffer");
/* Constants */
var constants_1 = require("./constants");
/* Utils */
var utils_1 = require("./utils");
var CPDU_ParamConfigFlags = /** @class */ (function (_super) {
    __extends(CPDU_ParamConfigFlags, _super);
    function CPDU_ParamConfigFlags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "AsymmetricBLEPairingRejected", {
        get: function () {
            return this._props.AsymmetricBLEPairingRejected;
        },
        // *** AsymmetricBLEPairingRejected ***
        set: function (x) {
            this._props.AsymmetricBLEPairingRejected = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "NewJoinReqOnLeavingOffMode", {
        get: function () {
            return this._props.NewJoinReqOnLeavingOffMode;
        },
        // *** NewJoinReqOnLeavingOffMode ***
        set: function (x) {
            this._props.NewJoinReqOnLeavingOffMode = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "MotionEndMessageEnabled", {
        get: function () {
            return this._props.MotionEndMessageEnabled;
        },
        // *** MotionEndMessageEnabled ***
        set: function (x) {
            this._props.MotionEndMessageEnabled = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "MotionStartMessageEnabled", {
        get: function () {
            return this._props.MotionStartMessageEnabled;
        },
        // *** MotionStartMessageEnabled ***
        set: function (x) {
            this._props.MotionStartMessageEnabled = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "LedBlinksOnGPSFix", {
        get: function () {
            return this._props.LedBlinksOnGPSFix;
        },
        // *** LedBlinksOnGPSFix ***
        set: function (x) {
            this._props.LedBlinksOnGPSFix = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "WiFiScanWhenGeolocStarts", {
        get: function () {
            return this._props.WiFiScanWhenGeolocStarts;
        },
        // *** WiFiScanWhenGeolocStarts ***
        set: function (x) {
            this._props.WiFiScanWhenGeolocStarts = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "BLEAdvertisingActive", {
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
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "WiFiPayloadCyphered", {
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
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "ConfigReqsAcknoledged", {
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
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "DoubleShortButtonPressForSOS", {
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
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "LongButtonPressToSwitchOff", {
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
    Object.defineProperty(CPDU_ParamConfigFlags.prototype, "FramePendingMechanismActive", {
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
    CPDU_ParamConfigFlags.prototype.setFromValue = function (x) {
        assert.ok(utils_1.isUint16(x), 'CPDU_ParamConfigFlags.setFromValue(): Invalid value!');
        this.AsymmetricBLEPairingRejected = (x & 2048) === 2048;
        this.NewJoinReqOnLeavingOffMode = (x & 1024) === 1024;
        this.MotionEndMessageEnabled = (x & 512) === 512;
        this.MotionStartMessageEnabled = (x & 256) === 256;
        this.LedBlinksOnGPSFix = (x & 128) === 128;
        this.WiFiScanWhenGeolocStarts = (x & 64) === 64;
        this.BLEAdvertisingActive = (x & 32) === 32;
        this.WiFiPayloadCyphered = (x & 16) === 16;
        this.ConfigReqsAcknoledged = (x & 8) === 8;
        this.DoubleShortButtonPressForSOS = (x & 4) === 4;
        this.LongButtonPressToSwitchOff = (x & 2) === 2;
        this.FramePendingMechanismActive = (x & 1) === 1;
    };
    CPDU_ParamConfigFlags.prototype.toValue = function () {
        var y = 0;
        y |= this.AsymmetricBLEPairingRejected ? 2048 : 0;
        y |= this.NewJoinReqOnLeavingOffMode ? 1024 : 0;
        y |= this.MotionEndMessageEnabled ? 512 : 0;
        y |= this.MotionStartMessageEnabled ? 256 : 0;
        y |= this.LedBlinksOnGPSFix ? 128 : 0;
        y |= this.WiFiScanWhenGeolocStarts ? 64 : 0;
        y |= this.BLEAdvertisingActive ? 32 : 0;
        y |= this.WiFiPayloadCyphered ? 16 : 0;
        y |= this.ConfigReqsAcknoledged ? 8 : 0;
        y |= this.DoubleShortButtonPressForSOS ? 4 : 0;
        y |= this.LongButtonPressToSwitchOff ? 2 : 0;
        y |= this.FramePendingMechanismActive ? 1 : 0;
        return y;
    };
    return CPDU_ParamConfigFlags;
}(utils_1.PDUTemplate));
exports.CPDU_ParamConfigFlags = CPDU_ParamConfigFlags;
var CPDU_ParamConfirmedUlBitmap = /** @class */ (function (_super) {
    __extends(CPDU_ParamConfirmedUlBitmap, _super);
    function CPDU_ParamConfirmedUlBitmap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CPDU_ParamConfirmedUlBitmap.prototype, "FramePending", {
        get: function () {
            return this._props.FramePending;
        },
        // *** FramePending ***
        set: function (x) {
            this._props.FramePending = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfirmedUlBitmap.prototype, "Position", {
        get: function () {
            return this._props.Position;
        },
        // *** Position ***
        set: function (x) {
            this._props.Position = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfirmedUlBitmap.prototype, "EnergyStatus", {
        get: function () {
            return this._props.EnergyStatus;
        },
        // *** EnergyStatus ***
        set: function (x) {
            this._props.EnergyStatus = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfirmedUlBitmap.prototype, "HeartBeat", {
        get: function () {
            return this._props.HeartBeat;
        },
        // *** HeartBeat ***
        set: function (x) {
            this._props.HeartBeat = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfirmedUlBitmap.prototype, "ActivityOrConfig", {
        get: function () {
            return this._props.ActivityOrConfig;
        },
        // *** ActivityOrConfig ***
        set: function (x) {
            this._props.ActivityOrConfig = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_ParamConfirmedUlBitmap.prototype, "Shutdown", {
        get: function () {
            return this._props.Shutdown;
        },
        // *** Shutdown ***
        set: function (x) {
            this._props.Shutdown = x;
        },
        enumerable: true,
        configurable: true
    });
    CPDU_ParamConfirmedUlBitmap.prototype.setFromValue = function (x) {
        assert.ok(utils_1.isUint16(x), 'CPDU_ParamConfirmedUlBitmap.setFromValue(): Invalid value!');
        this.FramePending = ((x >> constants_1.E_UPDUType.FRAME_PENDING) & 1) === 1;
        this.Position = ((x >> constants_1.E_UPDUType.POSITION) & 1) === 1;
        this.EnergyStatus = ((x >> constants_1.E_UPDUType.ENERGY_STATUS) & 1) === 1;
        this.HeartBeat = ((x >> constants_1.E_UPDUType.HEART_BEAT) & 1) === 1;
        this.ActivityOrConfig = ((x >> constants_1.E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT) & 1) === 1;
        this.Shutdown = ((x >> constants_1.E_UPDUType.SHUTDOWN) & 1) === 1;
    };
    CPDU_ParamConfirmedUlBitmap.prototype.toValue = function () {
        var y = 0;
        y |= this.FramePending ? (1 << constants_1.E_UPDUType.FRAME_PENDING) : 0;
        y |= this.Position ? (1 << constants_1.E_UPDUType.POSITION) : 0;
        y |= this.EnergyStatus ? (1 << constants_1.E_UPDUType.ENERGY_STATUS) : 0;
        y |= this.HeartBeat ? (1 << constants_1.E_UPDUType.HEART_BEAT) : 0;
        y |= this.ActivityOrConfig ? (1 << constants_1.E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT) : 0;
        y |= this.Shutdown ? (1 << constants_1.E_UPDUType.SHUTDOWN) : 0;
        return y;
    };
    return CPDU_ParamConfirmedUlBitmap;
}(utils_1.PDUTemplate));
exports.CPDU_ParamConfirmedUlBitmap = CPDU_ParamConfirmedUlBitmap;
var CPDU_Status = /** @class */ (function (_super) {
    __extends(CPDU_Status, _super);
    function CPDU_Status() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CPDU_Status.prototype, "operatingMode", {
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
    Object.defineProperty(CPDU_Status.prototype, "sosState", {
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
    Object.defineProperty(CPDU_Status.prototype, "reservedBit", {
        get: function () {
            return this._props.trackingState;
        },
        // *** reservedBit ***
        set: function (x) {
            this._props.trackingState = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_Status.prototype, "movingState", {
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
    Object.defineProperty(CPDU_Status.prototype, "periodicPositionMessage", {
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
    Object.defineProperty(CPDU_Status.prototype, "positionOnDemandMessage", {
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
    CPDU_Status.prototype.setFromValue = function (x) {
        assert.ok(utils_1.isUint8(x), 'Status.setFromValue(): Invalid value!');
        this.operatingMode = (x >>> 5);
        this.sosState = (x & 16) === 16;
        this.reservedBit = (x & 8) === 8;
        this.movingState = (x & 4) === 4;
        this.periodicPositionMessage = (x & 2) === 2;
        this.positionOnDemandMessage = (x & 1) === 1;
    };
    CPDU_Status.prototype.toValue = function () {
        var y = 0;
        y = this.operatingMode << 5;
        y |= this.sosState ? 16 : 0;
        y |= this.reservedBit ? 8 : 0;
        y |= this.movingState ? 4 : 0;
        y |= this.periodicPositionMessage ? 2 : 0;
        y |= this.positionOnDemandMessage ? 1 : 0;
        return y;
    };
    return CPDU_Status;
}(utils_1.PDUTemplate));
exports.CPDU_Status = CPDU_Status;
var CPDU_Header = /** @class */ (function (_super) {
    __extends(CPDU_Header, _super);
    function CPDU_Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CPDU_Header.prototype, "type", {
        get: function () {
            return this._props.type;
        },
        // *** type ***
        // TODO: header should be read only!!!
        set: function (x) {
            assert.ok(x in constants_1.E_UPDUType, 'Header.type: invalid value');
            this._props.type = x;
            this._props._type = constants_1.E_UPDUType[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_Header.prototype, "status", {
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
    Object.defineProperty(CPDU_Header.prototype, "battery", {
        get: function () {
            return this._props.battery;
        },
        // *** battery ***
        set: function (x) {
            if (typeof x == "number") {
                assert.ok((2.8 <= x) && (x <= 4.2), 'Header.battery: Invalid value!');
            }
            else {
                assert.ok((x == "MAINS_POWER") || (x == "NOT_AVAILABLE"), 'Header.battery: Invalid value!');
            }
            this._props.battery = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_Header.prototype, "temperature", {
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
    Object.defineProperty(CPDU_Header.prototype, "ackToken", {
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
    Object.defineProperty(CPDU_Header.prototype, "optData", {
        get: function () {
            return this._props.optData;
        },
        // *** optData ***
        set: function (x) {
            assert.ok((x & 0x0f) === x, 'Header.optData: invalid value');
            switch (this.type) {
                case constants_1.E_UPDUType.POSITION:
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
    CPDU_Header.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 5, 'Header.setFromBuffer(): Invalid buffer legth!');
        // this.type = x[0];
        assert.ok(x[0] in constants_1.E_UPDUType, 'Header.type: invalid value');
        this._props.type = x[0];
        this._props._type = constants_1.E_UPDUType[x[0]];
        this.status = new CPDU_Status(x[1]);
        if (x[2] == 0x00) {
            this.battery = "MAINS_POWER";
        }
        else if (x[2] == 0xff) {
            this.battery = "NOT_AVAILABLE";
        }
        else {
            this.battery = utils_1.mt_value_decode(x[2], 2.8, 4.2, 8, 2);
        }
        this.temperature = utils_1.mt_value_decode(x[3], -44.0, 85.0, 8, 0);
        this.ackToken = x[4] >>> 4;
        this.optData = x[4] & 0x0f;
    };
    CPDU_Header.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(5);
        y[0] = this.type;
        y[1] = this.status.toValue();
        if (this.battery == "MAINS_POWER") {
            y[2] = 0x00;
        }
        if (this.battery == "NOT_AVAILABLE") {
            y[2] = 0xff;
        }
        else if (typeof this.battery == "number") {
            y[2] = utils_1.mt_value_encode(this.battery, 2.8, 4.2, 8, 2);
        }
        y[3] = utils_1.mt_value_encode(this.temperature, -44.0, 85.0, 8, 0);
        y[4] = (this.ackToken << 4) | this.optData;
        return y;
    };
    return CPDU_Header;
}(utils_1.PDUTemplate));
exports.CPDU_Header = CPDU_Header;
var CPDU_UlHeaderShort = /** @class */ (function (_super) {
    __extends(CPDU_UlHeaderShort, _super);
    function CPDU_UlHeaderShort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CPDU_UlHeaderShort.prototype, "type", {
        get: function () {
            return this._props.type;
        },
        // *** type ***
        set: function (x) {
            assert.ok(x in constants_1.E_UPDUType, 'UlHeaderShort.type: invalid value');
            this._props.type = x;
            this._props._type = constants_1.E_UPDUType[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_UlHeaderShort.prototype, "ackToken", {
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
    Object.defineProperty(CPDU_UlHeaderShort.prototype, "optData", {
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
    CPDU_UlHeaderShort.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'UlHeaderShort.setFromBuffer(): Invalid buffer legth!');
        this.type = x[0];
        this.ackToken = x[1] >>> 4;
        this.optData = x[1] & 0x0f;
    };
    CPDU_UlHeaderShort.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(2);
        y[0] = this.type;
        y[1] = (this.ackToken << 4) | this.optData;
        return y;
    };
    return CPDU_UlHeaderShort;
}(utils_1.PDUTemplate));
exports.CPDU_UlHeaderShort = CPDU_UlHeaderShort;
var CPDU_DlHeaderShort = /** @class */ (function (_super) {
    __extends(CPDU_DlHeaderShort, _super);
    function CPDU_DlHeaderShort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CPDU_DlHeaderShort.prototype, "type", {
        get: function () {
            return this._props.type;
        },
        // *** type ***
        set: function (x) {
            assert.ok(x in constants_1.E_DPDUType, 'DlHeaderShort.type: invalid value');
            this._props.type = x;
            this._props._type = constants_1.E_DPDUType[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_DlHeaderShort.prototype, "ackToken", {
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
    CPDU_DlHeaderShort.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'DlHeaderShort.setFromBuffer(): Invalid buffer legth!');
        this.type = x[0];
        this.ackToken = x[1];
    };
    CPDU_DlHeaderShort.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(2);
        y[0] = this.type;
        y[1] = this.ackToken;
        return y;
    };
    return CPDU_DlHeaderShort;
}(utils_1.PDUTemplate));
exports.CPDU_DlHeaderShort = CPDU_DlHeaderShort;
var CPDU_WiFiBSSIDs = /** @class */ (function (_super) {
    __extends(CPDU_WiFiBSSIDs, _super);
    function CPDU_WiFiBSSIDs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CPDU_WiFiBSSIDs.prototype, "bssid", {
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
    Object.defineProperty(CPDU_WiFiBSSIDs.prototype, "rssi", {
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
    CPDU_WiFiBSSIDs.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 7, 'WiFiBSSIDs.setFromBuffer(): Invalid buffer legth!');
        this.bssid = x.slice(0, 6).toString('hex');
        this.rssi = x.readInt8(6);
    };
    CPDU_WiFiBSSIDs.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(7);
        for (var i = 0; i < 6; i++) {
            var s = this.bssid;
            y[i] = parseInt(s.substring(2 * i, 2 * (i + 1)), 16);
        }
        y.writeInt8(this.rssi, 6);
        return y;
    };
    return CPDU_WiFiBSSIDs;
}(utils_1.PDUTemplate));
exports.CPDU_WiFiBSSIDs = CPDU_WiFiBSSIDs;
var CPDU_BLEBeaconIDs = /** @class */ (function (_super) {
    __extends(CPDU_BLEBeaconIDs, _super);
    function CPDU_BLEBeaconIDs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CPDU_BLEBeaconIDs.prototype, "beaconid", {
        get: function () {
            return this._props.beaconid;
        },
        // *** beaconid ***
        set: function (x) {
            assert.ok(x.match(/^[0-9A-Fa-f]{12}$/), 'CPDU_BLEBeaconIDs.beaconid: Invalid value!');
            this._props.beaconid = x.toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CPDU_BLEBeaconIDs.prototype, "rssi", {
        get: function () {
            return this._props.rssi;
        },
        // *** rssi ***
        set: function (x) {
            assert.ok((-0x7f <= x) && (x <= 0x7f), 'CPDU_BLEBeaconIDs.rssi: Invalid value!');
            this._props.rssi = x;
        },
        enumerable: true,
        configurable: true
    });
    CPDU_BLEBeaconIDs.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 7, 'CPDU_BLEBeaconIDs.setFromBuffer(): Invalid buffer legth!');
        this.beaconid = x.slice(0, 6).toString('hex');
        this.rssi = x.readInt8(6);
    };
    CPDU_BLEBeaconIDs.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(7);
        for (var i = 0; i < 6; i++) {
            var s = this.beaconid;
            y[i] = parseInt(s.substring(2 * i, 2 * (i + 1)), 16);
        }
        y.writeInt8(this.rssi, 6);
        return y;
    };
    return CPDU_BLEBeaconIDs;
}(utils_1.PDUTemplate));
exports.CPDU_BLEBeaconIDs = CPDU_BLEBeaconIDs;
var CPDU_Parameter = /** @class */ (function (_super) {
    __extends(CPDU_Parameter, _super);
    function CPDU_Parameter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CPDU_Parameter.prototype, "id", {
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
    Object.defineProperty(CPDU_Parameter.prototype, "value", {
        get: function () {
            return this._props.value;
        },
        // *** value ***
        set: function (x) {
            var paramKey = constants_1.E_ParameterId[this.id];
            var ERR_MSG = 'Parameter ' + paramKey + ' has invalid value.';
            if (x instanceof CPDU_ParamConfirmedUlBitmap) {
                assert.ok((paramKey === 'CONFIRMED_UL_BITMAP'), ERR_MSG);
                this._props.value = x;
            }
            else if (x instanceof CPDU_ParamConfigFlags) {
                assert.ok((paramKey === 'CONFIG_FLAGS'), ERR_MSG);
                this._props.value = x;
            }
            else if ((typeof x === 'string')) {
                assert.ok((paramKey === 'BLE_VERSION') || (paramKey === 'FIRMWARE_VERSION'), ERR_MSG);
                this._props.value = x;
            }
            else if (typeof x === 'number') {
                assert.ok(x === Math.floor(x));
                switch (this.id) {
                    case constants_1.E_ParameterId.GEOLOC_SENSOR:
                        assert.ok(x in constants_1.E_Param_GeolocSensor, ERR_MSG);
                        this._props.value = x;
                        this._props._value = constants_1.E_Param_GeolocSensor[x];
                        break;
                    case constants_1.E_ParameterId.GEOLOC_METHOD:
                        assert.ok(x in constants_1.E_Param_GeolocMethod, ERR_MSG);
                        this._props.value = x;
                        this._props._value = constants_1.E_Param_GeolocMethod[x];
                        break;
                    case constants_1.E_ParameterId.TRANSMIT_STRAT:
                        assert.ok(x in constants_1.E_Param_TransmitStrat, ERR_MSG);
                        this._props.value = x;
                        this._props._value = constants_1.E_Param_TransmitStrat[x];
                        break;
                    case constants_1.E_ParameterId.PERIODIC_POS_PERIOD:
                    case constants_1.E_ParameterId.PERIODIC_ACTIVITY_PERIOD:
                    case constants_1.E_ParameterId.PW_STAT_PERIOD:
                        if (((x < constants_1.C_ParamDescriptions[paramKey].min) || (x > constants_1.C_ParamDescriptions[paramKey].max)) && (x !== 0)) {
                            throw (new Error(ERR_MSG));
                        }
                        this._props.value = x;
                        break;
                    default:
                        if ((x < constants_1.C_ParamDescriptions[paramKey].min) || (x > constants_1.C_ParamDescriptions[paramKey].max)) {
                            throw (new Error(ERR_MSG));
                        }
                        this._props.value = x;
                }
            }
            else {
                throw (new Error(ERR_MSG));
            }
        },
        enumerable: true,
        configurable: true
    });
    CPDU_Parameter.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 5, 'Parameter.setFromBuffer(): Invalid buffer legth!');
        this.id = x[0];
        switch (this.id) {
            case constants_1.E_ParameterId.CONFIRMED_UL_BITMAP:
                this.value = new CPDU_ParamConfirmedUlBitmap((x[3] << 8) + x[4]);
                break;
            case constants_1.E_ParameterId.CONFIG_FLAGS:
                this.value = new CPDU_ParamConfigFlags((x[3] << 8) + x[4]);
                break;
            default:
                this.value = (x[1] << 24) + (x[2] << 16) + (x[3] << 8) + x[4];
                break;
        }
    };
    CPDU_Parameter.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(5);
        y[0] = this.id;
        var v;
        switch (this.id) {
            case constants_1.E_ParameterId.CONFIRMED_UL_BITMAP:
                v = (this.value).toValue();
                break;
            case constants_1.E_ParameterId.CONFIG_FLAGS:
                v = (this.value).toValue();
                break;
            default:
                v = this.value;
                break;
        }
        y[1] = (v >> 24) & 0xff;
        y[2] = (v >> 16) & 0xff;
        y[3] = (v >> 8) & 0xff;
        y[4] = (v) & 0xff;
        return y;
    };
    return CPDU_Parameter;
}(utils_1.PDUTemplate));
exports.CPDU_Parameter = CPDU_Parameter;
//# sourceMappingURL=CPDU.js.map