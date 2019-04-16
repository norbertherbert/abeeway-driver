import * as assert from 'assert';
import { 
    E_UlMsgType, E_Tag, E_OperatingMode, E_PositionInformation, E_WiFiFailure,
    E_BLEFailure, E_DlMsgType, E_DebugCmd, E_GPSTimeoutCause, E_ParameterId, 
    C_ParameterId, E_Param_GeolocSensor, E_Param_GeolocMethod, E_Param_TransmitStrat,
} from './abeeway-driver-constants';
export {
    E_UlMsgType, E_Tag, E_OperatingMode, E_PositionInformation, E_WiFiFailure,
    E_BLEFailure, E_DlMsgType, E_DebugCmd, E_GPSTimeoutCause, E_ParameterId, 
    C_ParameterId, E_Param_GeolocSensor, E_Param_GeolocMethod, E_Param_TransmitStrat,
}

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

let isUint8 = (x:number): boolean => {
    return (x & 0xff) === x;
}


// ***************************************************************
// *** ValueTempl ************************************************
// ***************************************************************
interface I_ValueTempl<T> {
    setFromValue(x:number):void,
    toValue():number,
    setFromComponents(x:T):void,
    toComponents():object,
}
class ValueTempl<T extends object> implements I_ValueTempl<T> {

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
// *** BufferTempl ***********************************************
// ***************************************************************
interface I_BufferTempl<T> {
    setFromBuffer(x:Buffer):void,
    toBuffer():Buffer,
    setFromComponents(x:T):void,
    toComponents():object,
}
class BufferTempl<T extends object> implements I_BufferTempl<T> {

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

// ***************************************************************
// *** Param_ConfigFlags *****************************************
// ***************************************************************

export interface I_Param_ConfigFlags {                     // 1 byte
                                                           // bit 7-6
    BLEAdvertisingActive:                 boolean,         // bit 5
    WiFiPayloadCyphered:                  boolean,         // bit 4
    ConfigReqsAcknoledged:                boolean,         // bit 3
    DoubleShortButtonPressForSOS:         boolean,         // bit 2
    LongButtonPressToSwitchOff:           boolean,         // bit 1
    FramePendingMechanismActive:          boolean,         // bit 0
}
export class Param_ConfigFlags extends ValueTempl<I_Param_ConfigFlags> implements I_Param_ConfigFlags {

    // *** BLEAdvertisingActive ***
    set BLEAdvertisingActive(x:boolean) {
        this._props.BLEAdvertisingActive = x;
    }
    get BLEAdvertisingActive():boolean {
        return this._props.BLEAdvertisingActive;
    }

    // *** WiFiPayloadCyphered ***
    set WiFiPayloadCyphered(x:boolean) {
        this._props.WiFiPayloadCyphered = x;
    }
    get WiFiPayloadCyphered():boolean {
        return this._props.WiFiPayloadCyphered;
    }

    // *** ConfigReqsAcknoledged ***
    set ConfigReqsAcknoledged(x:boolean) {
        this._props.ConfigReqsAcknoledged = x;
    }
    get ConfigReqsAcknoledged():boolean {
        return this._props.ConfigReqsAcknoledged;
    }

    // *** DoubleShortButtonPressForSOS ***
    set DoubleShortButtonPressForSOS(x:boolean) {
        this._props.DoubleShortButtonPressForSOS = x;
    }
    get DoubleShortButtonPressForSOS():boolean {
        return this._props.DoubleShortButtonPressForSOS;
    }

    // *** LongButtonPressToSwitchOff ***
    set LongButtonPressToSwitchOff(x:boolean) {
        this._props.LongButtonPressToSwitchOff = x;
    }
    get LongButtonPressToSwitchOff():boolean {
        return this._props.LongButtonPressToSwitchOff;
    }

    // *** FramePendingMechanismActive ***
    set FramePendingMechanismActive(x:boolean) {
        this._props.FramePendingMechanismActive = x;
    }
    get FramePendingMechanismActive():boolean {
        return this._props.FramePendingMechanismActive;
    }

    setFromValue(x:number):void {
        assert.ok(isUint8(x), 'Param_ConfigFlags.setFromValue(): Invalid value!' );
        this.BLEAdvertisingActive           = (x & 0b100000) === 0b100000;
        this.WiFiPayloadCyphered            = (x &  0b10000) ===  0b10000;
        this.ConfigReqsAcknoledged          = (x &   0b1000) ===   0b1000;
        this.DoubleShortButtonPressForSOS   = (x &    0b100) ===    0b100;
        this.LongButtonPressToSwitchOff     = (x &     0b10) ===     0b10;
        this.FramePendingMechanismActive    = (x &      0b1) ===      0b1;
    }

    toValue():number {
        let y: number = 0;
        y |= this.BLEAdvertisingActive         ? 0b100000 : 0;
        y |= this.WiFiPayloadCyphered          ?  0b10000 : 0;
        y |= this.ConfigReqsAcknoledged        ?   0b1000 : 0;
        y |= this.DoubleShortButtonPressForSOS ?    0b100 : 0;
        y |= this.LongButtonPressToSwitchOff   ?     0b10 : 0;
        y |= this.FramePendingMechanismActive  ?      0b1 : 0;
        return y;
    }

}

// ***************************************************************
// *** Status ****************************************************
// ***************************************************************

export interface I_Status {                          // 1 byte
    operatingMode:           E_OperatingMode, // bit 7-5
    _operatingMode?:      string,
    sosState:                boolean,         // bit 4
    trackingState:           boolean,         // bit 3
    movingState:             boolean,         // bit 2
    periodicPositionMessage: boolean,         // bit 1
    positionOnDemandMessage: boolean,         // bit 0
}
export class Status extends ValueTempl<I_Status> implements I_Status {

    // *** operatingMode ***
    set operatingMode(x:E_OperatingMode) {
        assert.ok(x in E_OperatingMode, 'Status.operatingMode: invalid value')
        this._props.operatingMode = x;
        this._props._operatingMode = E_OperatingMode[x];
    }
    get operatingMode():E_OperatingMode {
        return this._props.operatingMode;
    }

    // *** sosState ***
    set sosState(x:boolean) {
        this._props.sosState = x;
    }
    get sosState():boolean {
        return this._props.sosState;
    }

    // *** trackingState ***
    set trackingState(x:boolean) {
        this._props.trackingState = x;
    }
    get trackingState():boolean {
        return this._props.trackingState;
    }

    // *** trackingState ***
    set movingState(x:boolean) {
        this._props.movingState = x;
    }
    get movingState():boolean {
        return this._props.movingState;
    }

