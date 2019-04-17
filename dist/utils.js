"use strict";
// ***************************************************************
// *** Utility functions *****************************************
// ***************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
var step_size = function (lo, hi, nbits, nresv) {
    return 1.0 / ((((1 << nbits) - 1) - nresv) / (hi - lo));
};
exports.mt_value_decode = function (value, lo, hi, nbits, nresv) {
    return Math.round(10000 * (lo + (value - nresv / 2) * step_size(lo, hi, nbits, nresv))) / 10000;
};
exports.mt_value_encode = function (value, lo, hi, nbits, nresv) {
    return Math.round(((value - lo) / step_size(lo, hi, nbits, nresv)) + nresv / 2);
};
exports.isUint8 = function (x) {
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
exports.ValueTempl = ValueTempl;
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
exports.BufferTempl = BufferTempl;
//# sourceMappingURL=utils.js.map