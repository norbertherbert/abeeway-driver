import * as assert from 'assert';
import { Buffer } from 'buffer';

/* Constants */
import { 
    E_UPDUType, E_LastResetCause, E_Tag, E_OperatingMode, E_PositionInformation, E_WiFiFailure,
    E_BLEFailure, E_DPDUType, E_DebugCmd, E_GPSTimeoutCause, E_ParameterId, 
    C_ParamDescriptions, E_Param_GeolocSensor, E_Param_GeolocMethod, E_Param_TransmitStrat,
    E_ShutdownCause, E_EventValue, E_DebugAction,
} from './constants';

/* Utils */
import { 
    PDUTemplate, mt_value_decode, mt_value_encode, isUint8,
} from './utils';

/* Component Protocol Data Units (CPDU) */
import { 
    CPDU_ParamConfigFlags, CPDU_Status, CPDU_Header, CPDU_UlHeaderShort, 
    CPDU_DlHeaderShort, CPDU_WiFiBSSIDs, CPDU_BLEBeaconIDs, CPDU_Parameter, 
} from './CPDU';



// ***************************************************************
// *** UPDU_PosGPSFix **********************************************
// ***************************************************************

export interface I_UPDU_PosGPSFix {           // 16 bytes
    header:                  CPDU_Header,     // 5 bytes
    age:                     number,          // 1 byte
    latitude:                number,          // 3 bytes
    longitude:               number,          // 3 bytes
    ehpe:                    number,          // 1 byte
    encryptedPos:            Buffer,          // 0 | 3 bytes
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
        assert.ok( (x.length === 0) || (x.length === 3), 'UPDU_PosGPSFix.encryptedPos: Invalid Buffer length!')
        this._props.encryptedPos = x;
    }
    get encryptedPos():Buffer {
        return this._props.encryptedPos;
    }

    setFromBuffer(x:Buffer) {
        assert.ok((x.length === 13) || (x.length === 16), 'UPDU_PosGPSFix.setFromBuffer(): Invalid buffer legth!');
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
         
        let y: Buffer;
        if (this.encryptedPos.length == 0) {
            y = Buffer.allocUnsafe(13);
        } else {
            y = Buffer.allocUnsafe(16);
        }

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

        if (this.encryptedPos.length > 0) {
            this.encryptedPos.copy(y, 13);
        }

        return y;
    }

}

// ***************************************************************
// *** UPDU_PosGPSTimeout ******************************************
// ***************************************************************

export interface I_UPDU_PosGPSTimeout {         // 10 bytes
    header:                  CPDU_Header,       // 5 bytes
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

export interface I_UPDU_PosWiFiTimeout {      // 11 bytes
    header:                  CPDU_Header,     // 5 bytes
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

export interface I_UPDU_PosWiFiFailure {      // 12 bytes
    header:                  CPDU_Header,     // 5 bytes
    v_bat:                   number[],        // 6 x 1 byte
    error:                   E_WiFiFailure,   // 1 byte
    _error?:                 string,
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
        assert.ok(x in E_WiFiFailure, 'UPDU_PosWiFiFailure.error: invalid value');
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

export interface I_UPDU_PosWiFiBSSIDs {         // 34 bytes
    header:                  CPDU_Header,       // 5 bytes
    age:                     number,            // 1 byte
    wifiHotspots:            CPDU_WiFiBSSIDs[], //
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
        assert.ok( x.length <= 4, 'UPDU_PosWiFiBSSIDs.wifiHotspots: Invalid value!');
        this._props.wifiHotspots = x;
    }
    get wifiHotspots():CPDU_WiFiBSSIDs[] {
        return this._props.wifiHotspots;
    }