    // *** periodicPositionMessage ***
    set periodicPositionMessage(x:boolean) {
        this._props.periodicPositionMessage = x;
    }
    get periodicPositionMessage():boolean {
        return this._props.periodicPositionMessage;
    }

    // *** positionOnDemandMessage ***
    set positionOnDemandMessage(x:boolean) {
        this._props.positionOnDemandMessage = x;
    }
    get positionOnDemandMessage():boolean {
        return this._props.positionOnDemandMessage;
    }

    setFromValue(x:number):void {
        assert.ok(isUint8(x), 'Status.setFromValue(): Invalid value!' );
        this.operatingMode            = (x >>> 5);
        this.sosState                 = (x & 0b10000) === 0b10000; 
        this.trackingState            = (x &  0b1000) ===  0b1000;
        this.movingState              = (x &   0b100) ===   0b100;
        this.periodicPositionMessage  = (x &    0b10) ===    0b10;
        this.positionOnDemandMessage  = (x &     0b1) ===     0b1;
    }

    toValue():number {
        let y: number = 0;
        y  = this.operatingMode << 5;
        y |= this.sosState                ? 0b10000 : 0;
        y |= this.trackingState           ?  0b1000 : 0;
        y |= this.movingState             ?   0b100 : 0;
        y |= this.periodicPositionMessage ?    0b10 : 0;
        y |= this.positionOnDemandMessage ?     0b1 : 0;
        return y;
    }

}

// ***************************************************************
// *** Header ****************************************************
// ***************************************************************

export interface I_Header {                          // 5 bytes
    type:                    E_UlMsgType,     // 1 byte
    _type?:                  string,
    status:                  Status,          // 1 byte
    battery:                 number,          // 1 byte lo=2.8, hi=4.2, nbits=8, nresv=2, step=5.5mV
    temperature:             number,          // 1 byte lo=-44, hi=85,  nbits=8, nresv=0, step=0.5C
    ackToken:                number,                       // 4 bits [7-4]
    optData:                 number|E_PositionInformation, // 4 bits [3-0]
    _optData?:               string,
}
export class Header extends BufferTempl<I_Header> implements I_Header {

    // *** type ***
    // TODO: header should be read only!!!
    set type(x:E_UlMsgType) {
        assert.ok(x in E_UlMsgType, 'Header.type: invalid value');
        this._props.type = x;
        this._props._type = E_UlMsgType[x];
    }
    get type():E_UlMsgType {
        return this._props.type;
    }

    // *** status ***
    set status(x:Status) {
        this._props.status = x;
    }
    get status():Status {
        return this._props.status;
    }

    // *** battery ***
    set battery(x:number) {
        assert.ok( (2.8<=x) && (x<=4.2), 'Header.battery: Invalid value!' )
        this._props.battery = x;
    }
    get battery():number {
        return this._props.battery;
    }

    // *** temperature ***
    set temperature(x:number) {
        assert.ok( (-44<=x) && (x<=85), 'Header.temperature: Invalid value!' );
        this._props.temperature = x;
    }
    get temperature():number {
        return this._props.temperature;
    }

    // *** ackToken ***
    set ackToken(x:number) {
        assert.ok( (x & 0x0f) === x, 'Header.ackToken: Invalid value!' );
        this._props.ackToken = x;
    }
    get ackToken():number {
        return this._props.ackToken;
    }

    // *** optData ***
    set optData(x:number|E_PositionInformation) {
        assert.ok((x & 0x0f) === x, 'Header.optData: invalid value');
        switch (this.type) {
            case E_UlMsgType.POSITION:
                assert.ok(x in E_PositionInformation, 'Header.optData: invalid value');
                this._props.optData = x;
                this._props._optData = E_PositionInformation[x];
                break;
            default:
                this._props.optData = x;
                break;
        }
    }
    get optData():number|E_PositionInformation {
        return this._props.optData;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 5, 'Header.setFromBuffer(): Invalid buffer legth!');

        // this.type = x[0];
        assert.ok(x[0] in E_UlMsgType, 'Header.type: invalid value');
        this._props.type = x[0];
        this._props._type = E_UlMsgType[x[0]];

        this.status = new Status(x[1]);
        this.battery     = mt_value_decode(x[2],   2.8,  4.2, 8, 2);
        this.temperature = mt_value_decode(x[3], -44.0, 85.0, 8, 0);
        this.ackToken = x[4] >>> 4;
        this.optData  = x[4] & 0x0f;
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(5);
        y[0] = this.type;
        y[1] = this.status.toValue();
        y[2] = mt_value_encode(this.battery,       2.8,  4.2, 8, 2);
        y[3] = mt_value_encode(this.temperature, -44.0, 85.0, 8, 0);
        y[4] = (this.ackToken << 4) | this.optData;
        return y;
    }

}

// ***************************************************************
// *** UlHeaderShort *********************************************
// ***************************************************************

// TODO: To make it generic for UL and DL!

export interface I_UlHeaderShort {                 // 2 bytes
    type:                    E_UlMsgType,   // 1 byte
    _type?:               string,        
    ackToken:                number,        // 4 bits [7-4]
    optData:                 number,        // 4 bits [3-0]
}
export class UlHeaderShort extends BufferTempl<I_UlHeaderShort> implements I_UlHeaderShort {

    // *** type ***
    set type(x:E_UlMsgType) {
        assert.ok(x in E_UlMsgType, 'UlHeaderShort.type: invalid value');
        this._props.type = x;
        this._props._type = E_UlMsgType[x];
    }
    get type():E_UlMsgType {
        return this._props.type;
    }

    // *** ackToken ***
    set ackToken(x:number) {
        assert.ok( (x & 0x0f) === x, 'UlHeaderShort.ackToken: Invalid value!' );
        this._props.ackToken = x;
    }
    get ackToken():number {
        return this._props.ackToken;
    }

    // *** optData ***
    set optData(x:number|E_PositionInformation) {
        assert.ok((x & 0x0f) === x, 'UlHeaderShort.optData: invalid value');
        this._props.optData = x;
    }
    get optData():number|E_PositionInformation {
        return this._props.optData;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 2, 'UlHeaderShort.setFromBuffer(): Invalid buffer legth!');
        this.type     = x[0];
        this.ackToken = x[1] >>> 4;
        this.optData  = x[1] & 0x0f;
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(2);
        y[0] = this.type;
        y[1] = (this.ackToken << 4) | this.optData;
        return y;    
    }

}

// ***************************************************************
// *** DlHeaderShort ***********************************************
// ***************************************************************

// TODO: To make it generic for UL and DL!

