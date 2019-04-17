
// ***************************************************************
// *** Utility functions *****************************************
// ***************************************************************

let step_size = (lo: number, hi: number, nbits: number, nresv: number): number => {
    return 1.0/((((1<<nbits)-1)-nresv)/(hi-lo));
}

export let mt_value_decode = (value:number, lo:number, hi:number, nbits:number, nresv:number): number => {
    return Math.round(10000*( lo + (value-nresv/2)*step_size(lo, hi, nbits, nresv) ))/10000 ;
}

export let mt_value_encode = (value:number, lo:number, hi:number, nbits:number, nresv:number): number => {
    return Math.round( ( (value - lo) / step_size(lo, hi, nbits, nresv) ) + nresv/2 );
}

export let isUint8 = (x:number): boolean => {
    return (x & 0xff) === x;
}


// ***************************************************************
// *** Template class for Values *********************************
// ***************************************************************
interface I_ValueTempl<T> {
    setFromValue(x:number):void,
    toValue():number,
    setFromComponents(x:T):void,
    toComponents():object,
}
export class ValueTempl<T extends object> implements I_ValueTempl<T> {

    protected _props: any = {};

    constructor(x: number | T) {
        if (typeof x === 'number') {
            this.setFromValue(x);
        } else {
            this.setFromComponents(x);
        }
    }

    setFromValue(x:number):void {
    }
    toValue():number {
        return 0;
    }

    setFromComponents(x:T) {
        for (let key in x) {
            this[<string>key] = x[key];
        }
    }
    toComponents():object {
        let y: object = {};
        for (let key in this._props) {
            if (Array.isArray(this._props[key])) {
                let arr = [];
                for ( let element of this._props[key] ) {

                    if (typeof element === 'object') {
                        arr.push(element.toComponents());
                    } else {
                        arr.push(element);
                    }

                }
                y[key] = arr;
            }

            else if (typeof this._props[key] === 'object') {
                y[key] = this._props[key].toComponents();
            } else {
                y[key] = this._props[key];
            }

        }
        return y;
    }

    toJSON(): string {
        return JSON.stringify(this.toComponents(), null, 4);
    }

}

// ***************************************************************
// *** Template slass for Buffers ********************************
// ***************************************************************
interface I_BufferTempl<T> {
    setFromBuffer(x:Buffer):void,
    toBuffer():Buffer,
    setFromComponents(x:T):void,
    toComponents():object,
}
export class BufferTempl<T extends object> implements I_BufferTempl<T> {

    protected _props: any = {};

    constructor(x: Buffer | T) {
        if (x instanceof Buffer) {
            this.setFromBuffer(x);
        } else {
            this.setFromComponents(x);
        }
    }

    setFromBuffer(x:Buffer):void {
    }
    toBuffer():Buffer {
        return Buffer.allocUnsafe(0);
    }

    setFromComponents(x:T) {
        for (let key in x) {
            this[<string>key] = x[key];
        }
    }
    toComponents():object {
        let y: object = {};
        for (let key in this._props) {
            if (Array.isArray(this._props[key])) {
                let arr = [];
                for ( let element of this._props[key] ) {

                    if (typeof element === 'object') {
                        arr.push(element.toComponents());
                    } else {
                        arr.push(element);
                    }

                }
                y[key] = arr;
            }
            else if ( this._props[key] instanceof Buffer) {
                y[key] = this._props[key].toString('hex');
            }
            else if (typeof this._props[key] === 'object') {
                y[key] = this._props[key].toComponents();
            } else {
                y[key] = this._props[key];
            }

        }
        return y;
    }

    toJSON(): string {
        return JSON.stringify(this.toComponents(), null, 4);
    }

}
