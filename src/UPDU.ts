import * as assert from 'assert';
import { Buffer } from 'buffer';

/* Constants */
import { 
    E_UPDUType, E_Tag, E_OperatingMode, E_PositionInformation, E_WiFiFailure,
    E_BLEFailure, E_DPDUType, E_DebugCmd, E_GPSTimeoutCause, E_ParameterId, 
    C_ParamDescriptions, E_Param_GeolocSensor, E_Param_GeolocMethod, E_Param_TransmitStrat,
} from './constants';

/* Utils */
import { 
    PDUTemplate, mt_value_decode, mt_value_encode, isUint8,
} from './utils';

/* Component Protocol Data Units (CPDU) */
import { 
    CPDU_ParamConfigFlags, CPDU_Status, CPDU_Header, CPDU_UlHeaderShort, CPDU_DlHeaderShort, CPDU_WiFiBSSIDs, CPDU_Parameter, 
} from './CPDU';


// ***************************************************************
// *** UPDU_FramePending *******************************************
// ***************************************************************

export interface I_UPDU_FramePending {
    header:                  CPDU_UlHeaderShort,     // 2 bytes
}
export class UPDU_FramePending extends PDUTemplate<I_UPDU_FramePending> implements I_UPDU_FramePending {

    // *** header ***
    set header(x:CPDU_UlHeaderShort) {
        assert.ok(x.type === E_UPDUType.FRAME_PENDING, 'UPDU_FramePending.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_UlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 2, 'UPDU_FramePending.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_UlHeaderShort(x);
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}

// ***************************************************************
// *** UPDU_PosGPSFix **********************************************
// ***************************************************************

export interface I_UPDU_PosGPSFix {             // 16 bytes
    header:                  CPDU_Header,          // 5 bytes
    age:                     number,          // 1 byte
    latitude:                number,          // 3 bytes
    longitude:               number,          // 3 bytes
    ehpe:                    number,          // 1 byte
    encryptedPos:            Buffer,          // 3 bytes 
}
export class UPDU_PosGPSFix extends PDUTemplate<I_UPDU_PosGPSFix> implements I_UPDU_PosGPSFix {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.POSITION, 'UPDU_PosGPSFix.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.GPS_FIX, 'UPDU_PosGPSFix.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** age ***
    set age(x:number) {
        assert.ok( (0<=x) && (x<=2040), 'UPDU_PosGPSFix.age: Invalid value!')
        this._props.age = x;
    }
    get age():number {
        return this._props.age;
    }

    // *** latitude ***
    set latitude(x:number) {
        assert.ok((-90<=x) && (x<=90), 'UPDU_PosGPSFix.latitude: Invalid value!')
        this._props.latitude = x;
    }
    get latitude():number {
        return this._props.latitude;
    }

    // *** longitude ***
    set longitude(x:number) {
        assert.ok((-180<=x) && (x<=180), 'UPDU_PosGPSFix.longitude: Invalid value!')
        this._props.longitude = x;
    }
    get longitude():number {
        return this._props.longitude;
    }

    // *** ehpe ***
    set ehpe(x:number) {
        assert.ok( (0<=x) && (x<=1000), 'UPDU_PosGPSFix.ehpe: Invalid value!'); 
        this._props.ehpe = x;
    }
    get ehpe():number {
        return this._props.ehpe;
    }

    // *** encrypted ***
    set encryptedPos(x:Buffer) {
        assert.ok( x.length === 3, 'UPDU_PosGPSFix.encryptedPos: Invalid Buffer length!')
        this._props.encryptedPos = x;
    }
    get encryptedPos():Buffer {
        return this._props.encryptedPos;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 16, 'UPDU_PosGPSFix.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));

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
// *** UPDU_PosGPSTimeout ******************************************
// ***************************************************************

export interface I_UPDU_PosGPSTimeout {                  // 10 bytes
    header:                  CPDU_Header,            // 5 bytes
    cause:                   E_GPSTimeoutCause, // 1 byte
    _cause?:                 string,
    carrierOverNoise:        number[],          // 4 x 1 byte
}
export class UPDU_PosGPSTimeout extends PDUTemplate<I_UPDU_PosGPSTimeout> implements I_UPDU_PosGPSTimeout {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.POSITION, 'UPDU_PosGPSTimeout.header: Invalid MessageType!');
        assert.ok(x.optData    === E_PositionInformation.GPS_TIMEOUT, 'UPDU_PosGPSTimeout.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** cause ***
    set cause(x:E_GPSTimeoutCause) {
        assert.ok(x in E_GPSTimeoutCause, 'UPDU_PosGPSTimeout.cause: invalid value');
        this._props.cause = x;
        this._props._cause = E_GPSTimeoutCause[x];
    }
    get cause():E_GPSTimeoutCause {
        return this._props.cause;
    }

    // *** carrierOverNoise ***
    set carrierOverNoise(x:number[]) {
        for (let i=0; i<4; i++) {
            assert.ok( (0<=x[i]) && (x[i]<=2040), 'UPDU_PosGPSTimeout.carrierOverNoise: invalid value');
        }
        this._props.carrierOverNoise = x;
    }
    get carrierOverNoise():number[] {
        return this._props.carrierOverNoise;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 10, 'UPDU_PosGPSTimeout.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
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
// *** UPDU_PosWiFiTimeout *****************************************
// ***************************************************************

export interface I_UPDU_PosWiFiTimeout {               // 11 bytes
    header:                  CPDU_Header,          // 5 bytes
    v_bat:                   number[],        // 6 x 1 byte
}
export class UPDU_PosWiFiTimeout extends PDUTemplate<I_UPDU_PosWiFiTimeout> implements I_UPDU_PosWiFiTimeout {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type    === E_UPDUType.POSITION, 'UPDU_PosWiFiTimeout.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.WIFI_TIMEOUT, 'UPDU_PosWiFiTimeout.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** v_bat ***
    set v_bat(x:number[]) {
        for (let i=0; i<6; i++) {
            assert.ok( (2.8<=x[i]) && (x[i]<=4.2), 'UPDU_PosWiFiTimeout.v_bat: invalid value');
        }
        this._props.v_bat = x;
    }
    get v_bat():number[] {
        return this._props.v_bat;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 11, 'UPDU_PosWiFiTimeout.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));

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
// *** UPDU_PosWiFiFailure *****************************************
// ***************************************************************

export interface I_UPDU_PosWiFiFailure {               // 12 bytes
    header:                  CPDU_Header,          // 5 bytes
    v_bat:                   number[],        // 6 x 1 byte
    error:                   E_WiFiFailure,   // 1 byte
    _error?:              string,
}
export class UPDU_PosWiFiFailure extends PDUTemplate<I_UPDU_PosWiFiFailure> implements I_UPDU_PosWiFiFailure {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.POSITION, 'UPDU_PosWiFiFailure.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.WIFI_FAILURE, 'UPDU_PosWiFiFailure.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** v_bat ***
    set v_bat(x:number[]) {
        for (let i=0; i<6; i++) {
            assert.ok( (2.8<=x[i]) && (x[i]<=4.2), 'UPDU_PosWiFiFailure.v_bat: invalid value');
        }
        this._props.v_bat = x;
    }
    get v_bat():number[] {
        return this._props.v_bat;
    }

    // *** error ***
    set error(x:E_WiFiFailure) {
        assert.ok( x in E_WiFiFailure, 'UPDU_PosWiFiFailure.error: invalid value');
        this._props.error = x;
        this._props._error = E_WiFiFailure[x];
    }
    get error():E_WiFiFailure {
        return this._props.error;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 12, 'UPDU_PosWiFiFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));

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
// *** UPDU_PosWiFiBSSIDs ******************************************
// ***************************************************************

export interface I_UPDU_PosWiFiBSSIDs {                // 34 bytes
    header:                  CPDU_Header,          // 5 bytes
    age:                     number,          // 1 byte
    wifiHotspots:            CPDU_WiFiBSSIDs[],
}
export class UPDU_PosWiFiBSSIDs extends PDUTemplate<I_UPDU_PosWiFiBSSIDs> implements I_UPDU_PosWiFiBSSIDs {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.POSITION, 'UPDU_PosWiFiBSSIDs.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.WIFI_BSSIDS, 'UPDU_PosWiFiBSSIDs.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** age ***
    set age(x:number) {
        assert.ok( (0<=x) && (x<=2040), 'UPDU_PosWiFiBSSIDs.age: Invalid value!');
        this._props.age = x;
    }
    get age():number {
        return this._props.age;
    }

    // *** wifiHotspots ***
    set wifiHotspots(x:CPDU_WiFiBSSIDs[]) {
        assert.ok( x.length === 4, 'UPDU_PosWiFiBSSIDs.wifiHotspots: Invalid value!');
        this._props.wifiHotspots = x;
    }
    get wifiHotspots():CPDU_WiFiBSSIDs[] {
        return this._props.wifiHotspots;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 34, 'UPDU_PosWiFiBSSIDs.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
        this.age = mt_value_decode(x[5], 0, 2040, 8, 0);

        let wifiHotspots: CPDU_WiFiBSSIDs[] = [];
        for (let i=0; i<4; i++) {
            wifiHotspots.push( 
                new CPDU_WiFiBSSIDs( x.slice(6+(i*7), 13+(i*7)) )
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
// *** UPDU_PosBLEFailure ***************************************
// ***************************************************************

export interface I_UPDU_PosBLEFailure {                // 6 bytes
    header:                  CPDU_Header,          // 5 bytes
    error:                   E_BLEFailure,    // 1 byte
    _error?:                 string,
}
export class UPDU_PosBLEFailure extends PDUTemplate<I_UPDU_PosBLEFailure> implements I_UPDU_PosBLEFailure {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.POSITION, 'UPDU_PosBLEFailure.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.BLE_BACON_FAILURE, 'UPDU_PosBLEFailure.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** error ***
    set error(x:E_BLEFailure) {
        assert.ok(x in E_BLEFailure, 'UPDU_PosBLEFailure.error: Invalid value!');
        this._props.error = x;
        this._props._error = E_BLEFailure[x];
    }
    get error():E_BLEFailure {
        return this._props.error;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 6, 'UPDU_PosBLEFailure.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
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
// *** UPDU_EnergyStatus ********************************************
// ****************************************************************

export interface I_UPDU_EnergyStatus {           // 17 bytes
    header:                  CPDU_Header,    // 5 bytes
    gpsOnTime:               number,    // 4 bytes
    gpsStabdbyTime:          number,    // 4 bytes
    wifiScans:               number,    // 4 bytes
}
export class UPDU_EnergyStatus extends PDUTemplate<I_UPDU_EnergyStatus> implements I_UPDU_EnergyStatus {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.ENERGY_STATUS, 'UPDU_EnergyStatus.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_Header {
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
        assert.ok(x.length === 17, 'UPDU_EnergyStatus.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
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
// *** UPDU_HeartBeat **********************************************
// ***************************************************************

// TODO: What is the format of fwVersion?
// TODO: What are the possible values of cause?

export interface I_UPDU_HeartBeat {                    // 6|9 bytes
    header:                  CPDU_Header,          // 5 bytes
    cause:                   number,          // 1 byte
    fwVersion?:              string,          // 3 bytes (optional)
}
export class UPDU_HeartBeat extends PDUTemplate<I_UPDU_HeartBeat> implements I_UPDU_HeartBeat {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.HEART_BEAT, 'UPDU_HeartBeat.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_Header {
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
            assert.ok(x.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/), 'UPDU_HeartBeat.fwVersion: invalid value!');
            let fwStrArray = x.split('.');
            let fwValArray: number[] = [];
            let fwVal: number;
            for (let i=0; i<3; i++) {
                fwVal = parseInt(fwStrArray[i]);
                assert.ok(isUint8(fwVal), 'UPDU_HeartBeat.fwVersion: invalid value!');
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
        assert.ok([6, 9].includes(l), 'UPDU_HeartBeat.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));

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
// *** UPDU_ActivityStatus *****************************************
// ***************************************************************

// TODO: what are the possible values of tag? What does it mean?

export interface I_UPDU_ActivityStatus {               // 10 bytes
    header:                  CPDU_Header,          // 5 bytes
    tag:                     E_Tag,          // 1 byte =1
    activityCount:           number,          // 4 bytes
}
export class UPDU_ActivityStatus extends PDUTemplate<I_UPDU_ActivityStatus> implements I_UPDU_ActivityStatus {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.ACTIVITY_OR_CONFIG, 'UPDU_ActivityStatus.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** tag ***
    set tag(x:E_Tag) {
        assert.ok(x === E_Tag.ACTIVITY, 'UPDU_ActivityStatus.tag(): Invalid value!');
        this._props.tag = x;
        this._props._tag = E_Tag[x];
    }
    get tag():E_Tag {
        return this._props.tag;
    }

    // *** activityCount ***
    set activityCount(x:number) {
        assert.ok(x >= 0, 'UPDU_ActivityStatus.activityCount(): Invalid value!');
        this._props.activityCount = x;
    }
    get activityCount():number {
        return this._props.activityCount;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 10, 'UPDU_ActivityStatus.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
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
// *** UPDU_ConfigReport ******************************************
// ***************************************************************

// TODO: what are the possible values of tag? What does it mean?

export interface I_UPDU_ConfigReport {          // 11..31 bytes
    header:                  CPDU_Header,          // 5 bytes
    tag:                     E_Tag,           // 1 byte =2
    params:                  CPDU_Parameter[]      // n x 5 bytes, n=1..5
}
export class UPDU_ConfigReport extends PDUTemplate<I_UPDU_ConfigReport> implements I_UPDU_ConfigReport {
   
    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type   === E_UPDUType.ACTIVITY_OR_CONFIG, 'UPDU_ConfigReport.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** tag ***
    set tag(x:E_Tag) {
        assert.ok(x === E_Tag.CONFIG, 'UPDU_ConfigReport.tag(): Invalid value!');
        this._props.tag = x;
        this._props._tag = E_Tag[x];
    }
    get tag():E_Tag {
        return this._props.tag;
    }

    // *** params ***
    set params(x:CPDU_Parameter[]) {
        this._props.params = x;
    }
    get params():CPDU_Parameter[] {
        return this._props.params;
    }

    setFromBuffer(x:Buffer) {
        let paramsLength = (x.length - 6) / 5;
        assert.ok( [1,2,3,4,5].includes(paramsLength), 'UPDU_ConfigReport.setFromBuffer(): Invalid buffer legth!');

        this.header = new CPDU_Header(x.slice(0,5));

        this.tag = x[5];

        let params: CPDU_Parameter[] = [];
        for (let i=0; i<paramsLength; i++) {
            params.push( 
                new CPDU_Parameter( x.slice(6+(i*5), 11+(i*5)) )
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
// *** UPDU_Shutdown ************************************************
// ****************************************************************

// TODO: Verify if the implementation below is correct!

export interface I_UPDU_Shutdown {
    header:                  CPDU_UlHeaderShort,     // 2 bytes
    // The documentation does not say anything about the additional fields of SHUTHDOWN messages
}
export class UPDU_Shutdown extends PDUTemplate<I_UPDU_Shutdown> implements I_UPDU_Shutdown {

    // *** header ***
    set header(x:CPDU_UlHeaderShort) {
        assert.ok(x.type === E_UPDUType.SHUTDOWN, 'UPDU_Shutdown.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_UlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        // assert.ok(x.length === 2, 'UPDU_Shutdown.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of SHUTHDOWN messages
        this.header = new CPDU_UlHeaderShort(x.slice(0,2));
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}

// ****************************************************************
// *** UPDU_Debug ***************************************************
// ****************************************************************

// TODO: Verify if the implementation below is correct!

export interface I_UPDU_Debug {
    header:                  CPDU_UlHeaderShort,     // 2 bytes
    // The documentation does not say anything about the additional fields of DEBUG messages
}
export class UPDU_Debug extends PDUTemplate<I_UPDU_Debug> implements I_UPDU_Debug {

    // *** header ***
    set header(x:CPDU_UlHeaderShort) {
        assert.ok(x.type === E_UPDUType.DEBUG, 'UPDU_Debug.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_UlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        // assert.ok(x.length === 2, 'UPDU_Debug.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of DEBUG messages
        this.header = new CPDU_UlHeaderShort(x.slice(0,2));
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}



// ****************************************************************
// *** I_UPDU_LPGPS *********************************************
// ****************************************************************

export interface I_UPDU_LPGPS {
    header:                  CPDU_Header,          // 5 bytes
    // all additional values are proprietary
}
export class UPDU_LPGPS extends PDUTemplate<I_UPDU_LPGPS> implements I_UPDU_LPGPS {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.POSITION, 'UPDU_LPGPS.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        // assert.ok(x.length === 2, 'UPDU_Debug.setFromBuffer(): Invalid buffer legth!');
        // The documentation does not say anything about the length of DEBUG messages
        this.header = new CPDU_Header(x.slice(0,5));
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}



type UPDU_Generic = UPDU_FramePending | UPDU_PosGPSFix | UPDU_PosGPSTimeout | UPDU_PosWiFiTimeout | 
     UPDU_PosWiFiFailure | UPDU_PosWiFiBSSIDs | UPDU_PosBLEFailure | UPDU_EnergyStatus |
     UPDU_HeartBeat | UPDU_ActivityStatus | UPDU_ConfigReport | UPDU_Shutdown | UPDU_Debug;

export let createUPDU = (x: Buffer|string):UPDU_Generic => {

    let buf: Buffer;

    if ( typeof(x) == 'string' ) {
        buf = Buffer.from(x, 'hex');
    } else {
        buf = x;
    }

    let updu: any;
    switch(buf[0]) {
        case E_UPDUType.FRAME_PENDING:
            updu = new UPDU_FramePending(buf);
            break;
        case E_UPDUType.POSITION:
            switch(buf[4] & 0xf) {
                case E_PositionInformation.GPS_FIX:
                    updu = new UPDU_PosGPSFix(buf);
                    break;
                case E_PositionInformation.GPS_TIMEOUT:
                    updu = new UPDU_PosGPSTimeout(buf);
                    break;
                case E_PositionInformation.NO_MORE_USED:
                    updu = new UPDU_LPGPS(buf); // added here just for safety...
                    break;
                case E_PositionInformation.WIFI_TIMEOUT:
                    updu = new UPDU_PosWiFiTimeout(buf);
                    break;
                case E_PositionInformation.WIFI_FAILURE:
                    updu = new UPDU_PosWiFiFailure(buf);
                    break;
                case E_PositionInformation.LPGPS_DATA1:
                    updu = new UPDU_LPGPS(buf);
                    break;
                case E_PositionInformation.LPGPS_DATA2:
                    updu = new UPDU_LPGPS(buf);;
                    break;
                case E_PositionInformation.BLE_BACON_SCAN:
                    updu = new UPDU_LPGPS(buf); // TODO: verify the format, // added here just for safety...
                    break;
                case E_PositionInformation.BLE_BACON_FAILURE:
                    updu = new UPDU_PosBLEFailure(buf);
                    break;
                case E_PositionInformation.WIFI_BSSIDS:
                    updu = new UPDU_PosWiFiBSSIDs(buf);
                    break;
                default:
                    updu = undefined;
                    break;
            }
            break;
        case E_UPDUType.ENERGY_STATUS:
            updu = new UPDU_EnergyStatus(buf);
            break;
        case E_UPDUType.HEART_BEAT:
            updu = new UPDU_HeartBeat(buf);
            break;
        case E_UPDUType.ACTIVITY_OR_CONFIG:
            switch(buf[5]) {
                case E_Tag.ACTIVITY:
                    updu = new UPDU_ActivityStatus(buf);
                    break;
                case E_Tag.CONFIG:
                    updu = new UPDU_ConfigReport(buf);
                    break;
                default:
                    updu = undefined;
                    break;
            }
            break;
        case E_UPDUType.SHUTDOWN:
            updu = new UPDU_Shutdown(buf);
            break;
        case E_UPDUType.DEBUG:
            updu = new UPDU_Debug(buf);
            break;
        default:
            updu = undefined;
            break;
    }

    return updu;

}
