import * as assert from 'assert';
import { Buffer } from 'buffer';

/* Constants */
import { 
    E_UPDUType, E_Tag, E_OperatingMode, E_PositionInformation, E_WiFiFailure,
    E_BLEFailure, E_DPDUType, E_DebugCmd, E_GPSTimeoutCause, E_ParameterId, 
    C_ParameterId, E_Param_GeolocSensor, E_Param_GeolocMethod, E_Param_TransmitStrat,
} from './constants';

/* Utils */
import { 
    PDUTemplate, mt_value_decode, mt_value_encode, isUint8, 
} from './utils';


// ***************************************************************
// *** CPDU_ParamConfigFlags *****************************************
// ***************************************************************

export interface I_CPDU_ParamConfigFlags {                     // 1 byte
                                                           // bit 7-6
    BLEAdvertisingActive:                 boolean,         // bit 5
    WiFiPayloadCyphered:                  boolean,         // bit 4
    ConfigReqsAcknoledged:                boolean,         // bit 3
    DoubleShortButtonPressForSOS:         boolean,         // bit 2
    LongButtonPressToSwitchOff:           boolean,         // bit 1
    FramePendingMechanismActive:          boolean,         // bit 0
}
export class CPDU_ParamConfigFlags extends PDUTemplate<I_CPDU_ParamConfigFlags> implements I_CPDU_ParamConfigFlags {

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
// *** CPDU_Status ****************************************************
// ***************************************************************

export interface I_CPDU_Status {                          // 1 byte
    operatingMode:           E_OperatingMode, // bit 7-5
    _operatingMode?:      string,
    sosState:                boolean,         // bit 4
    trackingState:           boolean,         // bit 3
    movingState:             boolean,         // bit 2
    periodicPositionMessage: boolean,         // bit 1
    positionOnDemandMessage: boolean,         // bit 0
}
export class CPDU_Status extends PDUTemplate<I_CPDU_Status> implements I_CPDU_Status {

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
// *** CPDU_Header ****************************************************
// ***************************************************************

export interface I_CPDU_Header {                          // 5 bytes
    type:                    E_UPDUType,     // 1 byte
    _type?:                  string,
    status:                  CPDU_Status,          // 1 byte
    battery:                 number,          // 1 byte lo=2.8, hi=4.2, nbits=8, nresv=2, step=5.5mV
    temperature:             number,          // 1 byte lo=-44, hi=85,  nbits=8, nresv=0, step=0.5C
    ackToken:                number,                       // 4 bits [7-4]
    optData:                 number|E_PositionInformation, // 4 bits [3-0]
    _optData?:               string,
}
export class CPDU_Header extends PDUTemplate<I_CPDU_Header> implements I_CPDU_Header {

    // *** type ***
    // TODO: header should be read only!!!
    set type(x:E_UPDUType) {
        assert.ok(x in E_UPDUType, 'Header.type: invalid value');
        this._props.type = x;
        this._props._type = E_UPDUType[x];
    }
    get type():E_UPDUType {
        return this._props.type;
    }

    // *** status ***
    set status(x:CPDU_Status) {
        this._props.status = x;
    }
    get status():CPDU_Status {
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
            case E_UPDUType.POSITION:
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
        assert.ok(x[0] in E_UPDUType, 'Header.type: invalid value');
        this._props.type = x[0];
        this._props._type = E_UPDUType[x[0]];

        this.status = new CPDU_Status(x[1]);
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
// *** CPDU_UlHeaderShort *********************************************
// ***************************************************************

// TODO: To make it generic for UL and DL!

export interface I_CPDU_UlHeaderShort {                 // 2 bytes
    type:                    E_UPDUType,   // 1 byte
    _type?:               string,        
    ackToken:                number,        // 4 bits [7-4]
    optData:                 number,        // 4 bits [3-0]
}
export class CPDU_UlHeaderShort extends PDUTemplate<I_CPDU_UlHeaderShort> implements I_CPDU_UlHeaderShort {

    // *** type ***
    set type(x:E_UPDUType) {
        assert.ok(x in E_UPDUType, 'UlHeaderShort.type: invalid value');
        this._props.type = x;
        this._props._type = E_UPDUType[x];
    }
    get type():E_UPDUType {
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
// *** CPDU_DlHeaderShort *********************************************
// ***************************************************************

// TODO: To make it generic for UL and DL!

export interface I_CPDU_DlHeaderShort {                 // 2 bytes
    type:                    E_DPDUType,   // 1 byte
    _type?:               string,
    ackToken:                number,        // 4 bits [7-4]
    optData:                 number,        // 4 bits [3-0]
}
export class CPDU_DlHeaderShort extends PDUTemplate<I_CPDU_DlHeaderShort> implements I_CPDU_DlHeaderShort {

    // *** type ***
    set type(x:E_DPDUType) {
        assert.ok(x in E_DPDUType, 'DlHeaderShort.type: invalid value');
        this._props.type = x;
        this._props._type = E_DPDUType[x];
    }
    get type():E_DPDUType {
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
// *** CPDU_WiFiBSSIDs *************************************************
// ***************************************************************

export interface I_CPDU_WiFiBSSIDs {               // 7 bytes
    bssid:                      string,        // 6 bytes
    rssi:                       number,        // 1 byte
}
export class CPDU_WiFiBSSIDs extends PDUTemplate<I_CPDU_WiFiBSSIDs> implements I_CPDU_WiFiBSSIDs {

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
// *** CPDU_Parameter ********************************************
// ***************************************************************

export interface I_CPDU_Parameter {                       // 5 bytes
    id:                      E_ParameterId, // 1 byte
    _id?:                 string,
    value:                   number|CPDU_ParamConfigFlags,          // 4 bytes
}
export class CPDU_Parameter extends PDUTemplate<I_CPDU_Parameter> implements I_CPDU_Parameter {

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
    set value(x:number|CPDU_ParamConfigFlags) {
        switch (this.id) {
            case E_ParameterId.CONFIG_FLAGS:
                this._props.value = new CPDU_ParamConfigFlags(x);
                break;
            default:
                this._props.value = x;
                break;
        }
    }
    get value():number|CPDU_ParamConfigFlags {
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
                this.value = new CPDU_ParamConfigFlags(x[4]);
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
                y[4] = (<CPDU_ParamConfigFlags>(this.value)).toValue();
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

