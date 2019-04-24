"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
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
exports.isUint8 = function (x) {
    return (x & 0xff) === x;
};
var PDUTemplate = /** @class */ (function () {
    function PDUTemplate(x) {
        this._props = {};
        if (typeof x == 'number') {
            this.setFromValue(x);
        }
        else if (typeof x == 'string') {
            this.setFromHexString(x);
        }
        else if (x instanceof buffer_1.Buffer) {
            this.setFromBuffer(x);
        }
        else {
            this.setFromComponents(x);
        }
    }
    // setFromValue() and toValue() methods are going to be overwritten by sub classes
    // derived from this class template
    PDUTemplate.prototype.setFromValue = function (x) {
        throw new Error('setFromValue() method is not defined for this class.');
    };
    PDUTemplate.prototype.toValue = function () {
        throw new Error('toValue() method is not defined for this class.');
        return 0;
    };
    // setFromBuffer() and toBuffer() methods are going to be overwritten by sub classes
    // derived from this class template
    PDUTemplate.prototype.setFromBuffer = function (x) {
        throw new Error('setFromBuffer() method is not defined for this class.');
    };
    PDUTemplate.prototype.toBuffer = function () {
        throw new Error('toBuffer() method is not defined for this class.');
        return buffer_1.Buffer.allocUnsafe(0);
    };
    PDUTemplate.prototype.setFromHexString = function (x) {
        this.setFromBuffer(buffer_1.Buffer.from(x));
    };
    PDUTemplate.prototype.toHexString = function () {
        return this.toBuffer().toString('hex');
    };
    PDUTemplate.prototype.setFromComponents = function (x) {
        for (var key in x) {
            this[key] = x[key];
        }
    };
    PDUTemplate.prototype.toComponents = function () {
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
            else if (this._props[key] instanceof buffer_1.Buffer) {
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
    PDUTemplate.prototype.setFromJSON = function (x) {
        this.setFromComponents(JSON.parse(x));
    };
    PDUTemplate.prototype.toJSON = function () {
        return JSON.stringify(this.toComponents(), null, 4);
    };
    return PDUTemplate;
}());
exports.PDUTemplate = PDUTemplate;
//# sourceMappingURL=utils.js.map