export interface I_DlHeaderShort {                 // 2 bytes
    type:                    E_DlMsgType,   // 1 byte
    _type?:               string,
    ackToken:                number,        // 4 bits [7-4]
    optData:                 number,        // 4 bits [3-0]
}
export class DlHeaderShort extends BufferTempl<I_DlHeaderShort> implements I_DlHeaderShort {

    // *** type ***
    set type(x:E_DlMsgType) {
        assert.ok(x in E_DlMsgType, 'DlHeaderShort.type: invalid value');
        this._props.type = x;
        this._props._type = E_DlMsgType[x];
    }
    get type():E_DlMsgType {
        return this._props.type;
    }

    // *** ackToken ***
    set ackToken(x:number) {
        assert.ok( (x & 0x0f) === x, 'DlHeaderShort.ackToken: Invalid value!' );
        this._props.ackToken = x;
    }
    get ackToken():number {
        return this._props.ackToken;
    }

    // *** optData ***
    set optData(x:number) {
        assert.ok((x & 0x0f) === x, 'DlHeaderShort.optData: invalid value');
        this._props.optData = x;
    }
    get optData():number {
        return this._props.optData;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 2, 'DlHeaderShort.setFromBuffer(): Invalid buffer legth!');
        this.type     = x[0];
        this.ackToken = x[1] >>> 4;
        this.optData  = x[1] & 0x0f;
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(2);
        y[0] = this.type;
        y[1] = (this.ackToken << 4) | this.optData;
        return y;    
    }

}

// ***************************************************************
// *** UlMsg_FramePending *******************************************
// ***************************************************************

export interface I_MsgFramePending {
    header:                  UlHeaderShort,     // 2 bytes
}
export class UlMsg_FramePending extends BufferTempl<I_MsgFramePending> implements I_MsgFramePending {

