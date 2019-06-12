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
/* Component Protocol Data Units (CPDU) */
var CPDU_1 = require("./CPDU");
var UPDU_FramePending = /** @class */ (function (_super) {
    __extends(UPDU_FramePending, _super);
    function UPDU_FramePending() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_FramePending.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.FRAME_PENDING, 'UPDU_FramePending.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UPDU_FramePending.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 2, 'UPDU_FramePending.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_UlHeaderShort(x);
    };
    UPDU_FramePending.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UPDU_FramePending;
}(utils_1.PDUTemplate));
exports.UPDU_FramePending = UPDU_FramePending;
var UPDU_PosGPSFix = /** @class */ (function (_super) {
    __extends(UPDU_PosGPSFix, _super);
    function UPDU_PosGPSFix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_PosGPSFix.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.POSITION, 'UPDU_PosGPSFix.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.GPS_FIX, 'UPDU_PosGPSFix.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosGPSFix.prototype, "age", {
        get: function () {
            return this._props.age;
        },
        // *** age ***
        set: function (x) {
            assert.ok((0 <= x) && (x <= 2040), 'UPDU_PosGPSFix.age: Invalid value!');
            this._props.age = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosGPSFix.prototype, "latitude", {
        get: function () {
            return this._props.latitude;
        },
        // *** latitude ***
        set: function (x) {
            assert.ok((-90 <= x) && (x <= 90), 'UPDU_PosGPSFix.latitude: Invalid value!');
            this._props.latitude = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosGPSFix.prototype, "longitude", {
        get: function () {
            return this._props.longitude;
        },
        // *** longitude ***
        set: function (x) {
            assert.ok((-180 <= x) && (x <= 180), 'UPDU_PosGPSFix.longitude: Invalid value!');
            this._props.longitude = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosGPSFix.prototype, "ehpe", {
        get: function () {
            return this._props.ehpe;
        },
        // *** ehpe ***
        set: function (x) {
            assert.ok((0 <= x) && (x <= 1000), 'UPDU_PosGPSFix.ehpe: Invalid value!');
            this._props.ehpe = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosGPSFix.prototype, "encryptedPos", {
        get: function () {
            return this._props.encryptedPos;
        },
        // *** encrypted ***
        set: function (x) {
            assert.ok((x.length === 0) || (x.length === 3), 'UPDU_PosGPSFix.encryptedPos: Invalid Buffer length!');
            this._props.encryptedPos = x;
        },
        enumerable: true,
        configurable: true
    });
    UPDU_PosGPSFix.prototype.setFromBuffer = function (x) {
        assert.ok((x.length === 13) || (x.length === 16), 'UPDU_PosGPSFix.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
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
        this.encryptedPos = buffer_1.Buffer.from(x.slice(13, 16));
    };
    UPDU_PosGPSFix.prototype.toBuffer = function () {
        var y;
        if (this.encryptedPos.length == 0) {
            y = buffer_1.Buffer.allocUnsafe(13);
        }
        else {
            y = buffer_1.Buffer.allocUnsafe(16);
        }
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
        if (this.encryptedPos.length > 0) {
            this.encryptedPos.copy(y, 13);
        }
        return y;
    };
    return UPDU_PosGPSFix;
}(utils_1.PDUTemplate));
exports.UPDU_PosGPSFix = UPDU_PosGPSFix;
var UPDU_PosGPSTimeout = /** @class */ (function (_super) {
    __extends(UPDU_PosGPSTimeout, _super);
    function UPDU_PosGPSTimeout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_PosGPSTimeout.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.POSITION, 'UPDU_PosGPSTimeout.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.GPS_TIMEOUT, 'UPDU_PosGPSTimeout.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosGPSTimeout.prototype, "cause", {
        get: function () {
            return this._props.cause;
        },
        // *** cause ***
        set: function (x) {
            assert.ok(x in constants_1.E_GPSTimeoutCause, 'UPDU_PosGPSTimeout.cause: invalid value');
            this._props.cause = x;
            this._props._cause = constants_1.E_GPSTimeoutCause[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosGPSTimeout.prototype, "carrierOverNoise", {
        get: function () {
            return this._props.carrierOverNoise;
        },
        // *** carrierOverNoise ***
        set: function (x) {
            for (var i = 0; i < 4; i++) {
                assert.ok((0 <= x[i]) && (x[i] <= 2040), 'UPDU_PosGPSTimeout.carrierOverNoise: invalid value');
            }
            this._props.carrierOverNoise = x;
        },
        enumerable: true,
        configurable: true
    });
    UPDU_PosGPSTimeout.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 10, 'UPDU_PosGPSTimeout.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
        this.cause = x[5];
        var carrierOverNoise = [];
        for (var i = 0; i < 4; i++) {
            carrierOverNoise.push(utils_1.mt_value_decode(x[6 + i], 0, 2040, 8, 0));
        }
        this.carrierOverNoise = carrierOverNoise;
    };
    UPDU_PosGPSTimeout.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(10);
        this.header.toBuffer().copy(y);
        y[5] = this.cause;
        for (var i = 0; i < 4; i++) {
            y[6 + i] = utils_1.mt_value_encode(this.carrierOverNoise[i], 0, 2040, 8, 0);
        }
        return y;
    };
    return UPDU_PosGPSTimeout;
}(utils_1.PDUTemplate));
exports.UPDU_PosGPSTimeout = UPDU_PosGPSTimeout;
var UPDU_PosWiFiTimeout = /** @class */ (function (_super) {
    __extends(UPDU_PosWiFiTimeout, _super);
    function UPDU_PosWiFiTimeout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_PosWiFiTimeout.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.POSITION, 'UPDU_PosWiFiTimeout.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.WIFI_TIMEOUT, 'UPDU_PosWiFiTimeout.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosWiFiTimeout.prototype, "v_bat", {
        get: function () {
            return this._props.v_bat;
        },
        // *** v_bat ***
        set: function (x) {
            for (var i = 0; i < 6; i++) {
                assert.ok((2.8 <= x[i]) && (x[i] <= 4.2), 'UPDU_PosWiFiTimeout.v_bat: invalid value');
            }
            this._props.v_bat = x;
        },
        enumerable: true,
        configurable: true
    });
    UPDU_PosWiFiTimeout.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 11, 'UPDU_PosWiFiTimeout.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
        var v_bat = [];
        for (var i = 0; i < 6; i++) {
            v_bat.push(utils_1.mt_value_decode(x[5 + i], 2.8, 4.2, 8, 2));
        }
        this.v_bat = v_bat;
    };
    UPDU_PosWiFiTimeout.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(11);
        this.header.toBuffer().copy(y);
        for (var i = 0; i < 6; i++) {
            y[5 + i] = utils_1.mt_value_encode(this.v_bat[i], 2.8, 4.2, 8, 2);
        }
        return y;
    };
    return UPDU_PosWiFiTimeout;
}(utils_1.PDUTemplate));
exports.UPDU_PosWiFiTimeout = UPDU_PosWiFiTimeout;
var UPDU_PosWiFiFailure = /** @class */ (function (_super) {
    __extends(UPDU_PosWiFiFailure, _super);
    function UPDU_PosWiFiFailure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_PosWiFiFailure.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.POSITION, 'UPDU_PosWiFiFailure.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.WIFI_FAILURE, 'UPDU_PosWiFiFailure.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosWiFiFailure.prototype, "v_bat", {
        get: function () {
            return this._props.v_bat;
        },
        // *** v_bat ***
        set: function (x) {
            for (var i = 0; i < 6; i++) {
                assert.ok((2.8 <= x[i]) && (x[i] <= 4.2), 'UPDU_PosWiFiFailure.v_bat: invalid value');
            }
            this._props.v_bat = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosWiFiFailure.prototype, "error", {
        get: function () {
            return this._props.error;
        },
        // *** error ***
        set: function (x) {
            assert.ok(x in constants_1.E_WiFiFailure, 'UPDU_PosWiFiFailure.error: invalid value');
            this._props.error = x;
            this._props._error = constants_1.E_WiFiFailure[x];
        },
        enumerable: true,
        configurable: true
    });
    UPDU_PosWiFiFailure.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 12, 'UPDU_PosWiFiFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
        var v_bat = [];
        for (var i = 0; i < 6; i++) {
            v_bat.push(utils_1.mt_value_decode(x[5 + i], 2.8, 4.2, 8, 2));
        }
        this.v_bat = v_bat;
        this.error = x[11];
    };
    UPDU_PosWiFiFailure.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(12);
        this.header.toBuffer().copy(y);
        for (var i = 0; i < 6; i++) {
            y[5 + i] = utils_1.mt_value_encode(this.v_bat[i], 2.8, 4.2, 8, 2);
        }
        y[11] = this.error;
        return y;
    };
    return UPDU_PosWiFiFailure;
}(utils_1.PDUTemplate));
exports.UPDU_PosWiFiFailure = UPDU_PosWiFiFailure;
var UPDU_PosWiFiBSSIDs = /** @class */ (function (_super) {
    __extends(UPDU_PosWiFiBSSIDs, _super);
    function UPDU_PosWiFiBSSIDs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_PosWiFiBSSIDs.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.POSITION, 'UPDU_PosWiFiBSSIDs.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.WIFI_BSSIDS, 'UPDU_PosWiFiBSSIDs.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosWiFiBSSIDs.prototype, "age", {
        get: function () {
            return this._props.age;
        },
        // *** age ***
        set: function (x) {
            assert.ok((0 <= x) && (x <= 2040), 'UPDU_PosWiFiBSSIDs.age: Invalid value!');
            this._props.age = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosWiFiBSSIDs.prototype, "wifiHotspots", {
        get: function () {
            return this._props.wifiHotspots;
        },
        // *** wifiHotspots ***
        set: function (x) {
            assert.ok(x.length === 4, 'UPDU_PosWiFiBSSIDs.wifiHotspots: Invalid value!');
            this._props.wifiHotspots = x;
        },
        enumerable: true,
        configurable: true
    });
    UPDU_PosWiFiBSSIDs.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 34, 'UPDU_PosWiFiBSSIDs.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
        this.age = utils_1.mt_value_decode(x[5], 0, 2040, 8, 0);
        var wifiHotspots = [];
        for (var i = 0; i < 4; i++) {
            wifiHotspots.push(new CPDU_1.CPDU_WiFiBSSIDs(x.slice(6 + (i * 7), 13 + (i * 7))));
        }
        this.wifiHotspots = wifiHotspots;
    };
    UPDU_PosWiFiBSSIDs.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(34);
        this.header.toBuffer().copy(y);
        y[5] = utils_1.mt_value_decode(this.age, 0, 2040, 8, 0);
        for (var i = 0; i < 4; i++) {
            this.wifiHotspots[i].toBuffer().copy(y, 6 + i * 7);
        }
        return y;
    };
    return UPDU_PosWiFiBSSIDs;
}(utils_1.PDUTemplate));
exports.UPDU_PosWiFiBSSIDs = UPDU_PosWiFiBSSIDs;
var UPDU_PosBLEFailure = /** @class */ (function (_super) {
    __extends(UPDU_PosBLEFailure, _super);
    function UPDU_PosBLEFailure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_PosBLEFailure.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.POSITION, 'UPDU_PosBLEFailure.header: Invalid MessageType!');
            assert.ok(x.optData === constants_1.E_PositionInformation.BLE_BACON_FAILURE, 'UPDU_PosBLEFailure.header: Invalid PositionInformation!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_PosBLEFailure.prototype, "error", {
        get: function () {
            return this._props.error;
        },
        // *** error ***
        set: function (x) {
            assert.ok(x in constants_1.E_BLEFailure, 'UPDU_PosBLEFailure.error: Invalid value!');
            this._props.error = x;
            this._props._error = constants_1.E_BLEFailure[x];
        },
        enumerable: true,
        configurable: true
    });
    UPDU_PosBLEFailure.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 6, 'UPDU_PosBLEFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
        this.error = x[5];
    };
    UPDU_PosBLEFailure.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(6);
        this.header.toBuffer().copy(y);
        y[5] = this.error;
        return y;
    };
    return UPDU_PosBLEFailure;
}(utils_1.PDUTemplate));
exports.UPDU_PosBLEFailure = UPDU_PosBLEFailure;
var UPDU_EnergyStatus = /** @class */ (function (_super) {
    __extends(UPDU_EnergyStatus, _super);
    function UPDU_EnergyStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_EnergyStatus.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.ENERGY_STATUS, 'UPDU_EnergyStatus.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_EnergyStatus.prototype, "gpsOnTime", {
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
    Object.defineProperty(UPDU_EnergyStatus.prototype, "gpsStabdbyTime", {
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
    Object.defineProperty(UPDU_EnergyStatus.prototype, "wifiScans", {
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
    UPDU_EnergyStatus.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 17, 'UPDU_EnergyStatus.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
        this.gpsOnTime = x.readUInt32BE(5);
        this.gpsStabdbyTime = x.readUInt32BE(9);
        this.wifiScans = x.readUInt32BE(13);
    };
    UPDU_EnergyStatus.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(17);
        this.header.toBuffer().copy(y);
        y.writeUInt32BE(this.gpsOnTime, 5);
        y.writeUInt32BE(this.gpsStabdbyTime, 9);
        y.writeUInt32BE(this.wifiScans, 13);
        return y;
    };
    return UPDU_EnergyStatus;
}(utils_1.PDUTemplate));
exports.UPDU_EnergyStatus = UPDU_EnergyStatus;
var UPDU_HeartBeat = /** @class */ (function (_super) {
    __extends(UPDU_HeartBeat, _super);
    function UPDU_HeartBeat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_HeartBeat.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.HEART_BEAT, 'UPDU_HeartBeat.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_HeartBeat.prototype, "cause", {
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
    Object.defineProperty(UPDU_HeartBeat.prototype, "fwVersion", {
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
                assert.ok(x.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/), 'UPDU_HeartBeat.fwVersion: invalid value!');
                var fwStrArray = x.split('.');
                var fwValArray = [];
                var fwVal = void 0;
                for (var i = 0; i < 3; i++) {
                    fwVal = parseInt(fwStrArray[i]);
                    assert.ok(utils_1.isUint8(fwVal), 'UPDU_HeartBeat.fwVersion: invalid value!');
                    fwValArray.push(fwVal);
                }
                this._props.fwVersion = fwValArray.join('.');
            }
        },
        enumerable: true,
        configurable: true
    });
    UPDU_HeartBeat.prototype.setFromBuffer = function (x) {
        var l = x.length;
        assert.ok([6, 9].includes(l), 'UPDU_HeartBeat.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
        this.cause = x[5];
        if (l === 9) {
            this.fwVersion = x.slice(6, 9).join('.');
        }
        else {
            this.fwVersion = '';
        }
    };
    UPDU_HeartBeat.prototype.toBuffer = function () {
        var l = (this.fwVersion == '') ? 6 : 9;
        var y = buffer_1.Buffer.allocUnsafe(l);
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
    return UPDU_HeartBeat;
}(utils_1.PDUTemplate));
exports.UPDU_HeartBeat = UPDU_HeartBeat;
var UPDU_ActivityStatus = /** @class */ (function (_super) {
    __extends(UPDU_ActivityStatus, _super);
    function UPDU_ActivityStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_ActivityStatus.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.ACTIVITY_OR_CONFIG, 'UPDU_ActivityStatus.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_ActivityStatus.prototype, "tag", {
        get: function () {
            return this._props.tag;
        },
        // *** tag ***
        set: function (x) {
            assert.ok(x === constants_1.E_Tag.ACTIVITY, 'UPDU_ActivityStatus.tag(): Invalid value!');
            this._props.tag = x;
            this._props._tag = constants_1.E_Tag[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_ActivityStatus.prototype, "activityCount", {
        get: function () {
            return this._props.activityCount;
        },
        // *** activityCount ***
        set: function (x) {
            assert.ok(x >= 0, 'UPDU_ActivityStatus.activityCount(): Invalid value!');
            this._props.activityCount = x;
        },
        enumerable: true,
        configurable: true
    });
    UPDU_ActivityStatus.prototype.setFromBuffer = function (x) {
        assert.ok(x.length === 10, 'UPDU_ActivityStatus.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
        this.tag = x[5];
        this.activityCount = x.readUInt32BE(6);
    };
    UPDU_ActivityStatus.prototype.toBuffer = function () {
        var y = buffer_1.Buffer.allocUnsafe(10);
        this.header.toBuffer().copy(y);
        y[5] = this.tag;
        y.writeUInt32BE(this.activityCount, 6);
        return y;
    };
    return UPDU_ActivityStatus;
}(utils_1.PDUTemplate));
exports.UPDU_ActivityStatus = UPDU_ActivityStatus;
var UPDU_ConfigReport = /** @class */ (function (_super) {
    __extends(UPDU_ConfigReport, _super);
    function UPDU_ConfigReport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_ConfigReport.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.ACTIVITY_OR_CONFIG, 'UPDU_ConfigReport.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_ConfigReport.prototype, "tag", {
        get: function () {
            return this._props.tag;
        },
        // *** tag ***
        set: function (x) {
            assert.ok(x === constants_1.E_Tag.CONFIG, 'UPDU_ConfigReport.tag(): Invalid value!');
            this._props.tag = x;
            this._props._tag = constants_1.E_Tag[x];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UPDU_ConfigReport.prototype, "params", {
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
    UPDU_ConfigReport.prototype.setFromBuffer = function (x) {
        var paramsLength = (x.length - 6) / 5;
        assert.ok([1, 2, 3, 4, 5].includes(paramsLength), 'UPDU_ConfigReport.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
        this.tag = x[5];
        var params = [];
        for (var i = 0; i < paramsLength; i++) {
            params.push(new CPDU_1.CPDU_Parameter(x.slice(6 + (i * 5), 11 + (i * 5))));
        }
        this.params = params;
    };
    UPDU_ConfigReport.prototype.toBuffer = function () {
        var paramsLength = this.params.length;
        var y = buffer_1.Buffer.allocUnsafe(6 + (paramsLength * 5));
        this.header.toBuffer().copy(y);
        y[5] = this.tag;
        for (var i = 0; i < paramsLength; i++) {
            this.params[i].toBuffer().copy(y, 6 + (i * 5));
        }
        return y;
    };
    return UPDU_ConfigReport;
}(utils_1.PDUTemplate));
exports.UPDU_ConfigReport = UPDU_ConfigReport;
var UPDU_Shutdown = /** @class */ (function (_super) {
    __extends(UPDU_Shutdown, _super);
    function UPDU_Shutdown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_Shutdown.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.SHUTDOWN, 'UPDU_Shutdown.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UPDU_Shutdown.prototype.setFromBuffer = function (x) {
        // assert.ok(x.length === 2, 'UPDU_Shutdown.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of SHUTHDOWN messages
        this.header = new CPDU_1.CPDU_UlHeaderShort(x.slice(0, 2));
    };
    UPDU_Shutdown.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UPDU_Shutdown;
}(utils_1.PDUTemplate));
exports.UPDU_Shutdown = UPDU_Shutdown;
var UPDU_Debug = /** @class */ (function (_super) {
    __extends(UPDU_Debug, _super);
    function UPDU_Debug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_Debug.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.DEBUG, 'UPDU_Debug.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UPDU_Debug.prototype.setFromBuffer = function (x) {
        // assert.ok(x.length === 2, 'UPDU_Debug.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of DEBUG messages
        this.header = new CPDU_1.CPDU_UlHeaderShort(x.slice(0, 2));
    };
    UPDU_Debug.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UPDU_Debug;
}(utils_1.PDUTemplate));
exports.UPDU_Debug = UPDU_Debug;
var UPDU_LPGPS = /** @class */ (function (_super) {
    __extends(UPDU_LPGPS, _super);
    function UPDU_LPGPS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UPDU_LPGPS.prototype, "header", {
        get: function () {
            return this._props.header;
        },
        // *** header ***
        set: function (x) {
            assert.ok(x.type === constants_1.E_UPDUType.POSITION, 'UPDU_LPGPS.header: Invalid MessageType!');
            this._props.header = x;
        },
        enumerable: true,
        configurable: true
    });
    UPDU_LPGPS.prototype.setFromBuffer = function (x) {
        // assert.ok(x.length === 2, 'UPDU_Debug.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of DEBUG messages
        this.header = new CPDU_1.CPDU_Header(x.slice(0, 5));
    };
    UPDU_LPGPS.prototype.toBuffer = function () {
        return this.header.toBuffer();
    };
    return UPDU_LPGPS;
}(utils_1.PDUTemplate));
exports.UPDU_LPGPS = UPDU_LPGPS;
exports.createUPDU = function (x) {
    var buf;
    if (typeof (x) == 'string') {
        buf = buffer_1.Buffer.from(x, 'hex');
    }
    else {
        buf = x;
    }
    var updu;
    switch (buf[0]) {
        case constants_1.E_UPDUType.FRAME_PENDING:
            updu = new UPDU_FramePending(buf);
            break;
        case constants_1.E_UPDUType.POSITION:
            switch (buf[4] & 0xf) {
                case constants_1.E_PositionInformation.GPS_FIX:
                    updu = new UPDU_PosGPSFix(buf);
                    break;
                case constants_1.E_PositionInformation.GPS_TIMEOUT:
                    updu = new UPDU_PosGPSTimeout(buf);
                    break;
                case constants_1.E_PositionInformation.NO_MORE_USED:
                    updu = new UPDU_LPGPS(buf); // added here just for safety...
                    break;
                case constants_1.E_PositionInformation.WIFI_TIMEOUT:
                    updu = new UPDU_PosWiFiTimeout(buf);
                    break;
                case constants_1.E_PositionInformation.WIFI_FAILURE:
                    updu = new UPDU_PosWiFiFailure(buf);
                    break;
                case constants_1.E_PositionInformation.LPGPS_DATA1:
                    updu = new UPDU_LPGPS(buf);
                    break;
                case constants_1.E_PositionInformation.LPGPS_DATA2:
                    updu = new UPDU_LPGPS(buf);
                    ;
                    break;
                case constants_1.E_PositionInformation.BLE_BACON_SCAN:
                    updu = new UPDU_LPGPS(buf); // TODO: verify the format, // added here just for safety...
                    break;
                case constants_1.E_PositionInformation.BLE_BACON_FAILURE:
                    updu = new UPDU_PosBLEFailure(buf);
                    break;
                case constants_1.E_PositionInformation.WIFI_BSSIDS:
                    updu = new UPDU_PosWiFiBSSIDs(buf);
                    break;
                default:
                    updu = undefined;
                    break;
            }
            break;
        case constants_1.E_UPDUType.ENERGY_STATUS:
            updu = new UPDU_EnergyStatus(buf);
            break;
        case constants_1.E_UPDUType.HEART_BEAT:
            updu = new UPDU_HeartBeat(buf);
            break;
        case constants_1.E_UPDUType.ACTIVITY_OR_CONFIG:
            switch (buf[5]) {
                case constants_1.E_Tag.ACTIVITY:
                    updu = new UPDU_ActivityStatus(buf);
                    break;
                case constants_1.E_Tag.CONFIG:
                    updu = new UPDU_ConfigReport(buf);
                    break;
                default:
                    updu = undefined;
                    break;
            }
            break;
        case constants_1.E_UPDUType.SHUTDOWN:
            updu = new UPDU_Shutdown(buf);
            break;
        case constants_1.E_UPDUType.DEBUG:
            updu = new UPDU_Debug(buf);
            break;
        default:
            updu = undefined;
            break;
    }
    return updu;
};
//# sourceMappingURL=UPDU.js.map