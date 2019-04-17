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


export let decodeDlMsg = (buf: Buffer):object => {
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
        return msg.toComponents();
    } else {
        return { error: "Unknown message type: "+E_UlMsgType[buf[0]] };
    }

}
