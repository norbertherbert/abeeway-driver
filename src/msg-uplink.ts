import * as assert from 'assert';

/* Importing Constants */
import { 
    E_UlMsgType, E_Tag, E_OperatingMode, E_PositionInformation, E_WiFiFailure,
    E_BLEFailure, E_DlMsgType, E_DebugCmd, E_GPSTimeoutCause, E_ParameterId, 
    C_ParameterId, E_Param_GeolocSensor, E_Param_GeolocMethod, E_Param_TransmitStrat,
} from './constants';

/* Importing Utils */
import { 
    mt_value_decode, mt_value_encode, isUint8, ValueTempl, BufferTempl,
} from './utils';

/* Importing Message Components */
import { 
    Param_ConfigFlags, Status, Header, UlHeaderShort, DlHeaderShort, WiFiBSSIDs, Parameter, 
} from './msg-components';


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
// *** UlMsg_PosBLEFailure ***************************************
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

export let decodeUlMsg = (buf: Buffer):object => {

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
        return msg.toComponents();
    } else {
        return { error: "Unknown message type: "+E_UlMsgType[buf[0]] };
    }

}
