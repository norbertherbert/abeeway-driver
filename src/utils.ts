import { Buffer } from 'buffer';

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

export let isUint16 = (x:number): boolean => {
    return (x & 0xffff) === x;
}


// ***************************************************************
// *** Template class for App Layer PDUs *************************
// ***************************************************************
interface I_PDUTemplate<T> {
    setFromBuffer(x:Buffer):void,
    toBuffer():Buffer,

    setFromValue(x:number):void,
    toValue(x:number):void,

    setFromHexString(x:string):void,
    toHexString():string,

    setFromComponents(x:T):void,
    toComponents():object,

    setFromJSON(x:string):void,
    toJSON():string,
}
export class PDUTemplate<T extends object> implements I_PDUTemplate<T> {

    protected _props: any = {};

    constructor(x: number | string | Buffer | T) {
        if (typeof x == 'number') {
            this.setFromValue(x);
        } else if (typeof x == 'string') {
            this.setFromHexString(x);
        } else if (x instanceof Buffer) {
            this.setFromBuffer(x);
        } else {
            this.setFromComponents(x);
        }
    }





    // setFromValue() and toValue() methods are going to be overwritten by sub classes
    // derived from this class template
    setFromValue(x:number):void {
        throw new Error('setFromValue() method is not defined for this class.');
    }
    toValue():number {
        throw new Error('toValue() method is not defined for this class.');
        return 0;
    }

    // setFromBuffer() and toBuffer() methods are going to be overwritten by sub classes
    // derived from this class template
    setFromBuffer(x:Buffer):void {
        throw new Error('setFromBuffer() method is not defined for this class.');
    }
    toBuffer():Buffer {
        throw new Error('toBuffer() method is not defined for this class.');
        return Buffer.allocUnsafe(0);
    }






    setFromHexString(x:string):void {
        this.setFromBuffer(Buffer.from(x));
    }
    toHexString():string {
        return this.toBuffer().toString('hex');
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

    setFromJSON(x:string) {
        this.setFromComponents(JSON.parse(x));
    }
    toJSON(): string {
        return JSON.stringify(this.toComponents(), null, 4);
    }

}
