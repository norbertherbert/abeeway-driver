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
// *** DPDU_PosOnDem *********************************************
// ***************************************************************

export interface I_DPDU_PosOnDem {
    header:                  CPDU_DlHeaderShort,     // 2 bytes
}
export class DPDU_PosOnDem extends PDUTemplate<I_DPDU_PosOnDem> implements I_DPDU_PosOnDem {

    // *** header ***
    set header(x:CPDU_DlHeaderShort) {
        assert.ok(x.type === E_DPDUType.POSITION_ON_DEMAND, 'DPDU_PosOnDem.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_DlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 2, 'DPDU_PosOnDem.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_DlHeaderShort(x);
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}

// ***************************************************************
// *** DPDU_SetMode **********************************************
// ***************************************************************

export interface I_DPDU_SetMode {                    // 3 bytes
    header:                  CPDU_DlHeaderShort,     // 2 bytes
    mode:                    E_OperatingMode, // 1 byte
    _mode?:               string,
}
export class DPDU_SetMode extends PDUTemplate<I_DPDU_SetMode> implements I_DPDU_SetMode {

    // *** header ***
    set header(x:CPDU_DlHeaderShort) {
        assert.ok(x.type === E_DPDUType.SET_MODE, 'DPDU_SetMode.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_DlHeaderShort {
        return this._props.header;
    }

    // *** mode ***
    set mode(x:E_OperatingMode) {
        assert.ok(x in E_OperatingMode, 'DPDU_SetMode.mode: Invalid value!');
        this._props.mode = x;
        this._props._mode = E_OperatingMode[x];
    }
    get mode():E_OperatingMode {
        return this._props.mode;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 3, 'DPDU_SetMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_DlHeaderShort(x.slice(0,2));
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
// *** DPDU_ReqConf **********************************************
// ***************************************************************

export interface I_DPDU_ReqConf {                       // 2..22
    header:                  CPDU_DlHeaderShort,        // 2 bytes
    paramIDs:                E_ParameterId[],  // 0..20 bytes
    _paramIDs?:           string[],
}
export class DPDU_ReqConf extends PDUTemplate<I_DPDU_ReqConf> implements I_DPDU_ReqConf {

    // *** header ***
    set header(x:CPDU_DlHeaderShort) {
        assert.ok(x.type === E_DPDUType.REQUEST_CONFIGURATION, 'DPDU_ReqConf.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_DlHeaderShort {
        return this._props.header;
    }

    // *** paramIDs ***
    set paramIDs(x:E_ParameterId[]) {
        let paramIDsLength = x.length;
        assert.ok(paramIDsLength<=20, 'DPDU_ReqConf.paramIDs: Invalid length!');
        let _x: string[] = [];
        for (let paramId of x) {
            assert.ok(paramId in E_ParameterId, 'DPDU_ReqConf.paramIDs: Invalid value!');
            _x.push(E_ParameterId[paramId]);
        }
        this._props.paramIDs = x;
        this._props._paramIDs = _x;
    }
    get paramIDs():E_ParameterId[] {
        return this._props.paramIDs;
    }

    setFromBuffer(x:Buffer) {
        let l = x.length;
        assert.ok( (2<=l) && (l<=22), 'DPDU_ReqConf.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_DlHeaderShort(x.slice(0,2));

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
// *** DPDU_SOSMode **********************************************
// ***************************************************************

export interface I_DPDU_SOSMode {
    header:                  CPDU_DlHeaderShort,     // 2 bytes
}
export class DPDU_SOSMode extends PDUTemplate<I_DPDU_SOSMode> implements I_DPDU_SOSMode {

    // *** header ***
    set header(x:CPDU_DlHeaderShort) {
        assert.ok((x.type === E_DPDUType.START_SOS_MODE) || (x.type === E_DPDUType.STOP_SOS_MODE), 'DPDU_SOSMode.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_DlHeaderShort {
        return this._props.header;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 2, 'DPDU_SOSMode.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_DlHeaderShort(x);
    }
    toBuffer():Buffer {
        return this.header.toBuffer();
    }

}

// ***************************************************************
// *** DPDU_SetParam *********************************************
// ***************************************************************

export interface I_DPDU_SetParam {                   // 7..27
    header:                  CPDU_DlHeaderShort,     // 2 bytes
    params:                  CPDU_Parameter[]      // n x 5 bytes, n= 1..5
}
export class DPDU_SetParam extends PDUTemplate<I_DPDU_SetParam> implements I_DPDU_SetParam {
   
    // *** header ***
    set header(x:CPDU_DlHeaderShort) {
        assert.ok(x.type       === E_DPDUType.SET_PARAM, 'DPDU_SetParam.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_DlHeaderShort {
        return this._props.header;
    }

    // *** params ***
    set params(x:CPDU_Parameter[]) {
        this._props.params = x;
    }
    get params():CPDU_Parameter[] {
        return this._props.params;
    }

    setFromBuffer(x:Buffer) {
        let paramsLength = (x.length - 2) / 5;

        assert.ok( [1,2,3,4,5].includes(paramsLength), 'DPDU_SetParam.setFromBuffer(): Invalid buffer legth!');

        this.header = new CPDU_DlHeaderShort(x.slice(0,2));

        let params: CPDU_Parameter[] = [];
        for (let i=0; i<paramsLength; i++) {
            params.push( 
                new CPDU_Parameter( x.slice(2+(i*5), 7+(i*5)) )
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
// *** DPDU_DebugCmd *********************************************
// ***************************************************************

export interface I_DPDU_DebugCmd {                   // 3 bytes
    header:                  CPDU_DlHeaderShort,     // 2 bytes
    debugCmd:                E_DebugCmd,      // 1 byte
    _debugCmd?:            string,
}
export class DPDU_DebugCmd extends PDUTemplate<I_DPDU_DebugCmd> implements I_DPDU_DebugCmd {

    // *** header ***
    set header(x:CPDU_DlHeaderShort) {
        assert.ok(x.type === E_DPDUType.DEBUG_COMMAND, 'DPDU_DebugCmd.header: Invalid MessageType!');
        this._props.header = x;
    }
    get header():CPDU_DlHeaderShort {
        return this._props.header;
    }

    // *** debugCmd ***
    set debugCmd(x:E_DebugCmd) {
        assert.ok(x in E_DebugCmd, 'DPDU_DebugCmd.debugCmd: Invalid value!');
        this._props.debugCmd = x;
        this._props._debugCmd = E_DebugCmd[x];
    }
    get debugCmd():E_DebugCmd {
        return this._props.debugCmd;
    }

    setFromBuffer(x:Buffer) {
        assert.ok(x.length === 3, 'DPDU_DebugCmd.setFromBuffer(): Invalid buffer legth!');
        this.header = new CPDU_DlHeaderShort(x.slice(0,2));
        this.debugCmd = x[2];
    }
    toBuffer():Buffer {
        let y = Buffer.allocUnsafe(3);
        this.header.toBuffer().copy(y);
        y[2] = this.debugCmd;
        return y;
    }

}


export let decodeDlMsg = (buf: Buffer):object => {
    let msg: any;
    switch(buf[0]) {
        case E_DPDUType.POSITION_ON_DEMAND:
            msg = new DPDU_PosOnDem(buf);
            break;
        case E_DPDUType.SET_MODE:
            msg = new DPDU_SetMode(buf);
            break;
        case E_DPDUType.REQUEST_CONFIGURATION:
            msg = new DPDU_ReqConf(buf);
            break;
        case E_DPDUType.START_SOS_MODE:
        case E_DPDUType.STOP_SOS_MODE:
            msg = new DPDU_SOSMode(buf);
            break;
        case E_DPDUType.SET_PARAM:
            msg = new DPDU_SetParam(buf);
            break;
        case E_DPDUType.DEBUG_COMMAND:
            msg = new DPDU_DebugCmd(buf);
            break;
        default:
            msg = undefined;
            break;
    }

    if (msg) {
        return msg.toComponents();
    } else {
        return { error: "Unknown message type: "+E_UPDUType[buf[0]] };
    }

}







type DPDU_Generic = DPDU_PosOnDem | DPDU_SetMode | DPDU_ReqConf | DPDU_SOSMode | DPDU_SetParam | DPDU_DebugCmd;

export let createDPDU = (x: Buffer|string):DPDU_Generic => {

    let buf: Buffer;

    if ( typeof(x) == 'string' ) {
        buf = Buffer.from(x, 'hex');
    } else {
        buf = x;
    }

    let dpdu: any;
    switch(buf[0]) {
        case E_DPDUType.POSITION_ON_DEMAND:
            dpdu = new DPDU_PosOnDem(buf);
            break;
        case E_DPDUType.SET_MODE:
            dpdu = new DPDU_SetMode(buf);
            break;
        case E_DPDUType.REQUEST_CONFIGURATION:
            dpdu = new DPDU_ReqConf(buf);
            break;
        case E_DPDUType.START_SOS_MODE:
        case E_DPDUType.STOP_SOS_MODE:
            dpdu = new DPDU_SOSMode(buf);
            break;
        case E_DPDUType.SET_PARAM:
            dpdu = new DPDU_SetParam(buf);
            break;
        case E_DPDUType.DEBUG_COMMAND:
            dpdu = new DPDU_DebugCmd(buf);
            break;
        default:
            dpdu = undefined;
            break;
    }
 
    return dpdu;

}
