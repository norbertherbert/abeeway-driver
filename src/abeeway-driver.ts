import * as assert from 'assert';

/* Import/Export Constants */
import { 
    E_UlMsgType, E_Tag, E_OperatingMode, E_PositionInformation, E_WiFiFailure,
    E_BLEFailure, E_DlMsgType, E_DebugCmd, E_GPSTimeoutCause, E_ParameterId, 
    C_ParameterId, E_Param_GeolocSensor, E_Param_GeolocMethod, E_Param_TransmitStrat,
} from './constants';
export {
    E_UlMsgType, E_Tag, E_OperatingMode, E_PositionInformation, E_WiFiFailure,
    E_BLEFailure, E_DlMsgType, E_DebugCmd, E_GPSTimeoutCause, E_ParameterId, 
    C_ParameterId, E_Param_GeolocSensor, E_Param_GeolocMethod, E_Param_TransmitStrat,
}

/* Import/Export Message Component Classes */
import { 
    Param_ConfigFlags, Status, Header, UlHeaderShort, DlHeaderShort, WiFiBSSIDs, Parameter, 
} from './msg-components';
export {
    Param_ConfigFlags, Status, Header, UlHeaderShort, DlHeaderShort, WiFiBSSIDs, Parameter, 
}

/* Import/Export Uplink Message Classes */
import { 
    UlMsg_FramePending, UlMsg_PosGPSFix, UlMsg_PosGPSTimeout, UlMsg_PosWiFiTimeout, 
    UlMsg_PosWiFiFailure, UlMsg_PosWiFiBSSIDs, UlMsg_PosBLEFailure, UlMsg_EnergyStatus,
    UlMsg_HeartBeat, UlMsg_ActivityStatus, UlMsg_ConfigReport, UlMsg_Shutdown, UlMsg_Debug,
    decodeUlMsg,
} from './msg-uplink';
export {
    UlMsg_FramePending, UlMsg_PosGPSFix, UlMsg_PosGPSTimeout, UlMsg_PosWiFiTimeout, 
    UlMsg_PosWiFiFailure, UlMsg_PosWiFiBSSIDs, UlMsg_PosBLEFailure, UlMsg_EnergyStatus,
    UlMsg_HeartBeat, UlMsg_ActivityStatus, UlMsg_ConfigReport, UlMsg_Shutdown, UlMsg_Debug,
    decodeUlMsg,
}

/* Import/Export Downlink Message Classes */
import { 
    DlMsg_PosOnDem, DlMsg_SetMode, DlMsg_ReqConf, DlMsg_SOSMode, DlMsg_SetParam, DlMsg_DebugCmd,
    decodeDlMsg,
} from './msg-downlink';
export {
    DlMsg_PosOnDem, DlMsg_SetMode, DlMsg_ReqConf, DlMsg_SOSMode, DlMsg_SetParam, DlMsg_DebugCmd,
    decodeDlMsg,
}


