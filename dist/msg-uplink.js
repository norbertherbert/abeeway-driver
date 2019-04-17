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
            assert.ok(x.type === constants_1.E_UlMsgType.FRAME_PENDING, 'UlMsg_FramePending.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_FramePending.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'UlMsg_FramePending.setFromBuffer(): Invalid buffer legth!');
        this.header = new msg_components_1.UlHeaderShort(x);
    };
    UlMsg_FramePending.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UlMsg_FramePending;
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.POSITION, 'UlMsg_PosGPSFix.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.GPS_FIX, 'UlMsg_PosGPSFix.header: Invalid PositionInformation!');
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
        this.header = new msg_components_1.Header(x.slice(0, 5));
        this.age = utils_1.mt_value_decode(x[5], 0, 2040, 8, 0);
        var l;
        l = (x[6] << 24) | (x[7] << 16) | (x[8] << 8);
        if (l > 0x7fffffff)
            l -= 0x100000000;
        this.latitude = l / 10000000;
        l = (x[9] << 24) | (x[10] << 16) | (x[11] << 8);
        if (l > 0x7fffffff)
            l -= 0x100000000;
        this.longitude = l / 10000000;
        this.ehpe = utils_1.mt_value_decode(x[12], 0, 1000, 8, 0);
        this.encryptedPos = Buffer.from(x.slice(13, 16));
    };
    UlMsg_PosGPSFix.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(16);
        this.header.toBuffer().copy(y);
        y[5] = utils_1.mt_value_encode(this.age, 0, 2040, 8, 0);
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
        y[12] = utils_1.mt_value_encode(this.ehpe, 0, 1000, 8, 0);
        this.encryptedPos.copy(y, 13);
        return y;
    };
    return UlMsg_PosGPSFix;
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.POSITION, 'UlMsg_PosGPSTimeout.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.GPS_TIMEOUT, 'UlMsg_PosGPSTimeout.header: Invalid PositionInformation!');
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
            assert.ok(x in constants_1.E_GPSTimeoutCause, 'UlMsg_PosGPSTimeout.cause: invalid value');
            this._props.cause = x;
            this._props._cause = constants_1.E_GPSTimeoutCause[x];
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
        this.header = new msg_components_1.Header(x.slice(0, 5));
        this.cause = x[5];
        var carrierOverNoise = [];
        for (var i = 0; i < 4; i++) {
            carrierOverNoise.push(utils_1.mt_value_decode(x[6 + i], 0, 2040, 8, 0));
        }
        this.carrierOverNoise = carrierOverNoise;
    };
    UlMsg_PosGPSTimeout.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(10);
        this.header.toBuffer().copy(y);
        y[5] = this.cause;
        for (var i = 0; i < 4; i++) {
            y[6 + i] = utils_1.mt_value_encode(this.carrierOverNoise[i], 0, 2040, 8, 0);
        }
        return y;
    };
    return UlMsg_PosGPSTimeout;
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.POSITION, 'UlMsg_PosWiFiTimeout.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.WIFI_TIMEOUT, 'UlMsg_PosWiFiTimeout.header: Invalid PositionInformation!');
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
        this.header = new msg_components_1.Header(x.slice(0, 5));
        var v_bat = [];
        for (var i = 0; i < 6; i++) {
            v_bat.push(utils_1.mt_value_decode(x[5 + i], 2.8, 4.2, 8, 2));
        }
        this.v_bat = v_bat;
    };
    UlMsg_PosWiFiTimeout.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(11);
        this.header.toBuffer().copy(y);
        for (var i = 0; i < 6; i++) {
            y[5 + i] = utils_1.mt_value_encode(this.v_bat[i], 2.8, 4.2, 8, 2);
        }
        return y;
    };
    return UlMsg_PosWiFiTimeout;
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.POSITION, 'UlMsg_PosWiFiFailure.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.WIFI_FAILURE, 'UlMsg_PosWiFiFailure.header: Invalid PositionInformation!');
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
            assert.ok(x in constants_1.E_WiFiFailure, 'UlMsg_PosWiFiFailure.error: invalid value');
            this._props.error = x;
            this._props._error = constants_1.E_WiFiFailure[x];
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_PosWiFiFailure.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 12, 'UlMsg_PosWiFiFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new msg_components_1.Header(x.slice(0, 5));
        var v_bat = [];
        for (var i = 0; i < 6; i++) {
            v_bat.push(utils_1.mt_value_decode(x[5 + i], 2.8, 4.2, 8, 2));
        }
        this.v_bat = v_bat;
        this.error = x[11];
    };
    UlMsg_PosWiFiFailure.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(12);
        this.header.toBuffer().copy(y);
        for (var i = 0; i < 6; i++) {
            y[5 + i] = utils_1.mt_value_encode(this.v_bat[i], 2.8, 4.2, 8, 2);
        }
        y[11] = this.error;
        return y;
    };
    return UlMsg_PosWiFiFailure;
}(utils_1.BufferTempl));
exports.UlMsg_PosWiFiFailure = UlMsg_PosWiFiFailure;
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
            assert.ok(x.type === constants_1.E_UlMsgType.POSITION, 'UlMsg_PosWiFiBSSIDs.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.WIFI_BSSIDS, 'UlMsg_PosWiFiBSSIDs.header: Invalid PositionInformation!');
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
        this.header = new msg_components_1.Header(x.slice(0, 5));
        this.age = utils_1.mt_value_decode(x[5], 0, 2040, 8, 0);
        var wifiHotspots = [];
        for (var i = 0; i < 4; i++) {
            wifiHotspots.push(new msg_components_1.WiFiBSSIDs(x.slice(6 + (i * 7), 13 + (i * 7))));
        }
        this.wifiHotspots = wifiHotspots;
    };
    UlMsg_PosWiFiBSSIDs.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(34);
        this.header.toBuffer().copy(y);
        y[5] = utils_1.mt_value_decode(this.age, 0, 2040, 8, 0);
        for (var i = 0; i < 4; i++) {
            this.wifiHotspots[i].toBuffer().copy(y, 6 + i * 7);
        }
        return y;
    };
    return UlMsg_PosWiFiBSSIDs;
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.POSITION, 'UlMsg_PosBLEFailure.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.BLE_BACON_FAILURE, 'UlMsg_PosBLEFailure.header: Invalid PositionInformation!');
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
            assert.ok(x in constants_1.E_BLEFailure, 'UlMsg_PosBLEFailure.error: Invalid value!');
            this._props.error = x;
            this._props._error = constants_1.E_BLEFailure[x];
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_PosBLEFailure.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 6, 'UlMsg_PosBLEFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new msg_components_1.Header(x.slice(0, 5));
        this.error = x[5];
    };
    UlMsg_PosBLEFailure.prototype.toBuffer = function () {
        var y = Buffer.allocUnsafe(6);
        this.header.toBuffer().copy(y);
        y[5] = this.error;
        return y;
    };
    return UlMsg_PosBLEFailure;
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.ENERGY_STATUS, 'UlMsg_EnergyStatus.header: Invalid MessageType!');
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
        this.header = new msg_components_1.Header(x.slice(0, 5));
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
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.HEART_BEAT, 'UlMsg_HeartBeat.header: Invalid MessageType!');
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
                    assert.ok(utils_1.isUint8(fwVal), 'UlMsg_HeartBeat.fwVersion: invalid value!');
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
        this.header = new msg_components_1.Header(x.slice(0, 5));
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
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.ACTIVITY_OR_CONFIG, 'UlMsg_ActivityStatus.header: Invalid MessageType!');
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
            assert.ok(x === constants_1.E_Tag.ACTIVITY, 'UlMsg_ActivityStatus.tag(): Invalid value!');
            this._props.tag = x;
            this._props._tag = constants_1.E_Tag[x];
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
        this.header = new msg_components_1.Header(x.slice(0, 5));
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
}(utils_1.BufferTempl));
exports.UlMsg_ActivityStatus = UlMsg_ActivityStatus;
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
            assert.ok(x.type === constants_1.E_UlMsgType.ACTIVITY_OR_CONFIG, 'UlMsg_ConfigReport.header: Invalid MessageType!');
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
            assert.ok(x === constants_1.E_Tag.CONFIG, 'UlMsg_ConfigReport.tag(): Invalid value!');
            this._props.tag = x;
            this._props._tag = constants_1.E_Tag[x];
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
        this.header = new msg_components_1.Header(x.slice(0, 5));
        this.tag = x[5];
        var params = [];
        for (var i = 0; i < paramsLength; i++) {
            params.push(new msg_components_1.Parameter(x.slice(6 + (i * 5), 11 + (i * 5))));
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
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.SHUTDOWN, 'UlMsg_Shutdown.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_Shutdown.prototype.setFromBuffer = function (x) {
        // assert.ok(x.length === 2, 'UlMsg_Shutdown.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of SHUTHDOWN messages
        this.header = new msg_components_1.UlHeaderShort(x.slice(0, 2));
    };
    UlMsg_Shutdown.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UlMsg_Shutdown;
}(utils_1.BufferTempl));
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
            assert.ok(x.type === constants_1.E_UlMsgType.DEBUG, 'UlMsg_Debug.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UlMsg_Debug.prototype.setFromBuffer = function (x) {
        // assert.ok(x.length === 2, 'UlMsg_Debug.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of DEBUG messages
        this.header = new msg_components_1.UlHeaderShort(x.slice(0, 2));
    };
    UlMsg_Debug.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UlMsg_Debug;
}(utils_1.BufferTempl));
exports.UlMsg_Debug = UlMsg_Debug;
exports.decodeUlMsg = function (buf) {
    var msg;
    switch (buf[0]) {
        case constants_1.E_UlMsgType.FRAME_PENDING:
            msg = new UlMsg_FramePending(buf);
            break;
        case constants_1.E_UlMsgType.POSITION:
            switch (buf[4] & 0xf) {
                case constants_1.E_PositionInformation.GPS_FIX:
                    msg = new UlMsg_PosGPSFix(buf);
                    break;
                case constants_1.E_PositionInformation.GPS_TIMEOUT:
                    msg = new UlMsg_PosGPSTimeout(buf);
                    break;
                case constants_1.E_PositionInformation.NO_MORE_USED:
                    msg = undefined;
                    break;
                case constants_1.E_PositionInformation.WIFI_TIMEOUT:
                    msg = new UlMsg_PosWiFiTimeout(buf);
                    break;
                case constants_1.E_PositionInformation.WIFI_FAILURE:
                    msg = new UlMsg_PosWiFiFailure(buf);
                    break;
                case constants_1.E_PositionInformation.LPGPS_DATA1:
                    msg = undefined;
                    break;
                case constants_1.E_PositionInformation.LPGPS_DATA2:
                    msg = undefined;
                    break;
                case constants_1.E_PositionInformation.BLE_BACON_SCAN:
                    msg = undefined; //new UlMsg_(buf);
                    break;
                case constants_1.E_PositionInformation.BLE_BACON_FAILURE:
                    msg = new UlMsg_PosBLEFailure(buf);
                    break;
                case constants_1.E_PositionInformation.WIFI_BSSIDS:
                    msg = new UlMsg_PosWiFiBSSIDs(buf);
                    break;
                default:
                    msg = undefined;
                    break;
            }
            break;
        case constants_1.E_UlMsgType.ENERGY_STATUS:
            msg = new UlMsg_EnergyStatus(buf);
            break;
        case constants_1.E_UlMsgType.HEART_BEAT:
            msg = new UlMsg_HeartBeat(buf);
            break;
        case constants_1.E_UlMsgType.ACTIVITY_OR_CONFIG:
            switch (buf[5]) {
                case constants_1.E_Tag.ACTIVITY:
                    msg = new UlMsg_ActivityStatus(buf);
                    break;
                case constants_1.E_Tag.CONFIG:
                    msg = new UlMsg_ConfigReport(buf);
                    break;
                default:
                    msg = undefined;
                    break;
            }
            break;
        case constants_1.E_UlMsgType.SHUTDOWN:
            msg = new UlMsg_Shutdown(buf);
            break;
        case constants_1.E_UlMsgType.DEBUG:
            msg = new UlMsg_Debug(buf);
            break;
        default:
            msg = undefined;
            break;
    }
    if (msg) {
        return msg.toComponents();
    }
    else {
        return { error: "Unknown message type: " + constants_1.E_UlMsgType[buf[0]] };
    }
};
//# sourceMappingURL=msg-uplink.js.map