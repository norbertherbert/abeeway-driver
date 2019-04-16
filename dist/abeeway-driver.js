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
var abeeway_driver_constants_1 = require("./abeeway-driver-constants");
exports.E_UlMsgType = abeeway_driver_constants_1.E_UlMsgType;
exports.E_Tag = abeeway_driver_constants_1.E_Tag;
exports.E_OperatingMode = abeeway_driver_constants_1.E_OperatingMode;
exports.E_PositionInformation = abeeway_driver_constants_1.E_PositionInformation;
exports.E_WiFiFailure = abeeway_driver_constants_1.E_WiFiFailure;
exports.E_BLEFailure = abeeway_driver_constants_1.E_BLEFailure;
exports.E_DlMsgType = abeeway_driver_constants_1.E_DlMsgType;
exports.E_DebugCmd = abeeway_driver_constants_1.E_DebugCmd;
exports.E_GPSTimeoutCause = abeeway_driver_constants_1.E_GPSTimeoutCause;
exports.E_ParameterId = abeeway_driver_constants_1.E_ParameterId;
exports.C_ParameterId = abeeway_driver_constants_1.C_ParameterId;
exports.E_Param_GeolocSensor = abeeway_driver_constants_1.E_Param_GeolocSensor;
exports.E_Param_GeolocMethod = abeeway_driver_constants_1.E_Param_GeolocMethod;
exports.E_Param_TransmitStrat = abeeway_driver_constants_1.E_Param_TransmitStrat;
// ***************************************************************
// *** Constants *************************************************
// ***************************************************************
// export enum E_UlMsgType {
//     FRAME_PENDING                = 0x00,
//     POSITION                     = 0x03,
//     ENERGY_STATUS                = 0x04,
//     HEART_BEAT                   = 0x05,
//     ACTIVITY_OR_CONFIG           = 0x07,
//     SHUTDOWN                     = 0x09,
//     DEBUG                        = 0xff,
// }
// export enum E_Tag {
//     ACTIVITY                     = 0x01,
//     CONFIG                       = 0x02,
// }
// export enum E_OperatingMode {
//     STANDBY                      = 0x00,
//     MOTION_TRACKING              = 0x01,
//     PERMANENT_TRACKING           = 0x02,
//     START_END_TRACKING           = 0x03,
//     ACTIVITY_TRACKING            = 0x04,
//     OFF                          = 0x05,
// }
// export enum E_PositionInformation {
//     GPS_FIX                      = 0x00,
//     GPS_TIMEOUT                  = 0x01,
//     NO_MORE_USED                 = 0x02,
//     WIFI_TIMEOUT                 = 0x03,
//     WIFI_FAILURE                 = 0x04,
//     LPGPS_DATA1                  = 0x05,
//     LPGPS_DATA2                  = 0x06,
//     BLE_BACON_SCAN               = 0x07,
//     BLE_BACON_FAILURE            = 0x08,
//     WIFI_BSSIDS                  = 0x09,
// }
// export enum E_WiFiFailure {
//     CONNECTION_FAILURE           = 0x00,
//     SCAN_FAILURE                 = 0x01,
//     ANTENNA_UNAVAILABLE          = 0x02,
//     WIFI_NOT_SUPPORTED           = 0x03,
// }
// export enum E_BLEFailure {
//     BLE_IS_NOT_RESPONDING        = 0x00,
//     INTERNAL_ERROR               = 0x01,
//     SHARED_ANTENNA_NOT_AVAILABLE = 0x02,
//     SCAN_ALREADY_ONGOING         = 0x03,
//     NO_BEACON_DETECTED           = 0x04,
//     HARDWARE_INCOMPATIBILITY     = 0x05,
// }
// export enum E_DlMsgType {
//     POSITION_ON_DEMAND           = 0x01,
//     SET_MODE                     = 0x02,
//     REQUEST_CONFIGURATION        = 0x03,
//     START_SOS_MODE               = 0x04,
//     STOP_SOS_MODE                = 0x05,
//     SET_PARAM                    = 0x0b,
//     DEBUG_COMMAND                = 0xff,
// }
// export enum E_DebugCmd {
//     RESET_DEVICE                 = 0x01,
//     BLE_BOND_REMOVE              = 0x02,
// }
// export enum E_GPSTimeoutCause {
//     USER_TIMEOUT                 = 0x00,
// }
// export enum E_ParameterId {
//     UL_PERIOD                    = 0x00, // s, 60-86400
//     LORA_PERIOD                  = 0x01, // s, 300-86400
//     PW_STAT_PERIOD               = 0x02, // s, 0 | 300-604800
//     PERIODIC_POS_PERIOD          = 0x03, // s, 0 | 900-604800
//     GEOLOC_SENSOR                = 0x05, // E_Param_GeolocSensor
//     GEOLOC_METHOD                = 0x06, // E_Param_GeolocMethod
//     MOTION_NB_POS                = 0x08, // 1-60
//     GPS_TIMEOUT                  = 0x09, // s, 3-300
//     AGPS_TIMEOUT                 = 0x0a, // s, 30-250
//     GPS_EHPE                     = 0x0b, // s, 0-100
//     GPS_CONVERGENCE              = 0x0c, // s, 0-300
//     CONFIG_FLAGS                 = 0x0d, // Param_ConfigFlags
//     TRANSMIT_STRAT               = 0x0e, // E_Param_TransmitStrat (0-4)
//     BLE_BEACON_COUNT             = 0x0f, // 1-4
//     BLE_BEACON_TIMEOUT           = 0x10, // s, 1-5
//     GPS_STANDBY_TIMEOUT          = 0x11, // s, 10-7200
//     //TODO: what is this?
//     CONFIRMED_UL_BITMAP          = 0x12, // 0x00-0xffff
//     CONFIRMED_UL_RETRY           = 0x13, // 0-8
// }
// const C_ParameterId = {
//     0x00: { name: 'UL_PERIOD',            unit:'s', min: 60,   max: 86400  },
//     0x01: { name: 'LORA_PERIOD',          unit:'s', min: 300,  max: 86400  },
//     0x02: { name: 'PW_STAT_PERIOD',       unit:'s', min: 300,  max: 604800 },
//     0x03: { name: 'PERIODIC_POS_PERIOD',  unit:'s', min: 900,  max: 604800 },
//     0x05: { name: 'GEOLOC_SENSOR',        unit:'',  min: 0x00, max: 0x10   }, // E_Param_GeolocSensor
//     0x06: { name: 'GEOLOC_METHOD',        unit:'',  min: 0x00, max: 0x05   }, // E_Param_GeolocMethod
//     0x08: { name: 'MOTION_NB_POS',        unit:'',  min: 1,    max: 60     },
//     0x09: { name: 'GPS_TIMEOUT',          unit:'s', min: 3,    max: 300    },
//     0x0a: { name: 'AGPS_TIMEOUT',         unit:'s', min: 30,   max: 250    },
//     0x0b: { name: 'GPS_EHPE',             unit:'s', min: 0,    max: 100    },
//     0x0c: { name: 'GPS_CONVERGENCE',      unit:'s', min: 0,    max: 300    },
//     0x0d: { name: 'CONFIG_FLAGS',         unit:'',  min: 0x00, max: 0xff   }, // Param_ConfigFlags
//     0x0e: { name: 'TRANSMIT_STRAT',       unit:'',  min: 0x00, max: 0x04   }, // E_Param_TransmitStrat (0-4)
//     0x0f: { name: 'BLE_BEACON_COUNT',     unit:'',  min: 1,    max: 4      },
//     0x10: { name: 'BLE_BEACON_TIMEOUT',   unit:'s', min: 1,    max: 5      },
//     0x11: { name: 'GPS_STANDBY_TIMEOUT',  unit:'s', min: 10,   max: 7200   },
//     0x12: { name: 'CONFIRMED_UL_BITMAP',  unit:'',  min: 0x00, max: 0xffff },
//     0x13: { name: 'CONFIRMED_UL_RETRY',   unit:'',  min: 0,    max: 8      },
// }
// export enum E_Param_GeolocSensor {
//     WiFi                        = 0x00,
//     GPS                         = 0x01,
//     LPGPS                       = 0x02,
//     WiFiLPGPSGPS                = 0x05,
//     WiFiGPS                     = 0x06,
//     WiFiLPGPS                   = 0x07,
//     WiFiLPGPS_WiFiGPS_WiFiLPGPS = 0x09,
//     BLE                         = 0x10,
// }
// export enum E_Param_GeolocMethod {
//     WiFi                        = 0x00,
//     GPS                         = 0x01,
//     LPGPS                       = 0x02,
//     WiFiGPS                     = 0x03,
//     WiFiLPGPS                   = 0x04,
//     BLE                         = 0x05,
// }
// export enum E_Param_TransmitStrat {
//     SINGLE_FIXED                = 0x00,
//     SINGLE_RANDOM               = 0x01,
//     DUAL_RANDOM                 = 0x02,
//     DUAL_FIXED                  = 0x03,
//     NETWORK_ADR                 = 0x04,
// }
// ***************************************************************
// *** Utility functions *****************************************
// ***************************************************************
var step_size = function (lo, hi, nbits, nresv) {
    return 1.0 / ((((1 << nbits) - 1) - nresv) / (hi - lo));
};
exports.mt_value_decode = function (value, lo, hi, nbits, nresv) {
    return Math.round(10000 * (lo + (value - nresv / 2) * step_size(lo, hi, nbits, nresv))) / 10000;
};
exports.mt_value_encode = function (value, lo, hi, nbits, nresv) {
    return Math.round(((value - lo) / step_size(lo, hi, nbits, nresv)) + nresv / 2);
};
var isUint8 = function (x) {
    return (x & 0xff) === x;
};
var ValueTempl = /** @class */ (function () {
    function ValueTempl(x) {
        this._props = {};
        if (typeof x === 'number') {
            this.setFromValue(x);
        }
        else {
            this.setFromComponents(x);
        }
    }
    ValueTempl.prototype.setFromValue = function (x) {
    };
    ValueTempl.prototype.toValue = function () {
        return 0;
    };
    ValueTempl.prototype.setFromComponents = function (x) {
        for (var key in x) {
            this[key] = x[key];
        }
    };
    ValueTempl.prototype.toComponents = function () {
        var y = {};
        for (var key in this._props) {
            if (Array.isArray(this._props[key])) {
                var arr = [];
                for (var _i = 0, _a = this._props[key]; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (typeof element === 'object') {
                        arr.push(element.toComponents());
                    }
                    else {
                        arr.push(element);
                    }
                }
                y[key] = arr;
            }
            else if (typeof this._props[key] === 'object') {
                y[key] = this._props[key].toComponents();
            }
            else {
                y[key] = this._props[key];
            }
        }
        return y;
    };
    ValueTempl.prototype.toJSON = function () {
        return JSON.stringify(this.toComponents(), null, 4);
    };
    return ValueTempl;
}());
var BufferTempl = /** @class */ (function () {
    function BufferTempl(x) {
        this._props = {};
        if (x instanceof Buffer) {
            this.setFromBuffer(x);
        }
        else {
            this.setFromComponents(x);
        }
    }
    BufferTempl.prototype.setFromBuffer = function (x) {
    };
    BufferTempl.prototype.toBuffer = function () {
        return Buffer.allocUnsafe(0);
    };
    BufferTempl.prototype.setFromComponents = function (x) {
        for (var key in x) {
            this[key] = x[key];
        }
    };
    BufferTempl.prototype.toComponents = function () {
        var y = {};
        for (var key in this._props) {
            if (Array.isArray(this._props[key])) {
                var arr = [];
                for (var _i = 0, _a = this._props[key]; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (typeof element === 'object') {
                        arr.push(element.toComponents());
                    }
                    else {
                        arr.push(element);
                    }
                }
                y[key] = arr;
            }
            else if (this._props[key] instanceof Buffer) {
                y[key] = this._props[key].toString('hex');
            }
            else if (typeof this._props[key] === 'object') {
                y[key] = this._props[key].toComponents();
            }
            else {
                y[key] = this._props[key];
            }
        }
        return y;
    };
    BufferTempl.prototype.toJSON = function () {
        return JSON.stringify(this.toComponents(), null, 4);
    };
    return BufferTempl;
}());
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
        assert.ok(isUint8(x), 'Param_ConfigFlags.setFromValue(): Invalid value!');
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
}(ValueTempl));
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
            assert.ok(x in abeeway_driver_constants_1.E_OperatingMode, 'Status.operatingMode: invalid value');
            this._props.operatingMode = x;
            this._props._operatingMode = abeeway_driver_constants_1.E_OperatingMode[x];
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
        assert.ok(isUint8(x), 'Status.setFromValue(): Invalid value!');
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
}(ValueTempl));
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
            assert.ok(x in abeeway_driver_constants_1.E_UlMsgType, 'Header.type: invalid value');
            this._props.type = x;
            this._props._type = abeeway_driver_constants_1.E_UlMsgType[x];
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
                case abeeway_driver_constants_1.E_UlMsgType.POSITION:
                    assert.ok(x in abeeway_driver_constants_1.E_PositionInformation, 'Header.optData: invalid value');
                    this._props.optData = x;
                    this._props._optData = abeeway_driver_constants_1.E_PositionInformation[x];
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
        assert.ok(x[0] in abeeway_driver_constants_1.E_UlMsgType, 'Header.type: invalid value');
        this._props.type = x[0];
        this._props._type = abeeway_driver_constants_1.E_UlMsgType[x[0]];
        this.status = new Status(x[1]);
        this.battery = exports.mt_value_decode(x[2], 2.8, 4.2, 8, 2);
        this.temperature = exports.mt_value_decode(x[3], -44.0, 85.0, 8, 0);
        this.ackToken = x[4] >>> 4;
        this.optData = x[4] & 0x0f;
    };
    Header.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(5);
        y[0] = this.type;
        y[1] = this.status.toValue();
        y[2] = exports.mt_value_encode(this.battery, 2.8, 4.2, 8, 2);
        y[3] = exports.mt_value_encode(this.temperature, -44.0, 85.0, 8, 0);
        y[4] = (this.ackToken << 4) | this.optData;
        return y;
    };
    return Header;
}(BufferTempl));
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
            assert.ok(x in abeeway_driver_constants_1.E_UlMsgType, 'UlHeaderShort.type: invalid value');
            this._props.type = x;
            this._props._type = abeeway_driver_constants_1.E_UlMsgType[x];
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
}(BufferTempl));
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
            assert.ok(x in abeeway_driver_constants_1.E_DlMsgType, 'DlHeaderShort.type: invalid value');
            this._props.type = x;
            this._props._type = abeeway_driver_constants_1.E_DlMsgType[x];
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
}(BufferTempl));
exports.DlHeaderShort = DlHeaderShort;
var UlMsg_FramePending = /** @class */ (function (_super) {
    __extends(UlMsg_FramePending, _super);
    function UlMsg_FramePending() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_FramePending.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.FRAME_PENDING, 'UlMsg_FramePending.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_FramePending.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'UlMsg_FramePending.setFromBuffer(): Invalid buffer legth!');
        this.header = new UlHeaderShort(x);
    };
    UlMsg_FramePending.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UlMsg_FramePending;
}(BufferTempl));
exports.UlMsg_FramePending = UlMsg_FramePending;
var UlMsg_PosGPSFix = /** @class */ (function (_super) {
    __extends(UlMsg_PosGPSFix, _super);
    function UlMsg_PosGPSFix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_PosGPSFix.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.POSITION, 'UlMsg_PosGPSFix.header: Invalid MessageType!');
            assert.ok(x.optData === abeeway_driver_constants_1.E_PositionInformation.GPS_FIX, 'UlMsg_PosGPSFix.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosGPSFix.prototype, "age", {
        get: function () {
            return this._props.age;
        },
        // *** age ***
        set: function (x) {
            assert.ok((0 <= x) && (x <= 2040), 'UlMsg_PosGPSFix.age: Invalid value!');
            this._props.age = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosGPSFix.prototype, "latitude", {
        get: function () {
            return this._props.latitude;
        },
        // *** latitude ***
        set: function (x) {
            assert.ok((-90 <= x) && (x <= 90), 'UlMsg_PosGPSFix.latitude: Invalid value!');
            this._props.latitude = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosGPSFix.prototype, "longitude", {
        get: function () {
            return this._props.longitude;
        },
        // *** longitude ***
        set: function (x) {
            assert.ok((-180 <= x) && (x <= 180), 'UlMsg_PosGPSFix.longitude: Invalid value!');
            this._props.longitude = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosGPSFix.prototype, "ehpe", {
        get: function () {
            return this._props.ehpe;
        },
        // *** ehpe ***
        set: function (x) {
            assert.ok((0 <= x) && (x <= 1000), 'UlMsg_PosGPSFix.ehpe: Invalid value!');
            this._props.ehpe = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosGPSFix.prototype, "encryptedPos", {
        get: function () {
            return this._props.encryptedPos;
        },
        // *** encrypted ***
        set: function (x) {
            assert.ok(x.length === 3, 'UlMsg_PosGPSFix.encryptedPos: Invalid Buffer length!');
            this._props.encryptedPos = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_PosGPSFix.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 16, 'UlMsg_PosGPSFix.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        this.age = exports.mt_value_decode(x[5], 0, 2040, 8, 0);
        var l;
        l = (x[6] << 24) | (x[7] << 16) | (x[8] << 8);
        if (l > 0x7fffffff)
            l -= 0x100000000;
        this.latitude = l / 10000000;
        l = (x[9] << 24) | (x[10] << 16) | (x[11] << 8);
        if (l > 0x7fffffff)
            l -= 0x100000000;
        this.longitude = l / 10000000;
        this.ehpe = exports.mt_value_decode(x[12], 0, 1000, 8, 0);
        this.encryptedPos = Buffer.from(x.slice(13, 16));
    };
    UlMsg_PosGPSFix.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(16);
        this.header.toBuffer().copy(y);
        y[5] = exports.mt_value_encode(this.age, 0, 2040, 8, 0);
        var l;
        l = Math.round(this.latitude * 10000000);
        if (l < 0) {
            l += 0x100000000;
        }
        y[6] = (l >> 24) & 0xff;
        y[7] = (l >> 16) & 0xff;
        y[8] = (l >> 8) & 0xff;
        l = Math.round(this.longitude * 10000000);
        if (l < 0) {
            l += 0x100000000;
        }
        ;
        y[9] = (l >> 24) & 0xff;
        y[10] = (l >> 16) & 0xff;
        y[11] = (l >> 8) & 0xff;
        y[12] = exports.mt_value_encode(this.ehpe, 0, 1000, 8, 0);
        this.encryptedPos.copy(y, 13);
        return y;
    };
    return UlMsg_PosGPSFix;
}(BufferTempl));
exports.UlMsg_PosGPSFix = UlMsg_PosGPSFix;
var UlMsg_PosGPSTimeout = /** @class */ (function (_super) {
    __extends(UlMsg_PosGPSTimeout, _super);
    function UlMsg_PosGPSTimeout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_PosGPSTimeout.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.POSITION, 'UlMsg_PosGPSTimeout.header: Invalid MessageType!');
            assert.ok(x.optData === abeeway_driver_constants_1.E_PositionInformation.GPS_TIMEOUT, 'UlMsg_PosGPSTimeout.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosGPSTimeout.prototype, "cause", {
        get: function () {
            return this._props.cause;
        },
        // *** cause ***
        set: function (x) {
            assert.ok(x in abeeway_driver_constants_1.E_GPSTimeoutCause, 'UlMsg_PosGPSTimeout.cause: invalid value');
            this._props.cause = x;
            this._props._cause = abeeway_driver_constants_1.E_GPSTimeoutCause[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosGPSTimeout.prototype, "carrierOverNoise", {
        get: function () {
            return this._props.carrierOverNoise;
        },
        // *** carrierOverNoise ***
        set: function (x) {
            for (var i = 0; i < 4; i++) {
                assert.ok((0 <= x[i]) && (x[i] <= 2040), 'UlMsg_PosGPSTimeout.carrierOverNoise: invalid value');
            }
            this._props.carrierOverNoise = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_PosGPSTimeout.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 10, 'UlMsg_PosGPSTimeout.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        this.cause = x[5];
        var carrierOverNoise = [];
        for (var i = 0; i < 4; i++) {
            carrierOverNoise.push(exports.mt_value_decode(x[6 + i], 0, 2040, 8, 0));
        }
        this.carrierOverNoise = carrierOverNoise;
    };
    UlMsg_PosGPSTimeout.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(10);
        this.header.toBuffer().copy(y);
        y[5] = this.cause;
        for (var i = 0; i < 4; i++) {
            y[6 + i] = exports.mt_value_encode(this.carrierOverNoise[i], 0, 2040, 8, 0);
        }
        return y;
    };
    return UlMsg_PosGPSTimeout;
}(BufferTempl));
exports.UlMsg_PosGPSTimeout = UlMsg_PosGPSTimeout;
var UlMsg_PosWiFiTimeout = /** @class */ (function (_super) {
    __extends(UlMsg_PosWiFiTimeout, _super);
    function UlMsg_PosWiFiTimeout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_PosWiFiTimeout.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.POSITION, 'UlMsg_PosWiFiTimeout.header: Invalid MessageType!');
            assert.ok(x.optData === abeeway_driver_constants_1.E_PositionInformation.WIFI_TIMEOUT, 'UlMsg_PosWiFiTimeout.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosWiFiTimeout.prototype, "v_bat", {
        get: function () {
            return this._props.v_bat;
        },
        // *** v_bat ***
        set: function (x) {
            for (var i = 0; i < 6; i++) {
                assert.ok((2.8 <= x[i]) && (x[i] <= 4.2), 'UlMsg_PosWiFiTimeout.v_bat: invalid value');
            }
            this._props.v_bat = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_PosWiFiTimeout.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 11, 'UlMsg_PosWiFiTimeout.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        var v_bat = [];
        for (var i = 0; i < 6; i++) {
            v_bat.push(exports.mt_value_decode(x[5 + i], 2.8, 4.2, 8, 2));
        }
        this.v_bat = v_bat;
    };
    UlMsg_PosWiFiTimeout.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(11);
        this.header.toBuffer().copy(y);
        for (var i = 0; i < 6; i++) {
            y[5 + i] = exports.mt_value_encode(this.v_bat[i], 2.8, 4.2, 8, 2);
        }
        return y;
    };
    return UlMsg_PosWiFiTimeout;
}(BufferTempl));
exports.UlMsg_PosWiFiTimeout = UlMsg_PosWiFiTimeout;
var UlMsg_PosWiFiFailure = /** @class */ (function (_super) {
    __extends(UlMsg_PosWiFiFailure, _super);
    function UlMsg_PosWiFiFailure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_PosWiFiFailure.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.POSITION, 'UlMsg_PosWiFiFailure.header: Invalid MessageType!');
            assert.ok(x.optData === abeeway_driver_constants_1.E_PositionInformation.WIFI_FAILURE, 'UlMsg_PosWiFiFailure.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosWiFiFailure.prototype, "v_bat", {
        get: function () {
            return this._props.v_bat;
        },
        // *** v_bat ***
        set: function (x) {
            for (var i = 0; i < 6; i++) {
                assert.ok((2.8 <= x[i]) && (x[i] <= 4.2), 'UlMsg_PosWiFiFailure.v_bat: invalid value');
            }
            this._props.v_bat = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosWiFiFailure.prototype, "error", {
        get: function () {
            return this._props.error;
        },
        // *** error ***
        set: function (x) {
            assert.ok(x in abeeway_driver_constants_1.E_WiFiFailure, 'UlMsg_PosWiFiFailure.error: invalid value');
            this._props.error = x;
            this._props._error = abeeway_driver_constants_1.E_WiFiFailure[x];
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_PosWiFiFailure.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 12, 'UlMsg_PosWiFiFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        var v_bat = [];
        for (var i = 0; i < 6; i++) {
            v_bat.push(exports.mt_value_decode(x[5 + i], 2.8, 4.2, 8, 2));
        }
        this.v_bat = v_bat;
        this.error = x[11];
    };
    UlMsg_PosWiFiFailure.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(12);
        this.header.toBuffer().copy(y);
        for (var i = 0; i < 6; i++) {
            y[5 + i] = exports.mt_value_encode(this.v_bat[i], 2.8, 4.2, 8, 2);
        }
        y[11] = this.error;
        return y;
    };
    return UlMsg_PosWiFiFailure;
}(BufferTempl));
exports.UlMsg_PosWiFiFailure = UlMsg_PosWiFiFailure;
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
}(BufferTempl));
exports.WiFiBSSIDs = WiFiBSSIDs;
var UlMsg_PosWiFiBSSIDs = /** @class */ (function (_super) {
    __extends(UlMsg_PosWiFiBSSIDs, _super);
    function UlMsg_PosWiFiBSSIDs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_PosWiFiBSSIDs.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.POSITION, 'UlMsg_PosWiFiBSSIDs.header: Invalid MessageType!');
            assert.ok(x.optData === abeeway_driver_constants_1.E_PositionInformation.WIFI_BSSIDS, 'UlMsg_PosWiFiBSSIDs.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosWiFiBSSIDs.prototype, "age", {
        get: function () {
            return this._props.age;
        },
        // *** age ***
        set: function (x) {
            assert.ok((0 <= x) && (x <= 2040), 'UlMsg_PosWiFiBSSIDs.age: Invalid value!');
            this._props.age = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosWiFiBSSIDs.prototype, "wifiHotspots", {
        get: function () {
            return this._props.wifiHotspots;
        },
        // *** wifiHotspots ***
        set: function (x) {
            assert.ok(x.length === 4, 'UlMsg_PosWiFiBSSIDs.wifiHotspots: Invalid value!');
            this._props.wifiHotspots = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_PosWiFiBSSIDs.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 34, 'UlMsg_PosWiFiBSSIDs.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        this.age = exports.mt_value_decode(x[5], 0, 2040, 8, 0);
        var wifiHotspots = [];
        for (var i = 0; i < 4; i++) {
            wifiHotspots.push(new WiFiBSSIDs(x.slice(6 + (i * 7), 13 + (i * 7))));
        }
        this.wifiHotspots = wifiHotspots;
    };
    UlMsg_PosWiFiBSSIDs.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(34);
        this.header.toBuffer().copy(y);
        y[5] = exports.mt_value_decode(this.age, 0, 2040, 8, 0);
        for (var i = 0; i < 4; i++) {
            this.wifiHotspots[i].toBuffer().copy(y, 6 + i * 7);
        }
        return y;
    };
    return UlMsg_PosWiFiBSSIDs;
}(BufferTempl));
exports.UlMsg_PosWiFiBSSIDs = UlMsg_PosWiFiBSSIDs;
var UlMsg_PosBLEFailure = /** @class */ (function (_super) {
    __extends(UlMsg_PosBLEFailure, _super);
    function UlMsg_PosBLEFailure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_PosBLEFailure.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.POSITION, 'UlMsg_PosBLEFailure.header: Invalid MessageType!');
            assert.ok(x.optData === abeeway_driver_constants_1.E_PositionInformation.BLE_BACON_FAILURE, 'UlMsg_PosBLEFailure.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_PosBLEFailure.prototype, "error", {
        get: function () {
            return this._props.error;
        },
        // *** error ***
        set: function (x) {
            assert.ok(x in abeeway_driver_constants_1.E_BLEFailure, 'UlMsg_PosBLEFailure.error: Invalid value!');
            this._props.error = x;
            this._props._error = abeeway_driver_constants_1.E_BLEFailure[x];
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_PosBLEFailure.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 6, 'UlMsg_PosBLEFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        this.error = x[5];
    };
    UlMsg_PosBLEFailure.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(6);
        this.header.toBuffer().copy(y);
        y[5] = this.error;
        return y;
    };
    return UlMsg_PosBLEFailure;
}(BufferTempl));
exports.UlMsg_PosBLEFailure = UlMsg_PosBLEFailure;
var UlMsg_EnergyStatus = /** @class */ (function (_super) {
    __extends(UlMsg_EnergyStatus, _super);
    function UlMsg_EnergyStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_EnergyStatus.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.ENERGY_STATUS, 'UlMsg_EnergyStatus.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_EnergyStatus.prototype, "gpsOnTime", {
        get: function () {
            return this._props.gpsOnTime;
        },
        // *** gpsOnTime ***
        set: function (x) {
            this._props.gpsOnTime = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_EnergyStatus.prototype, "gpsStabdbyTime", {
        get: function () {
            return this._props.gpsStabdbyTime;
        },
        // *** gpsStabdbyTime ***
        set: function (x) {
            this._props.gpsStabdbyTime = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_EnergyStatus.prototype, "wifiScans", {
        get: function () {
            return this._props.wifiScans;
        },
        // *** wifiScans ***
        set: function (x) {
            this._props.wifiScans = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_EnergyStatus.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 17, 'UlMsg_EnergyStatus.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        this.gpsOnTime = x.readUInt32BE(5);
        this.gpsStabdbyTime = x.readUInt32BE(9);
        this.wifiScans = x.readUInt32BE(13);
    };
    UlMsg_EnergyStatus.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(17);
        this.header.toBuffer().copy(y);
        y.writeUInt32BE(this.gpsOnTime, 5);
        y.writeUInt32BE(this.gpsStabdbyTime, 9);
        y.writeUInt32BE(this.wifiScans, 13);
        return y;
    };
    return UlMsg_EnergyStatus;
}(BufferTempl));
exports.UlMsg_EnergyStatus = UlMsg_EnergyStatus;
var UlMsg_HeartBeat = /** @class */ (function (_super) {
    __extends(UlMsg_HeartBeat, _super);
    function UlMsg_HeartBeat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_HeartBeat.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.HEART_BEAT, 'UlMsg_HeartBeat.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_HeartBeat.prototype, "cause", {
        get: function () {
            return this._props.cause;
        },
        // *** cause ***
        set: function (x) {
            this._props.cause = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_HeartBeat.prototype, "fwVersion", {
        get: function () {
            if ('fwVersion' in this._props) {
                return this._props.fwVersion;
            }
            return '';
        },
        // *** fwVersion ***
        set: function (x) {
            if (x === '') {
                if ('fwVersion' in this._props) {
                    delete this._props.fwVersion;
                }
            }
            else {
                assert.ok(x.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/), 'UlMsg_HeartBeat.fwVersion: invalid value!');
                var fwStrArray = x.split('.');
                var fwValArray = [];
                var fwVal = void 0;
                for (var i = 0; i < 3; i++) {
                    fwVal = parseInt(fwStrArray[i]);
                    assert.ok(isUint8(fwVal), 'UlMsg_HeartBeat.fwVersion: invalid value!');
                    fwValArray.push(fwVal);
                }
                this._props.fwVersion = fwValArray.join('.');
            }
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_HeartBeat.prototype.setFromBuffer = function (x) {
        var l = x.length;
        assert.ok([6, 9].includes(l), 'UlMsg_HeartBeat.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        this.cause = x[5];
        if (l === 9) {
            this.fwVersion = x.slice(6, 9).join('.');
        }
        else {
            this.fwVersion = '';
        }
    };
    UlMsg_HeartBeat.prototype.toBuffer = function () {
        var l = (this.fwVersion == '') ? 6 : 9;
        var y = Buffer.allocUnsafe(l);
        this.header.toBuffer().copy(y);
        y[5] = this.cause;
        if (l = 9) {
            var fwVersionArray = this.fwVersion.split('.');
            for (var i = 0; i < 3; i++) {
                y[6 + i] = parseInt(fwVersionArray[i]);
            }
        }
        return y;
    };
    return UlMsg_HeartBeat;
}(BufferTempl));
exports.UlMsg_HeartBeat = UlMsg_HeartBeat;
var UlMsg_ActivityStatus = /** @class */ (function (_super) {
    __extends(UlMsg_ActivityStatus, _super);
    function UlMsg_ActivityStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_ActivityStatus.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.ACTIVITY_OR_CONFIG, 'UlMsg_ActivityStatus.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_ActivityStatus.prototype, "tag", {
        get: function () {
            return this._props.tag;
        },
        // *** tag ***
        set: function (x) {
            assert.ok(x === abeeway_driver_constants_1.E_Tag.ACTIVITY, 'UlMsg_ActivityStatus.tag(): Invalid value!');
            this._props.tag = x;
            this._props._tag = abeeway_driver_constants_1.E_Tag[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_ActivityStatus.prototype, "activityCount", {
        get: function () {
            return this._props.activityCount;
        },
        // *** activityCount ***
        set: function (x) {
            assert.ok(x >= 0, 'UlMsg_ActivityStatus.activityCount(): Invalid value!');
            this._props.activityCount = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_ActivityStatus.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 10, 'UlMsg_ActivityStatus.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        this.tag = x[5];
        this.activityCount = x.readUInt32BE(6);
    };
    UlMsg_ActivityStatus.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(10);
        this.header.toBuffer().copy(y);
        y[5] = this.tag;
        y.writeUInt32BE(this.activityCount, 6);
        return y;
    };
    return UlMsg_ActivityStatus;
}(BufferTempl));
exports.UlMsg_ActivityStatus = UlMsg_ActivityStatus;
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
            assert.ok(x in abeeway_driver_constants_1.E_ParameterId, 'Parameter.id: Invalid value!');
            this._props.id = x;
            this._props._id = abeeway_driver_constants_1.E_ParameterId[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "value", {
        get: function () {
            switch (this.id) {
                case abeeway_driver_constants_1.E_ParameterId.CONFIG_FLAGS:
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
                case abeeway_driver_constants_1.E_ParameterId.CONFIG_FLAGS:
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
            case abeeway_driver_constants_1.E_ParameterId.CONFIG_FLAGS:
                this.value = new Param_ConfigFlags(x[4]);
                // this.value = new Param_ConfigFlags({
                //     BLEAdvertisingActive:                 (x[4] & 0b100000) === 0b100000,         // bit 5
                //     WiFiPayloadCyphered:                  (x[4] &  0b10000) ===  0b10000,         // bit 4
                //     ConfigReqsAcknoledged:                (x[4] &   0b1000) ===   0b1000,         // bit 3
                //     DoubleShortButtonPressForSOS:         (x[4] &    0b100) ===    0b100,         // bit 2
                //     LongButtonPressToSwitchOff:           (x[4] &     0b10) ===     0b10,         // bit 1
                //     FramePendingMechanismActive:          (x[4] &      0b1) ===      0b1,         // bit 0
                // });
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
            case abeeway_driver_constants_1.E_ParameterId.CONFIG_FLAGS:
                y[1] = 0;
                y[2] = 0;
                y[3] = 0;
                y[4] = (this.value).toValue();
                // let o:Param_ConfigFlags =<Param_ConfigFlags>this.value;
                // y[4] |= o.BLEAdvertisingActive         ? 0b100000 : 0;
                // y[4] |= o.WiFiPayloadCyphered          ? 0b10000 : 0;
                // y[4] |= o.ConfigReqsAcknoledged        ? 0b1000 : 0;
                // y[4] |= o.DoubleShortButtonPressForSOS ? 0b100 : 0;
                // y[4] |= o.LongButtonPressToSwitchOff   ? 0b10 : 0;
                // y[4] |= o.FramePendingMechanismActive  ? 0b1 : 0;
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
}(BufferTempl));
exports.Parameter = Parameter;
var UlMsg_ConfigReport = /** @class */ (function (_super) {
    __extends(UlMsg_ConfigReport, _super);
    function UlMsg_ConfigReport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_ConfigReport.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.ACTIVITY_OR_CONFIG, 'UlMsg_ConfigReport.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_ConfigReport.prototype, "tag", {
        get: function () {
            return this._props.tag;
        },
        // *** tag ***
        set: function (x) {
            assert.ok(x === abeeway_driver_constants_1.E_Tag.CONFIG, 'UlMsg_ConfigReport.tag(): Invalid value!');
            this._props.tag = x;
            this._props._tag = abeeway_driver_constants_1.E_Tag[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UlMsg_ConfigReport.prototype, "params", {
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
    UlMsg_ConfigReport.prototype.setFromBuffer = function (x) {
        var paramsLength = (x.length - 6) / 5;
        assert.ok([1, 2, 3, 4, 5].includes(paramsLength), 'UlMsg_ConfigReport.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0, 5));
        this.tag = x[5];
        var params = [];
        for (var i = 0; i < paramsLength; i++) {
            params.push(new Parameter(x.slice(6 + (i * 5), 11 + (i * 5))));
        }
        this.params = params;
    };
    UlMsg_ConfigReport.prototype.toBuffer = function () {
        var paramsLength = this.params.length;
        var y = Buffer.allocUnsafe(6 + (paramsLength * 5));
        this.header.toBuffer().copy(y);
        y[5] = this.tag;
        for (var i = 0; i < paramsLength; i++) {
            this.params[i].toBuffer().copy(y, 6 + (i * 5));
        }
        return y;
    };
    return UlMsg_ConfigReport;
}(BufferTempl));
exports.UlMsg_ConfigReport = UlMsg_ConfigReport;
var UlMsg_Shutdown = /** @class */ (function (_super) {
    __extends(UlMsg_Shutdown, _super);
    function UlMsg_Shutdown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_Shutdown.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.SHUTDOWN, 'UlMsg_Shutdown.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_Shutdown.prototype.setFromBuffer = function (x) {
        // assert.ok(x.length === 2, 'UlMsg_Shutdown.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of SHUTHDOWN messages
        this.header = new UlHeaderShort(x.slice(0, 2));
    };
    UlMsg_Shutdown.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UlMsg_Shutdown;
}(BufferTempl));
exports.UlMsg_Shutdown = UlMsg_Shutdown;
var UlMsg_Debug = /** @class */ (function (_super) {
    __extends(UlMsg_Debug, _super);
    function UlMsg_Debug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UlMsg_Debug.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === abeeway_driver_constants_1.E_UlMsgType.DEBUG, 'UlMsg_Debug.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_Debug.prototype.setFromBuffer = function (x) {
        // assert.ok(x.length === 2, 'UlMsg_Debug.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of DEBUG messages
        this.header = new UlHeaderShort(x.slice(0, 2));
    };
    UlMsg_Debug.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UlMsg_Debug;
}(BufferTempl));
exports.UlMsg_Debug = UlMsg_Debug;
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
            assert.ok(x.type === abeeway_driver_constants_1.E_DlMsgType.POSITION_ON_DEMAND, 'DlMsg_PosOnDem.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_PosOnDem.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'DlMsg_PosOnDem.setFromBuffer(): Invalid buffer legth!');
        this.header = new DlHeaderShort(x);
    };
    DlMsg_PosOnDem.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return DlMsg_PosOnDem;
}(BufferTempl));
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
            assert.ok(x.type === abeeway_driver_constants_1.E_DlMsgType.SET_MODE, 'DlMsg_SetMode.header: Invalid MessageType!');
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
            assert.ok(x in abeeway_driver_constants_1.E_OperatingMode, 'DlMsg_SetMode.mode: Invalid value!');
            this._props.mode = x;
            this._props._mode = abeeway_driver_constants_1.E_OperatingMode[x];
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_SetMode.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 3, 'DlMsg_SetMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new DlHeaderShort(x.slice(0, 2));
        this.mode = x[2];
    };
    DlMsg_SetMode.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(3);
        this.header.toBuffer().copy(y);
        y[2] = this.mode;
        return y;
    };
    return DlMsg_SetMode;
}(BufferTempl));
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
            assert.ok(x.type === abeeway_driver_constants_1.E_DlMsgType.REQUEST_CONFIGURATION, 'DlMsg_ReqConf.header: Invalid MessageType!');
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
                assert.ok(x[i] in abeeway_driver_constants_1.E_ParameterId, 'DlMsg_ReqConf.paramIDs: Invalid value!');
                _x.push(abeeway_driver_constants_1.E_ParameterId[i]);
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
        this.header = new DlHeaderShort(x.slice(0, 2));
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
}(BufferTempl));
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
            assert.ok((x.type === abeeway_driver_constants_1.E_DlMsgType.START_SOS_MODE) || (x.type === abeeway_driver_constants_1.E_DlMsgType.STOP_SOS_MODE), 'DlMsg_SOSMode.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_SOSMode.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'DlMsg_SOSMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new DlHeaderShort(x);
    };
    DlMsg_SOSMode.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return DlMsg_SOSMode;
}(BufferTempl));
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
            assert.ok(x.type === abeeway_driver_constants_1.E_DlMsgType.SET_PARAM, 'DlMsg_SetParam.header: Invalid MessageType!');
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
        this.header = new DlHeaderShort(x.slice(0, 2));
        var params = [];
        for (var i = 0; i < paramsLength; i++) {
            params.push(new Parameter(x.slice(2 + (i * 5), 7 + (i * 5))));
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
}(BufferTempl));
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
            assert.ok(x.type === abeeway_driver_constants_1.E_DlMsgType.DEBUG_COMMAND, 'DlMsg_DebugCmd.header: Invalid MessageType!');
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
            assert.ok(x in abeeway_driver_constants_1.E_DebugCmd, 'DlMsg_DebugCmd.debugCmd: Invalid value!');
            this._props.debugCmd = x;
            this._props._debugCmd = abeeway_driver_constants_1.E_DebugCmd[x];
        },
        enumerable: true,
        configurable: true
    });
    DlMsg_DebugCmd.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 3, 'DlMsg_DebugCmd.setFromBuffer(): Invalid buffer legth!');
        this.header = new DlHeaderShort(x.slice(0, 2));
        this.debugCmd = x[2];
    };
    DlMsg_DebugCmd.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(3);
        this.header.toBuffer().copy(y);
        y[2] = this.debugCmd;
        return y;
    };
    return DlMsg_DebugCmd;
}(BufferTempl));
exports.DlMsg_DebugCmd = DlMsg_DebugCmd;
exports.decodeUlMsg = function (buf) {
    var msg;
    switch (buf[0]) {
        case abeeway_driver_constants_1.E_UlMsgType.FRAME_PENDING:
            msg = new UlMsg_FramePending(buf);
            break;
        case abeeway_driver_constants_1.E_UlMsgType.POSITION:
            switch (buf[4] & 0xf) {
                case abeeway_driver_constants_1.E_PositionInformation.GPS_FIX:
                    msg = new UlMsg_PosGPSFix(buf);
                    break;
                case abeeway_driver_constants_1.E_PositionInformation.GPS_TIMEOUT:
                    msg = new UlMsg_PosGPSTimeout(buf);
                    break;
                case abeeway_driver_constants_1.E_PositionInformation.NO_MORE_USED:
                    msg = undefined;
                    break;
                case abeeway_driver_constants_1.E_PositionInformation.WIFI_TIMEOUT:
                    msg = new UlMsg_PosWiFiTimeout(buf);
                    break;
                case abeeway_driver_constants_1.E_PositionInformation.WIFI_FAILURE:
                    msg = new UlMsg_PosWiFiFailure(buf);
                    break;
                case abeeway_driver_constants_1.E_PositionInformation.LPGPS_DATA1:
                    msg = undefined;
                    break;
                case abeeway_driver_constants_1.E_PositionInformation.LPGPS_DATA2:
                    msg = undefined;
                    break;
                case abeeway_driver_constants_1.E_PositionInformation.BLE_BACON_SCAN:
                    msg = undefined; //new UlMsg_(buf);
                    break;
                case abeeway_driver_constants_1.E_PositionInformation.BLE_BACON_FAILURE:
                    msg = new UlMsg_PosBLEFailure(buf);
                    break;
                case abeeway_driver_constants_1.E_PositionInformation.WIFI_BSSIDS:
                    msg = new UlMsg_PosWiFiBSSIDs(buf);
                    break;
                default:
                    msg = undefined;
                    break;
            }
            break;
        case abeeway_driver_constants_1.E_UlMsgType.ENERGY_STATUS:
            msg = new UlMsg_EnergyStatus(buf);
            break;
        case abeeway_driver_constants_1.E_UlMsgType.HEART_BEAT:
            msg = new UlMsg_HeartBeat(buf);
            break;
        case abeeway_driver_constants_1.E_UlMsgType.ACTIVITY_OR_CONFIG:
            switch (buf[5]) {
                case abeeway_driver_constants_1.E_Tag.ACTIVITY:
                    msg = new UlMsg_ActivityStatus(buf);
                    break;
                case abeeway_driver_constants_1.E_Tag.CONFIG:
                    msg = new UlMsg_ConfigReport(buf);
                    break;
                default:
                    msg = undefined;
                    break;
            }
            break;
        case abeeway_driver_constants_1.E_UlMsgType.SHUTDOWN:
            msg = new UlMsg_Shutdown(buf);
            break;
        case abeeway_driver_constants_1.E_UlMsgType.DEBUG:
            msg = new UlMsg_Debug(buf);
            break;
        default:
            msg = undefined;
            break;
    }
    if (msg) {
        return msg.toJSON();
    }
    else {
        return JSON.stringify({ error: "Unknown message type: " + abeeway_driver_constants_1.E_UlMsgType[buf[0]] }, null, 4);
    }
};
exports.decodeDlMsg = function (buf) {
    var msg;
    switch (buf[0]) {
        case abeeway_driver_constants_1.E_DlMsgType.POSITION_ON_DEMAND:
            msg = new DlMsg_PosOnDem(buf);
            break;
        case abeeway_driver_constants_1.E_DlMsgType.SET_MODE:
            msg = new DlMsg_SetMode(buf);
            break;
        case abeeway_driver_constants_1.E_DlMsgType.REQUEST_CONFIGURATION:
            msg = new DlMsg_ReqConf(buf);
            break;
        case abeeway_driver_constants_1.E_DlMsgType.START_SOS_MODE:
        case abeeway_driver_constants_1.E_DlMsgType.STOP_SOS_MODE:
            msg = new DlMsg_SOSMode(buf);
            break;
        case abeeway_driver_constants_1.E_DlMsgType.SET_PARAM:
            msg = new DlMsg_SetParam(buf);
            break;
        case abeeway_driver_constants_1.E_DlMsgType.DEBUG_COMMAND:
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
        return JSON.stringify({ error: "Unknown message type: " + abeeway_driver_constants_1.E_UlMsgType[buf[0]] }, null, 4);
    }
};
//# sourceMappingURL=abeeway-driver.js.map