    // *** header ***
    set header(x:UlHeaderShort) {
        assert.ok(x.type === E_UlMsgType.FRAME_PENDING, 'UlMsg_FramePending.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():UlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 2, 'UlMsg_FramePending.setFromBuffer(): Invalid buffer legth!');
        this.header = new UlHeaderShort(x);
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}

// ***************************************************************
// *** UlMsg_PosGPSFix **********************************************
// ***************************************************************

export interface I_MsgPosGPSFix {             // 16 bytes
    header:                  Header,          // 5 bytes
    age:                     number,          // 1 byte
    latitude:                number,          // 3 bytes
    longitude:               number,          // 3 bytes
    ehpe:                    number,          // 1 byte
    encryptedPos:            Buffer,          // 3 bytes 
}
export class UlMsg_PosGPSFix extends BufferTempl<I_MsgPosGPSFix> implements I_MsgPosGPSFix {

    // *** header ***
    set header(x:Header) {
        assert.ok(x.type       === E_UlMsgType.POSITION, 'UlMsg_PosGPSFix.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.GPS_FIX, 'UlMsg_PosGPSFix.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** age ***
    set age(x:number) {
        assert.ok( (0<=x) && (x<=2040), 'UlMsg_PosGPSFix.age: Invalid value!')
        this._props.age = x;
    }
    get age():number {
        return this._props.age;
    }

    // *** latitude ***
    set latitude(x:number) {
        assert.ok((-90<=x) && (x<=90), 'UlMsg_PosGPSFix.latitude: Invalid value!')
        this._props.latitude = x;
    }
    get latitude():number {
        return this._props.latitude;
    }

    // *** longitude ***
    set longitude(x:number) {
        assert.ok((-180<=x) && (x<=180), 'UlMsg_PosGPSFix.longitude: Invalid value!')
        this._props.longitude = x;
    }
    get longitude():number {
        return this._props.longitude;
    }

    // *** ehpe ***
    set ehpe(x:number) {
        assert.ok( (0<=x) && (x<=1000), 'UlMsg_PosGPSFix.ehpe: Invalid value!'); 
        this._props.ehpe = x;
    }
    get ehpe():number {
        return this._props.ehpe;
    }

    // *** encrypted ***
    set encryptedPos(x:Buffer) {
        assert.ok( x.length === 3, 'UlMsg_PosGPSFix.encryptedPos: Invalid Buffer length!')
        this._props.encryptedPos = x;
    }
    get encryptedPos():Buffer {
        return this._props.encryptedPos;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 16, 'UlMsg_PosGPSFix.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0,5));

        this.age = mt_value_decode(x[5], 0, 2040, 8, 0);

        let l: number; 
        l = (x[6]<<24) | (x[7]<<16) | (x[8]<<8);
        if (l > 0x7fffffff) l -= 0x100000000;
        this.latitude = l/10000000;
        l = (x[9]<<24) | (x[10]<<16) | (x[11]<<8);
        if (l > 0x7fffffff) l -= 0x100000000;
        this.longitude = l/10000000;

        this.ehpe = mt_value_decode(x[12], 0, 1000, 8, 0);
        this.encryptedPos = Buffer.from(x.slice(13,16)); 
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(16);
        this.header.toBuffer().copy(y);
        y[5] = mt_value_encode(this.age, 0, 2040, 8, 0);

        let l:number;
        l = Math.round(this.latitude * 10000000);
        if (l < 0) { l += 0x100000000; }
        y[6]  = (l>>24) & 0xff;
        y[7]  = (l>>16) & 0xff;
        y[8]  = (l>> 8) & 0xff; 
        l = Math.round(this.longitude * 10000000);
        if (l < 0) { l += 0x100000000 };
        y[9]  = (l>>24) & 0xff;
        y[10] = (l>>16) & 0xff;
        y[11] = (l>> 8) & 0xff;

        y[12] = mt_value_encode(this.ehpe, 0, 1000, 8, 0);
        this.encryptedPos.copy(y, 13);

        return y;
    }

}

// ***************************************************************
// *** UlMsg_PosGPSTimeout ******************************************
// ***************************************************************

export interface I_MsgPosGPSTimeout {                  // 10 bytes
    header:                  Header,            // 5 bytes
    cause:                   E_GPSTimeoutCause, // 1 byte
    _cause?:                 string,
    carrierOverNoise:        number[],          // 4 x 1 byte
}
export class UlMsg_PosGPSTimeout extends BufferTempl<I_MsgPosGPSTimeout> implements I_MsgPosGPSTimeout {

    // *** header ***
    set header(x:Header) {
        assert.ok(x.type       === E_UlMsgType.POSITION, 'UlMsg_PosGPSTimeout.header: Invalid MessageType!');
        assert.ok(x.optData    === E_PositionInformation.GPS_TIMEOUT, 'UlMsg_PosGPSTimeout.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** cause ***
    set cause(x:E_GPSTimeoutCause) {
        assert.ok(x in E_GPSTimeoutCause, 'UlMsg_PosGPSTimeout.cause: invalid value');
        this._props.cause = x;
        this._props._cause = E_GPSTimeoutCause[x];
    }
    get cause():E_GPSTimeoutCause {
        return this._props.cause;
    }

    // *** carrierOverNoise ***
    set carrierOverNoise(x:number[]) {
        for (let i=0; i<4; i++) {
            assert.ok( (0<=x[i]) && (x[i]<=2040), 'UlMsg_PosGPSTimeout.carrierOverNoise: invalid value');
        }
        this._props.carrierOverNoise = x;
    }
    get carrierOverNoise():number[] {
        return this._props.carrierOverNoise;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 10, 'UlMsg_PosGPSTimeout.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0,5));
        this.cause = x[5];
        let carrierOverNoise: number[] = [];
        for (let i=0; i<4; i++) {
            carrierOverNoise.push(
                mt_value_decode(x[6+i], 0, 2040, 8, 0)
            )
        }
        this.carrierOverNoise = carrierOverNoise
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(10);
        this.header.toBuffer().copy(y);
        y[5] = this.cause;
        for (let i=0; i<4; i++) {
            y[6+i] = mt_value_encode(this.carrierOverNoise[i], 0, 2040, 8, 0)
        }
        return y;    
    }

}

// ***************************************************************
// *** UlMsg_PosWiFiTimeout *****************************************
// ***************************************************************

export interface I_MsgPosWiFiTimeout {               // 11 bytes
    header:                  Header,          // 5 bytes
    v_bat:                   number[],        // 6 x 1 byte
}
export class UlMsg_PosWiFiTimeout extends BufferTempl<I_MsgPosWiFiTimeout> implements I_MsgPosWiFiTimeout {

    // *** header ***
    set header(x:Header) {
        assert.ok(x.type    === E_UlMsgType.POSITION, 'UlMsg_PosWiFiTimeout.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.WIFI_TIMEOUT, 'UlMsg_PosWiFiTimeout.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** v_bat ***
    set v_bat(x:number[]) {
        for (let i=0; i<6; i++) {
            assert.ok( (2.8<=x[i]) && (x[i]<=4.2), 'UlMsg_PosWiFiTimeout.v_bat: invalid value');
        }
        this._props.v_bat = x;
    }
    get v_bat():number[] {
        return this._props.v_bat;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 11, 'UlMsg_PosWiFiTimeout.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0,5));

        let v_bat: number[] = [];
        for (let i=0; i<6; i++) {
            v_bat.push(
                mt_value_decode(x[5+i], 2.8, 4.2, 8, 2)
            )
        }
        this.v_bat = v_bat;
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(11);
        this.header.toBuffer().copy(y);
        for (let i=0; i<6; i++) {
            y[5+i] = mt_value_encode(this.v_bat[i], 2.8, 4.2, 8, 2)
        }
        return y;
    }

}

// ***************************************************************
// *** UlMsg_PosWiFiFailure *****************************************
// ***************************************************************

export interface I_MsgPosWiFiFailure {               // 12 bytes
    header:                  Header,          // 5 bytes
    v_bat:                   number[],        // 6 x 1 byte
    error:                   E_WiFiFailure,   // 1 byte
    _error?:              string,
}
export class UlMsg_PosWiFiFailure extends BufferTempl<I_MsgPosWiFiFailure> implements I_MsgPosWiFiFailure {

    // *** header ***
    set header(x:Header) {
        assert.ok(x.type       === E_UlMsgType.POSITION, 'UlMsg_PosWiFiFailure.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.WIFI_FAILURE, 'UlMsg_PosWiFiFailure.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** v_bat ***
    set v_bat(x:number[]) {
        for (let i=0; i<6; i++) {
            assert.ok( (2.8<=x[i]) && (x[i]<=4.2), 'UlMsg_PosWiFiFailure.v_bat: invalid value');
        }
        this._props.v_bat = x;
    }
    get v_bat():number[] {
        return this._props.v_bat;
    }

    // *** error ***
    set error(x:E_WiFiFailure) {
        assert.ok( x in E_WiFiFailure, 'UlMsg_PosWiFiFailure.error: invalid value');
        this._props.error = x;
        this._props._error = E_WiFiFailure[x];
    }
    get error():E_WiFiFailure {
        return this._props.error;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 12, 'UlMsg_PosWiFiFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0,5));

        let v_bat: number[] = [];
        for (let i=0; i<6; i++) {
            v_bat.push(
                mt_value_decode(x[5+i], 2.8, 4.2, 8, 2)
            )
        }
        this.v_bat = v_bat;

        this.error = x[11];
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(12);
        this.header.toBuffer().copy(y);
        for (let i=0; i<6; i++) {
            y[5+i] = mt_value_encode(this.v_bat[i], 2.8, 4.2, 8, 2)
        }
        y[11] = this.error;
        return y;
    }

}



// ***************************************************************
// *** WiFiBSSIDs *************************************************
// ***************************************************************

export interface I_WiFiBSSIDs {               // 7 bytes
    bssid:                      string,        // 6 bytes
    rssi:                       number,        // 1 byte
}
export class WiFiBSSIDs extends BufferTempl<I_WiFiBSSIDs> implements I_WiFiBSSIDs {

    // *** bssid ***
    set bssid(x:string) {
        assert.ok( x.match(/^[0-9A-Fa-f]{12}$/), 'WiFiBSSIDs.bssid: Invalid value!');
        this._props.bssid = x.toLowerCase();
    }
    get bssid():string {
        return this._props.bssid;
    }

    // *** rssi ***
    set rssi(x:number) {
        assert.ok( (-0x7f<=x) && (x<=0x7f), 'WiFiBSSIDs.rssi: Invalid value!');
        this._props.rssi = x;
    }
    get rssi():number {
        return this._props.rssi;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 7, 'WiFiBSSIDs.setFromBuffer(): Invalid buffer legth!');
        this.bssid = x.slice(0,6).toString('hex');
        this.rssi  = x.readInt8(6);
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(7);
        for (let i=0; i<6; i++) {
            let s = this.bssid;
            y[i] = parseInt(s.substring(2*i, 2*(i+1)), 16);
        }
        y.writeInt8(this.rssi, 6);
        return y;
    }
}



// ***************************************************************
// *** UlMsg_PosWiFiBSSIDs ******************************************
// ***************************************************************

export interface I_MsgPosWiFiBSSIDs {                // 34 bytes
    header:                  Header,          // 5 bytes
    age:                     number,          // 1 byte
    wifiHotspots:            WiFiBSSIDs[],
}
export class UlMsg_PosWiFiBSSIDs extends BufferTempl<I_MsgPosWiFiBSSIDs> implements I_MsgPosWiFiBSSIDs {

    // *** header ***
    set header(x:Header) {
        assert.ok(x.type       === E_UlMsgType.POSITION, 'UlMsg_PosWiFiBSSIDs.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.WIFI_BSSIDS, 'UlMsg_PosWiFiBSSIDs.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** age ***
    set age(x:number) {
        assert.ok( (0<=x) && (x<=2040), 'UlMsg_PosWiFiBSSIDs.age: Invalid value!');
        this._props.age = x;
    }
    get age():number {
        return this._props.age;
    }

    // *** wifiHotspots ***
    set wifiHotspots(x:WiFiBSSIDs[]) {
        assert.ok( x.length === 4, 'UlMsg_PosWiFiBSSIDs.wifiHotspots: Invalid value!');
        this._props.wifiHotspots = x;
    }
    get wifiHotspots():WiFiBSSIDs[] {
        return this._props.wifiHotspots;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 34, 'UlMsg_PosWiFiBSSIDs.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0,5));
        this.age = mt_value_decode(x[5], 0, 2040, 8, 0);

        let wifiHotspots: WiFiBSSIDs[] = [];
        for (let i=0; i<4; i++) {
            wifiHotspots.push( 
                new WiFiBSSIDs( x.slice(6+(i*7), 13+(i*7)) )
            );
        }
        this.wifiHotspots = wifiHotspots;

    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(34);
        this.header.toBuffer().copy(y);
        y[5] = mt_value_decode(this.age, 0, 2040, 8, 0);

        for (let i=0; i<4; i++) {
            this.wifiHotspots[i].toBuffer().copy(y, 6+i*7);
        }
        return y;
    }

}

// ***************************************************************
// *** UlMsg_PosBLEFailure ******************************************
// ***************************************************************

export interface I_MsgPosBLEFailure {                // 6 bytes
    header:                  Header,          // 5 bytes
    error:                   E_BLEFailure,    // 1 byte
    _error?:                 string,
}
export class UlMsg_PosBLEFailure extends BufferTempl<I_MsgPosBLEFailure> implements I_MsgPosBLEFailure {

    // *** header ***
    set header(x:Header) {
        assert.ok(x.type       === E_UlMsgType.POSITION, 'UlMsg_PosBLEFailure.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.BLE_BACON_FAILURE, 'UlMsg_PosBLEFailure.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** error ***
    set error(x:E_BLEFailure) {
        assert.ok(x in E_BLEFailure, 'UlMsg_PosBLEFailure.error: Invalid value!');
        this._props.error = x;
        this._props._error = E_BLEFailure[x];
    }
    get error():E_BLEFailure {
        return this._props.error;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 6, 'UlMsg_PosBLEFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0,5));
        this.error = x[5];
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(6);
        this.header.toBuffer().copy(y);
        y[5] = this.error;
        return y;
    }

}

// ****************************************************************
// *** UlMsg_EnergyStatus ********************************************
// ****************************************************************

export interface I_MsgEnergyStatus {           // 17 bytes
    header:                  Header,    // 5 bytes
    gpsOnTime:               number,    // 4 bytes
    gpsStabdbyTime:          number,    // 4 bytes
    wifiScans:               number,    // 4 bytes
}
export class UlMsg_EnergyStatus extends BufferTempl<I_MsgEnergyStatus> implements I_MsgEnergyStatus {

    // *** header ***
    set header(x:Header) {
        assert.ok(x.type       === E_UlMsgType.ENERGY_STATUS, 'UlMsg_EnergyStatus.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** gpsOnTime ***
    set gpsOnTime(x:number) {
        this._props.gpsOnTime = x;
    }
    get gpsOnTime():number {
        return this._props.gpsOnTime;
    }

    // *** gpsStabdbyTime ***
    set gpsStabdbyTime(x:number) {
        this._props.gpsStabdbyTime = x;
    }
    get gpsStabdbyTime():number {
        return this._props.gpsStabdbyTime;
    }

    // *** wifiScans ***
    set wifiScans(x:number) {
        this._props.wifiScans = x;
    }
    get wifiScans():number {
        return this._props.wifiScans;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 17, 'UlMsg_EnergyStatus.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0,5));
        this.gpsOnTime = x.readUInt32BE(5);
        this.gpsStabdbyTime = x.readUInt32BE(9);
        this.wifiScans = x.readUInt32BE(13);
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(17);
        this.header.toBuffer().copy(y);
        y.writeUInt32BE(this.gpsOnTime, 5);
        y.writeUInt32BE(this.gpsStabdbyTime, 9);
        y.writeUInt32BE(this.wifiScans, 13);
        return y;
    }

}

// ***************************************************************
// *** UlMsg_HeartBeat **********************************************
// ***************************************************************

// TODO: What is the format of fwVersion?
// TODO: What are the possible values of cause?

export interface I_MsgHeartBeat {                    // 6|9 bytes
    header:                  Header,          // 5 bytes
    cause:                   number,          // 1 byte
    fwVersion?:              string,          // 3 bytes (optional)
}
export class UlMsg_HeartBeat extends BufferTempl<I_MsgHeartBeat> implements I_MsgHeartBeat {

    // *** header ***
    set header(x:Header) {
        assert.ok(x.type       === E_UlMsgType.HEART_BEAT, 'UlMsg_HeartBeat.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** cause ***
    set cause(x:number) {
        this._props.cause = x;
    }
    get cause():number {
        return this._props.cause;
    }

    // *** fwVersion ***
    set fwVersion(x:string) {
        if (x === '') {
            if ('fwVersion' in this._props) {
                delete this._props.fwVersion
            }
        } else {
            assert.ok(x.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/), 'UlMsg_HeartBeat.fwVersion: invalid value!');
            let fwStrArray = x.split('.');
            let fwValArray: number[] = [];
            let fwVal: number;
            for (let i=0; i<3; i++) {
                fwVal = parseInt(fwStrArray[i]);
                assert.ok(isUint8(fwVal), 'UlMsg_HeartBeat.fwVersion: invalid value!');
                fwValArray.push(fwVal);
            }
            this._props.fwVersion = fwValArray.join('.');
        }
    }
    get fwVersion():string {
        if ('fwVersion' in this._props) {
            return this._props.fwVersion;    
        }
        return '';
    }

    setFromBuffer(x:Buffer) {
        let l = x.length;
        assert.ok([6, 9].includes(l), 'UlMsg_HeartBeat.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0,5));

        this.cause = x[5];

        if (l === 9) {
            this.fwVersion = x.slice(6,9).join('.');
        } else {
            this.fwVersion = '';
        }
    }
    toBuffer():Buffer {
        let l = (this.fwVersion == '') ? 6 : 9;
        let y = Buffer.allocUnsafe(l);
        this.header.toBuffer().copy(y);
        y[5] = this.cause;

        if (l = 9) {
            let fwVersionArray = this.fwVersion.split('.');
            for (let i=0; i<3; i++) {
                y[6+i] = parseInt(fwVersionArray[i]);
            }
        }
        return y;
    }

}

// ***************************************************************
// *** UlMsg_ActivityStatus *****************************************
// ***************************************************************

// TODO: what are the possible values of tag? What does it mean?

export interface I_MsgActivityStatus {               // 10 bytes
    header:                  Header,          // 5 bytes
    tag:                     E_Tag,          // 1 byte =1
    activityCount:           number,          // 4 bytes
}
export class UlMsg_ActivityStatus extends BufferTempl<I_MsgActivityStatus> implements I_MsgActivityStatus {

    // *** header ***
    set header(x:Header) {
        assert.ok(x.type       === E_UlMsgType.ACTIVITY_OR_CONFIG, 'UlMsg_ActivityStatus.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** tag ***
    set tag(x:E_Tag) {
        assert.ok(x === E_Tag.ACTIVITY, 'UlMsg_ActivityStatus.tag(): Invalid value!');
        this._props.tag = x;
        this._props._tag = E_Tag[x];
    }
    get tag():E_Tag {
        return this._props.tag;
    }

    // *** activityCount ***
    set activityCount(x:number) {
        assert.ok(x >= 0, 'UlMsg_ActivityStatus.activityCount(): Invalid value!');
        this._props.activityCount = x;
    }
    get activityCount():number {
        return this._props.activityCount;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 10, 'UlMsg_ActivityStatus.setFromBuffer(): Invalid buffer legth!');
        this.header = new Header(x.slice(0,5));
        this.tag = x[5];
        this.activityCount = x.readUInt32BE(6);
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(10);
        this.header.toBuffer().copy(y);
        y[5] = this.tag;
        y.writeUInt32BE(this.activityCount, 6);
        return y;
    }

}

// ***************************************************************
// *** Parameter *************************************************
// ***************************************************************

export interface I_Parameter {                       // 5 bytes
    id:                      E_ParameterId, // 1 byte
    _id?:                 string,
    value:                   number|Param_ConfigFlags,          // 4 bytes
}
export class Parameter extends BufferTempl<I_Parameter> implements I_Parameter {

    // *** id ***
    set id(x:E_ParameterId) {
        assert.ok(x in E_ParameterId, 'Parameter.id: Invalid value!');
        this._props.id = x;
        this._props._id = E_ParameterId[x];
}
    get id():E_ParameterId {
        return this._props.id;
    }

    // *** value ***
    set value(x:number|Param_ConfigFlags) {
        switch (this.id) {
            case E_ParameterId.CONFIG_FLAGS:
                this._props.value = new Param_ConfigFlags(x);
                break;
            default:
                this._props.value = x;
                break;
        }
    }
    get value():number|Param_ConfigFlags {
        switch (this.id) {
            case E_ParameterId.CONFIG_FLAGS:
                return this._props.value;
                break;
            default:
                return this._props.value;
                break;
        }
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 5, 'Parameter.setFromBuffer(): Invalid buffer legth!');
        this.id = x[0];
        switch (this.id) {
            case E_ParameterId.CONFIG_FLAGS:
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
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(5);
        y[0] = this.id;

        switch (this.id) {
            case E_ParameterId.CONFIG_FLAGS:
                y[1] = 0; y[2] = 0; y[3] = 0; 
                y[4] = (<Param_ConfigFlags>(this.value)).toValue();
                // let o:Param_ConfigFlags =<Param_ConfigFlags>this.value;
                // y[4] |= o.BLEAdvertisingActive         ? 0b100000 : 0;
                // y[4] |= o.WiFiPayloadCyphered          ? 0b10000 : 0;
                // y[4] |= o.ConfigReqsAcknoledged        ? 0b1000 : 0;
                // y[4] |= o.DoubleShortButtonPressForSOS ? 0b100 : 0;
                // y[4] |= o.LongButtonPressToSwitchOff   ? 0b10 : 0;
                // y[4] |= o.FramePendingMechanismActive  ? 0b1 : 0;
                break;
            default:
                let v:number =<number>this.value;
                y[1] = (v >> 24) & 0xff;
                y[2] = (v >> 16) & 0xff;
                y[3] = (v >>  8) & 0xff;
                y[4] = (v      ) & 0xff;
                break;
        }
        return y;
    }
}

// ***************************************************************
// *** UlMsg_ConfigReport ******************************************
// ***************************************************************

// TODO: what are the possible values of tag? What does it mean?

export interface I_MsgConfigReport {          // 11..31 bytes
    header:                  Header,          // 5 bytes
    tag:                     E_Tag,           // 1 byte =2
    params:                  Parameter[]      // n x 5 bytes, n=1..5
}
export class UlMsg_ConfigReport extends BufferTempl<I_MsgConfigReport> implements I_MsgConfigReport {
   
    // *** header ***
    set header(x:Header) {
        assert.ok(x.type   === E_UlMsgType.ACTIVITY_OR_CONFIG, 'UlMsg_ConfigReport.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():Header {
        return this._props.header;
    }

    // *** tag ***
    set tag(x:E_Tag) {
        assert.ok(x === E_Tag.CONFIG, 'UlMsg_ConfigReport.tag(): Invalid value!');
        this._props.tag = x;
        this._props._tag = E_Tag[x];
    }
    get tag():E_Tag {
        return this._props.tag;
    }

    // *** params ***
    set params(x:Parameter[]) {
        this._props.params = x;
    }
    get params():Parameter[] {
        return this._props.params;
    }

    setFromBuffer(x:Buffer) {
        let paramsLength = (x.length - 6) / 5;
        assert.ok( [1,2,3,4,5].includes(paramsLength), 'UlMsg_ConfigReport.setFromBuffer(): Invalid buffer legth!');

        this.header = new Header(x.slice(0,5));

        this.tag = x[5];

        let params: Parameter[] = [];
        for (let i=0; i<paramsLength; i++) {
            params.push( 
                new Parameter( x.slice(6+(i*5), 11+(i*5)) )
            );
        }

        this.params = params;

    }
    toBuffer():Buffer {
        let paramsLength = this.params.length;
        let y = Buffer.allocUnsafe(6+(paramsLength*5));
        this.header.toBuffer().copy(y);
        y[5] = this.tag;
        for (let i=0; i<paramsLength; i++) {
            this.params[i].toBuffer().copy(y, 6+(i*5));
        }
        return y;
    }

}

// ****************************************************************
// *** UlMsg_Shutdown ************************************************
// ****************************************************************

// TODO: Verify if the implementation below is correct!

export interface I_MsgShutdown {
    header:                  UlHeaderShort,     // 2 bytes
    // The documentation does not say anything about the additional fields of SHUTHDOWN messages
}
export class UlMsg_Shutdown extends BufferTempl<I_MsgShutdown> implements I_MsgShutdown {

    // *** header ***
    set header(x:UlHeaderShort) {
        assert.ok(x.type === E_UlMsgType.SHUTDOWN, 'UlMsg_Shutdown.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():UlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        // assert.ok(x.length === 2, 'UlMsg_Shutdown.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of SHUTHDOWN messages
        this.header = new UlHeaderShort(x.slice(0,2));
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}

// ****************************************************************
// *** UlMsg_Debug ***************************************************
// ****************************************************************

// TODO: Verify if the implementation below is correct!

export interface I_MsgDebug {
    header:                  UlHeaderShort,     // 2 bytes
    // The documentation does not say anything about the additional fields of DEBUG messages
}
export class UlMsg_Debug extends BufferTempl<I_MsgDebug> implements I_MsgDebug {

    // *** header ***
    set header(x:UlHeaderShort) {
        assert.ok(x.type === E_UlMsgType.DEBUG, 'UlMsg_Debug.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():UlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        // assert.ok(x.length === 2, 'UlMsg_Debug.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of DEBUG messages
        this.header = new UlHeaderShort(x.slice(0,2));
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}

// ***************************************************************
// *** DlMsg_PosOnDem *********************************************
// ***************************************************************

export interface I_DlMsgPosOnDem {
    header:                  DlHeaderShort,     // 2 bytes
}
export class DlMsg_PosOnDem extends BufferTempl<I_DlMsgPosOnDem> implements I_DlMsgPosOnDem {

    // *** header ***
    set header(x:DlHeaderShort) {
        assert.ok(x.type === E_DlMsgType.POSITION_ON_DEMAND, 'DlMsg_PosOnDem.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():DlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 2, 'DlMsg_PosOnDem.setFromBuffer(): Invalid buffer legth!');
        this.header = new DlHeaderShort(x);
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}

// ***************************************************************
// *** DlMsg_SetMode **********************************************
// ***************************************************************

export interface I_DlMsgSetMode {                    // 3 bytes
    header:                  DlHeaderShort,     // 2 bytes
    mode:                    E_OperatingMode, // 1 byte
    _mode?:               string,
}
export class DlMsg_SetMode extends BufferTempl<I_DlMsgSetMode> implements I_DlMsgSetMode {

    // *** header ***
    set header(x:DlHeaderShort) {
        assert.ok(x.type === E_DlMsgType.SET_MODE, 'DlMsg_SetMode.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():DlHeaderShort {
        return this._props.header;
    }

    // *** mode ***
    set mode(x:E_OperatingMode) {
        assert.ok(x in E_OperatingMode, 'DlMsg_SetMode.mode: Invalid value!');
        this._props.mode = x;
        this._props._mode = E_OperatingMode[x];
    }
    get mode():E_OperatingMode {
        return this._props.mode;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 3, 'DlMsg_SetMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new DlHeaderShort(x.slice(0,2));
        this.mode = x[2];
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(3);
        this.header.toBuffer().copy(y);
        y[2] = this.mode;
        return y;
    }

}

// ***************************************************************
// *** DlMsg_ReqConf **********************************************
// ***************************************************************

export interface I_DlMsgReqConf {                       // 2..22
    header:                  DlHeaderShort,        // 2 bytes
    paramIDs:                E_ParameterId[],  // 0..20 bytes
    _paramIDs?:           string[],
}
export class DlMsg_ReqConf extends BufferTempl<I_DlMsgReqConf> implements I_DlMsgReqConf {

    // *** header ***
    set header(x:DlHeaderShort) {
        assert.ok(x.type === E_DlMsgType.REQUEST_CONFIGURATION, 'DlMsg_ReqConf.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():DlHeaderShort {
        return this._props.header;
    }

    // *** paramIDs ***
    set paramIDs(x:E_ParameterId[]) {
        let paramIDsLength = x.length;
        assert.ok(paramIDsLength<=20, 'DlMsg_ReqConf.paramIDs: Invalid length!');
        let _x: string[] = [];
        for (let i in x) {
            assert.ok(x[i] in E_ParameterId, 'DlMsg_ReqConf.paramIDs: Invalid value!');
            _x.push(E_ParameterId[i]);
        }
        this._props.paramIDs = x;
        this._props._paramIDs = _x;
    }
    get paramIDs():E_ParameterId[] {
        return this._props.paramIDs;
    }

    setFromBuffer(x:Buffer) {
        let l = x.length;
        assert.ok( (2<=l) && (l<=22), 'DlMsg_ReqConf.setFromBuffer(): Invalid buffer legth!');
        this.header = new DlHeaderShort(x.slice(0,2));

        let paramIDs: E_ParameterId[] = [];
        for (let i=2; i<l; i++) {
            paramIDs.push( x[i] );
        }

        this.paramIDs = paramIDs;

    }
    toBuffer():Buffer {
        let paramIDsLength = this.paramIDs.length; 
        let y = Buffer.allocUnsafe(2+paramIDsLength);
        this.header.toBuffer().copy(y);
        for (let i=0; i<paramIDsLength; i++) {
            y[2+i] = this.paramIDs[i];
        }
        return y;
    }

}

// ***************************************************************
// *** DlMsg_SOSMode **********************************************
// ***************************************************************

export interface I_DlMsgSOSMode {
    header:                  DlHeaderShort,     // 2 bytes
}
export class DlMsg_SOSMode extends BufferTempl<I_DlMsgSOSMode> implements I_DlMsgSOSMode {

    // *** header ***
    set header(x:DlHeaderShort) {
        assert.ok((x.type === E_DlMsgType.START_SOS_MODE) || (x.type === E_DlMsgType.STOP_SOS_MODE), 'DlMsg_SOSMode.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():DlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 2, 'DlMsg_SOSMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new DlHeaderShort(x);
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}

// ***************************************************************
// *** DlMsg_SetParam *********************************************
// ***************************************************************

export interface I_DlMsgSetParam {                   // 7..27
    header:                  DlHeaderShort,     // 2 bytes
    params:                  Parameter[]      // n x 5 bytes, n= 1..5
}
export class DlMsg_SetParam extends BufferTempl<I_DlMsgSetParam> implements I_DlMsgSetParam {
   
    // *** header ***
    set header(x:DlHeaderShort) {
        assert.ok(x.type       === E_DlMsgType.SET_PARAM, 'DlMsg_SetParam.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():DlHeaderShort {
        return this._props.header;
    }

    // *** params ***
    set params(x:Parameter[]) {
        this._props.params = x;
    }
    get params():Parameter[] {
        return this._props.params;
    }

    setFromBuffer(x:Buffer) {
        let paramsLength = (x.length - 2) / 5;

        assert.ok( [1,2,3,4,5].includes(paramsLength), 'DlMsg_SetParam.setFromBuffer(): Invalid buffer legth!');

        this.header = new DlHeaderShort(x.slice(0,2));

        let params: Parameter[] = [];
        for (let i=0; i<paramsLength; i++) {
            params.push( 
                new Parameter( x.slice(2+(i*5), 7+(i*5)) )
            );
        }

        this.params = params;

    }
    toBuffer():Buffer {
        let paramsLength = this.params.length; 
        let y = Buffer.allocUnsafe(2+(paramsLength*5));
        this.header.toBuffer().copy(y);
        for (let i=0; i<paramsLength; i++) {
            this.params[i].toBuffer().copy(y, 2+(i*5));
        }
        return y;
    }

}

// ***************************************************************
// *** DlMsg_DebugCmd *********************************************
// ***************************************************************

export interface I_DlMsgDebugCmd {                   // 3 bytes
    header:                  DlHeaderShort,     // 2 bytes
    debugCmd:                E_DebugCmd,      // 1 byte
    _debugCmd?:            string,
}
export class DlMsg_DebugCmd extends BufferTempl<I_DlMsgDebugCmd> implements I_DlMsgDebugCmd {

    // *** header ***
    set header(x:DlHeaderShort) {
        assert.ok(x.type === E_DlMsgType.DEBUG_COMMAND, 'DlMsg_DebugCmd.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():DlHeaderShort {
        return this._props.header;
    }

    // *** debugCmd ***
    set debugCmd(x:E_DebugCmd) {
        assert.ok(x in E_DebugCmd, 'DlMsg_DebugCmd.debugCmd: Invalid value!');
        this._props.debugCmd = x;
        this._props._debugCmd = E_DebugCmd[x];
    }
    get debugCmd():E_DebugCmd {
        return this._props.debugCmd;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 3, 'DlMsg_DebugCmd.setFromBuffer(): Invalid buffer legth!');
        this.header = new DlHeaderShort(x.slice(0,2));
        this.debugCmd = x[2];
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(3);
        this.header.toBuffer().copy(y);
        y[2] = this.debugCmd;
        return y;
    }

}

export let decodeUlMsg = (buf: Buffer):string => {

    let msg: any;
    switch(buf[0]) {
        case E_UlMsgType.FRAME_PENDING:
            msg = new UlMsg_FramePending(buf);
            break;
        case E_UlMsgType.POSITION:
            switch(buf[4] & 0xf) {
                case E_PositionInformation.GPS_FIX:
                    msg = new UlMsg_PosGPSFix(buf);
                    break;
                case E_PositionInformation.GPS_TIMEOUT:
                    msg = new UlMsg_PosGPSTimeout(buf);
                    break;
                case E_PositionInformation.NO_MORE_USED:
                    msg = undefined;
                    break;
                case E_PositionInformation.WIFI_TIMEOUT:
                    msg = new UlMsg_PosWiFiTimeout(buf);
                    break;
                case E_PositionInformation.WIFI_FAILURE:
                    msg = new UlMsg_PosWiFiFailure(buf);
                    break;
                case E_PositionInformation.LPGPS_DATA1:
                    msg = undefined;
                    break;
                case E_PositionInformation.LPGPS_DATA2:
                    msg = undefined;
                    break;
                case E_PositionInformation.BLE_BACON_SCAN:
                    msg = undefined; //new UlMsg_(buf);
                    break;
                case E_PositionInformation.BLE_BACON_FAILURE:
                    msg = new UlMsg_PosBLEFailure(buf);
                    break;
                case E_PositionInformation.WIFI_BSSIDS:
                    msg = new UlMsg_PosWiFiBSSIDs(buf);
                    break;
                default:
                    msg = undefined;
                    break;
            }
            break;
        case E_UlMsgType.ENERGY_STATUS:
            msg = new UlMsg_EnergyStatus(buf);
            break;
        case E_UlMsgType.HEART_BEAT:
            msg = new UlMsg_HeartBeat(buf);
            break;
        case E_UlMsgType.ACTIVITY_OR_CONFIG:
            switch(buf[5]) {
                case E_Tag.ACTIVITY:
                    msg = new UlMsg_ActivityStatus(buf);
                    break;
                case E_Tag.CONFIG:
                    msg = new UlMsg_ConfigReport(buf);
                    break;
                default:
                    msg = undefined;
                    break;
            }
            break;
        case E_UlMsgType.SHUTDOWN:
            msg = new UlMsg_Shutdown(buf);
            break;
        case E_UlMsgType.DEBUG:
            msg = new UlMsg_Debug(buf);
            break;
        default:
            msg = undefined;
            break;
    }

    if (msg) {
        return msg.toJSON();
    } else {
        return JSON.stringify({ error: "Unknown message type: "+E_UlMsgType[buf[0]] }, null, 4);
    }

}




export let decodeDlMsg = (buf: Buffer):string => {
    let msg: any;
    switch(buf[0]) {
        case E_DlMsgType.POSITION_ON_DEMAND:
            msg = new DlMsg_PosOnDem(buf);
            break;
        case E_DlMsgType.SET_MODE:
            msg = new DlMsg_SetMode(buf);
            break;
        case E_DlMsgType.REQUEST_CONFIGURATION:
            msg = new DlMsg_ReqConf(buf);
            break;
        case E_DlMsgType.START_SOS_MODE:
        case E_DlMsgType.STOP_SOS_MODE:
            msg = new DlMsg_SOSMode(buf);
            break;
        case E_DlMsgType.SET_PARAM:
            msg = new DlMsg_SetParam(buf);
            break;
        case E_DlMsgType.DEBUG_COMMAND:
            msg = new DlMsg_DebugCmd(buf);
            break;
        default:
            msg = undefined;
            break;
    }

    if (msg) {
        return msg.toJSON();
    } else {
        return JSON.stringify({ error: "Unknown message type: "+E_UlMsgType[buf[0]] }, null, 4);
    }

}