    setFromBuffer(x:Buffer) {
        assert.ok( [6, 13, 20, 27, 34].includes(x.length), 'UPDU_PosWiFiBSSIDs.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
        this.age = mt_value_decode(x[5], 0, 2040, 8, 0);

        let wifiHotspots: CPDU_WiFiBSSIDs[] = [];
        let len = (x.length-6)/7;
        for (let i=0; i<len; i++) {
            wifiHotspots.push( 
                new CPDU_WiFiBSSIDs( x.slice(6+(i*7), 13+(i*7)) )
            );
        }
        this.wifiHotspots = wifiHotspots;

    }
    toBuffer():Buffer {
        let len = this.wifiHotspots.length;
        let y = Buffer.allocUnsafe(6+(7*len));
        this.header.toBuffer().copy(y);
        y[5] = mt_value_decode(this.age, 0, 2040, 8, 0);

        for (let i=0; i<len; i++) {
            this.wifiHotspots[i].toBuffer().copy(y, 6+i*7);
        }
        return y;
    }

}

// ***************************************************************
// *** UPDU_PosBLEBeaconIDs **************************************
// ***************************************************************

export interface I_UPDU_PosBLEBeaconIDs {         // 34 bytes
    header:                  CPDU_Header,         // 5 bytes
    age:                     number,              // 1 byte
    bleBeacons:              CPDU_BLEBeaconIDs[], //
}
export class UPDU_PosBLEBeaconIDs extends PDUTemplate<I_UPDU_PosBLEBeaconIDs> implements I_UPDU_PosBLEBeaconIDs {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.POSITION, 'UPDU_PosBLEBeaconIDs.header: Invalid MessageType!');
        assert.ok(x.optData === E_PositionInformation.BLE_BEACONIDS, 'UPDU_PosBLEBeaconIDs.header: Invalid PositionInformation!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** age ***
    set age(x:number) {
        assert.ok( (0<=x) && (x<=2040), 'UPDU_PosBLEBeaconIDs.age: Invalid value!');
        this._props.age = x;
    }
    get age():number {
        return this._props.age;
    }

    // *** bleBeacons ***
    set bleBeacons(x:CPDU_BLEBeaconIDs[]) {
        assert.ok( x.length <= 4, 'UPDU_PosBLEBeaconIDs.bleBeacons: Invalid value!');
        this._props.bleBeacons = x;
    }
    get bleBeacons():CPDU_BLEBeaconIDs[] {
        return this._props.bleBeacons;
    }

    setFromBuffer(x:Buffer) {
        assert.ok([6, 13, 20, 27, 34].includes(x.length), 'UPDU_PosBLEBeaconIDs.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
        this.age = mt_value_decode(x[5], 0, 2040, 8, 0);

        let bleBeacons: CPDU_BLEBeaconIDs[] = [];
        let len = (x.length-6)/7;
        for (let i=0; i<len; i++) {
            bleBeacons.push( 
                new CPDU_BLEBeaconIDs( x.slice(6+(i*7), 13+(i*7)) )
            );
        }
        this.bleBeacons = bleBeacons;

    }
    toBuffer():Buffer {
        let len = this.bleBeacons.length;
        let y = Buffer.allocUnsafe(6+(7*len));
        this.header.toBuffer().copy(y);
        y[5] = mt_value_decode(this.age, 0, 2040, 8, 0);

        for (let i=0; i<len; i++) {
            this.bleBeacons[i].toBuffer().copy(y, 6+i*7);
        }
        return y;
    }

}

// ***************************************************************
// *** UPDU_PosBLEFailure ***************************************
// ***************************************************************

export interface I_UPDU_PosBLEFailure {       // 6 bytes
    header:                  CPDU_Header,     // 5 bytes
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

export interface I_UPDU_EnergyStatus {     // 17 bytes
    header:                  CPDU_Header,  // 5 bytes
    gpsOnTime:               number,       // 4 bytes
    gpsStabdbyTime:          number,       // 4 bytes
    wifiScans:               number,       // 4 bytes
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

export interface I_UPDU_HeartBeat {            // 6|9 bytes
    header:                  CPDU_Header,      // 5 bytes
    lastResetCause:          E_LastResetCause, // 1 byte
    _lastResetCause?:        string;
    fwVersion?:              string,           // 3 bytes (optional)
    bleFwVersion?:           string,           // 3 bytes (optional)
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
    set lastResetCause(x:E_LastResetCause) {
        this._props.lastResetCause = x;
        this._props._lastResetCause = E_LastResetCause[x];
    }
    get lastResetCause():E_LastResetCause {
        return this._props.lastResetCause;
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

    // *** bleFwVersion ***
    set bleFwVersion(x:string) {
        if (x === '') {
            if ('bleFwVersion' in this._props) {
                delete this._props.bleFwVersion
            }
        } else {
            assert.ok(x.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/), 'UPDU_HeartBeat.bleFwVersion: invalid value!');
            let fwStrArray = x.split('.');
            let fwValArray: number[] = [];
            let fwVal: number;
            for (let i=0; i<3; i++) {
                fwVal = parseInt(fwStrArray[i]);
                assert.ok(isUint8(fwVal), 'UPDU_HeartBeat.bleFwVersion: invalid value!');
                fwValArray.push(fwVal);
            }
            this._props.bleFwVersion = fwValArray.join('.');
        }
    }
    get bleFwVersion():string {
        if ('bleFwVersion' in this._props) {
            return this._props.bleFwVersion;    
        }
        return '';
    }

    setFromBuffer(x:Buffer) {
        let l = x.length;
        assert.ok([6, 9, 12].includes(l), 'UPDU_HeartBeat.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));

        this.lastResetCause = x[5];

        if (l > 6) {
            this.fwVersion = x.slice(6,9).join('.');
        } else {
            this.fwVersion = '';
        }

        if (l > 9) {
            this.bleFwVersion = x.slice(9,12).join('.');
        } else {
            this.bleFwVersion = '';
        }

    }
    toBuffer():Buffer {

        let l = 6;
        if (this.fwVersion) {
            l = 9;
            if (this.bleFwVersion) {
                l = 12;
            }
        }
        let y = Buffer.allocUnsafe(l);
        this.header.toBuffer().copy(y);
        y[5] = this.lastResetCause;

        if (l > 6) {
            let fwVersionArray = this.fwVersion.split('.');
            for (let i=0; i<3; i++) {
                y[6+i] = parseInt(fwVersionArray[i]);
            }
        }
        if (l > 9) {
            let bleFwVersionArray = this.bleFwVersion.split('.');
            for (let i=0; i<3; i++) {
                y[9+i] = parseInt(bleFwVersionArray[i]);
            }
        }
        return y;
    }

}

// ***************************************************************
// *** UPDU_ActivityStatus *****************************************
// ***************************************************************

export interface I_UPDU_ActivityStatus {    // 10 bytes
    header:                  CPDU_Header,   // 5 bytes
    tag:                     E_Tag,         // 1 byte
    activityCount:           number,        // 4 bytes
}
export class UPDU_ActivityStatus extends PDUTemplate<I_UPDU_ActivityStatus> implements I_UPDU_ActivityStatus {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT, 'UPDU_ActivityStatus.header: Invalid MessageType!');
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
// *** UPDU_ActivityStatusSideOp *********************************
// ***************************************************************

export interface I_UPDU_ActivityStatusSideOp {    // 10 bytes
    header:                  CPDU_Header,   // 5 bytes
    tag:                     E_Tag,         // 1 byte
    activityCounts:          number[];      // 12 bytes (6*2 bytes)
    globalCounter:           number,        // 4 bytes
}
export class UPDU_ActivityStatusSideOp extends PDUTemplate<I_UPDU_ActivityStatusSideOp> implements I_UPDU_ActivityStatusSideOp {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT, 'UPDU_ActivityStatusSideOp.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** tag ***
    set tag(x:E_Tag) {
        assert.ok(x === E_Tag.ACTIVITY_SIDEOP, 'UPDU_ActivityStatusSideOp.tag(): Invalid value!');
        this._props.tag = x;
        this._props._tag = E_Tag[x];
    }
    get tag():E_Tag {
        return this._props.tag;
    }

    // *** activityCounts ***
    set activityCounts(x:number[]) {
        assert.ok(x.length === 6, 'UPDU_ActivityStatusSideOp.activityCounts: Invalid Values!');
        for (let i=0; i<6; i++) {
            assert.ok( x[i] === (x[i] & 0xffff), 'UPDU_ActivityStatusSideOp.activityCounts: Invalid Value!');
        }
        this._props.activityCounts = x;
    }
    get activityCounts():number[] {
        return this._props.activityCounts;
    }

    // *** globalCounter ***
    set globalCounter(x:number) {
        assert.ok(x >= 0, 'UPDU_ActivityStatusSideOp.globalCounter(): Invalid value!');
        this._props.globalCounter = x;
    }
    get globalCounter():number {
        return this._props.globalCounter;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 22, 'UPDU_ActivityStatusSideOp.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
        this.tag = x[5];
        let a: number[] = [];
        for (let i=0; i<6; i++) {
            a.push(x.readUInt16BE(6+(2*i)));
        }
        this.activityCounts = a;
        this.globalCounter = x.readUInt32BE(18);
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(22);
        this.header.toBuffer().copy(y);
        y[5] = this.tag;
        for (let i=0; i<6; i++) {
            y.writeUInt16BE(this.activityCounts[i], 6+(2*i));
        }
        y.writeUInt32BE(this.globalCounter, 18);
        return y;
    }

}



// ***************************************************************
// *** UPDU_ConfigReport ******************************************
// ***************************************************************

export interface I_UPDU_ConfigReport {         // 11..31 bytes
    header:                  CPDU_Header,      // 5 bytes
    tag:                     E_Tag,            // 1 byte =2
    params:                  CPDU_Parameter[]  // n x 5 bytes, n=1..5
}
export class UPDU_ConfigReport extends PDUTemplate<I_UPDU_ConfigReport> implements I_UPDU_ConfigReport {
   
    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type   === E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT, 'UPDU_ConfigReport.header: Invalid MessageType!');
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
// *** UPDU_ShockDetection ****************************************
// ****************************************************************

export interface I_UPDU_ShockDetection {        // 13 bytes
    header:                  CPDU_Header,       // 5 bytes
    tag:                     E_Tag,             // 1 byte
    numberOfShocks:          number,            // 1 byte
    acceleration:            number[],          // 6 bytes (3*2 bytes)
}
export class UPDU_ShockDetection extends PDUTemplate<I_UPDU_ShockDetection> implements I_UPDU_ShockDetection {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT, 'UPDU_ShockDetection.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** tag ***
    set tag(x:E_Tag) {
        assert.ok(x === E_Tag.SHOCK_DETECTION, 'UPDU_ShockDetection.tag(): Invalid value!');
        this._props.tag = x;
        this._props._tag = E_Tag[x];
    }
    get tag():E_Tag {
        return this._props.tag;
    }

    // *** acceleration ***
    set acceleration(x:number[]) {
        // assert.ok(this.eventValue == E_EventValue.MOTION_END);
        assert.ok(x.length == 3, 'UPDU_EventMessage.acceleration(): Invalid array legth!');
        for (let i=0; i<3; i++) {
            assert.ok( (-0x8000 <= x[i]) && (0x7fff >= x[i]), 'UPDU_EventMessage.acceleration['+i+']: Invalid value!');
        }
        this._props.acceleration = x;
    }
    get acceleration():number[] {
        return this._props.acceleration;
    }

    // *** numberOfShocks ***
    set numberOfShocks(x:number) {
        assert.ok(x == (x & 0xff), 'UPDU_ShockDetection.numberOfShocks(): Invalid value!');
        this._props.numberOfShocks = x;
    }
    get numberOfShocks():number {
        return this._props.numberOfShocks;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 13, 'UPDU_ShockDetection.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
        this.tag = x[5];
        this.numberOfShocks = x[6];
        let a: number[] = [];
        for (let i=0; i<3; i++) {
            a.push(x.readInt16BE(7+(2*i)));
        }
        this.acceleration = a;
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(13);
        this.header.toBuffer().copy(y);
        y[5] = this.tag;
        y[6] = this.numberOfShocks;
        for (let i=0; i<3; i++) {
            y.writeInt16BE(this.acceleration[i], 7+(2*i));
        }
        return y;
    }

}



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



// ****************************************************************
// *** UPDU_Shutdown **********************************************
// ****************************************************************

export interface I_UPDU_Shutdown {
    header:          CPDU_Header,      // 5 bytes
    shutdownCause:   E_ShutdownCause,  // 1 byte
}
export class UPDU_Shutdown extends PDUTemplate<I_UPDU_Shutdown> implements I_UPDU_Shutdown {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type === E_UPDUType.SHUTDOWN, 'UPDU_Shutdown.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** shutdownCause ***
    set shutdownCause(x:E_ShutdownCause) {
        assert.ok(x in E_ShutdownCause, 'UPDU_Shutdown.shutdownCause(): Invalid value!');
        this._props.shutdownCause = x;
        this._props._shutdownCause = E_ShutdownCause[x];
    }
    get shutdownCause():E_ShutdownCause {
        return this._props.shutdownCause;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 6, 'UPDU_Shutdown.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
        this.shutdownCause = x[5];   
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(6);
        this.header.toBuffer().copy(y);
        y[5] = this.shutdownCause;
        return y;
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



// ***************************************************************
// *** UPDU_EventMessage *****************************************
// ***************************************************************

export interface I_UPDU_EventMessage {          // 6 or 12 bytes
    header:                  CPDU_Header,       // 5 bytes
    eventValue:              E_EventValue,      // 1 byte
    acceleration?:           number[],          // 6 bytes (3*2 bytes)
}
export class UPDU_EventMessage extends PDUTemplate<I_UPDU_EventMessage> implements I_UPDU_EventMessage {

    // *** header ***
    set header(x:CPDU_Header) {
        assert.ok(x.type       === E_UPDUType.EVENT_MESSAGE, 'UPDU_GeolocStart.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_Header {
        return this._props.header;
    }

    // *** eventValue ***
    set eventValue(x:E_EventValue) {
        this._props.eventValue = x;
        this._props._eventValue = E_EventValue[x];
    }
    get eventValue():E_EventValue {
        return this._props.eventValue;
    }

    // *** acceleration ***
    set acceleration(x:number[]) {
        // assert.ok(this.eventValue == E_EventValue.MOTION_END);
        assert.ok(x.length == 3, 'UPDU_EventMessage.acceleration(): Invalid array legth!');
        for (let i=0; i<3; i++) {
            assert.ok( (-0x8000 <= x[i]) && (0x7fff >= x[i]), 'UPDU_EventMessage.acceleration['+i+']: Invalid value!');
        }
        this._props.acceleration = x;
    }
    get acceleration(): number[] {
        // assert.ok(this.eventValue == E_EventValue.MOTION_END);
        if ( this._props.acceleration ) {
            return this._props.acceleration;
        } else {
            return [];
        }
    }

    setFromBuffer(x:Buffer) {
        let l = x.length;
        assert.ok([6, 12].includes(l), 'UPDU_EventMessage.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_Header(x.slice(0,5));
        this.eventValue = x[5];
        if (l === 12) {
            let a: number[] = [];
            for (let i=0; i<3; i++) {
                a.push(x.readInt16BE(6+(2*i)));
            }
            this.acceleration = a;
        }

    }
    toBuffer():Buffer {
        let l = (this._props.acceleration) ? 12: 6;
        let y = Buffer.allocUnsafe(l);
        this.header.toBuffer().copy(y);
        y[5] = this.eventValue;
        if (l == 12) {
            for (let i=0; i<3; i++) {
                y.writeInt16BE(this.acceleration[i], 6+(2*i));
            }
        }
        return y;
    }

}


// ****************************************************************
// *** UPDU_Debug *************************************************
// ****************************************************************

export interface I_UPDU_Debug {
    header:                  CPDU_UlHeaderShort,     // 2 bytes
    debugCmdId:              E_DebugCmd,             // 1 byte
    action?:                 E_DebugAction,          // 1 byte, only if debugCmdId == E_DebugCmd.RESET_DEVICE
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

    // *** debugCmdId ***
    set debugCmdId(x:E_DebugCmd) {
        assert.ok(x in E_DebugCmd, 'UPDU_Debug.debugCmdId(): Invalid value!');
        this._props.debugCmdId = x;
        this._props._debugCmdId = E_DebugCmd[x];
    }
    get debugCmdId():E_DebugCmd {
        return this._props.debugCmdId;
    }

    // *** action ***
    set action(x:E_DebugAction) {
        // assert.ok(this.debugCmdId==E_DebugCmd.RESET_DEVICE, 'UPDU_Debug.action(): Invalid value!');
        assert.ok(x in E_DebugAction, 'UPDU_Debug.action(): Invalid value!');
        this._props.action = x;
        this._props._action = E_DebugAction[x];
    }
    get action():E_DebugAction {
        return this._props.action;
    }

    setFromBuffer(x:Buffer) {
        let l = x.length;
        assert.ok([3, 4].includes(l), 'UPDU_Debug.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_UlHeaderShort(x.slice(0,2));
        this.debugCmdId = x[2];
        if ( l == 4 ) {
            this.action = x[3];
        }
    }
    toBuffer():Buffer {
        let l = (this.action) ? 4 : 3;
        let y = Buffer.allocUnsafe(l);
        this.header.toBuffer().copy(y);
        y[2] = this.debugCmdId;
        if (l == 4) {
            y[3] = this.action;
        }
        return y;
    }

}



type UPDU_Generic = UPDU_FramePending | UPDU_PosGPSFix | UPDU_PosGPSTimeout | UPDU_PosWiFiTimeout | 
     UPDU_PosWiFiFailure | UPDU_PosWiFiBSSIDs | UPDU_PosBLEFailure | UPDU_EnergyStatus |
     UPDU_HeartBeat | UPDU_ActivityStatus | UPDU_ConfigReport | UPDU_Shutdown | UPDU_Debug | UPDU_EventMessage;

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
                case E_PositionInformation.BLE_BEACONIDS:
                    updu = new UPDU_PosBLEBeaconIDs(buf);
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
        case E_UPDUType.ACTIVITY_CONFIG_SHOCKDETECT:
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
        case E_UPDUType.EVENT_MESSAGE:
            updu = new UPDU_EventMessage(buf);
            break;
        default:
            updu = undefined;
            break;
    }

    return updu;

}
