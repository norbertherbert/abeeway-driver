"use strict";
// ***************************************************************
// *** Abeeway Driver Constants **********************************
// ***************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
var E_UlMsgType;
(function (E_UlMsgType) {
    E_UlMsgType[E_UlMsgType["FRAME_PENDING"] = 0] = "FRAME_PENDING";
    E_UlMsgType[E_UlMsgType["POSITION"] = 3] = "POSITION";
    E_UlMsgType[E_UlMsgType["ENERGY_STATUS"] = 4] = "ENERGY_STATUS";
    E_UlMsgType[E_UlMsgType["HEART_BEAT"] = 5] = "HEART_BEAT";
    E_UlMsgType[E_UlMsgType["ACTIVITY_OR_CONFIG"] = 7] = "ACTIVITY_OR_CONFIG";
    E_UlMsgType[E_UlMsgType["SHUTDOWN"] = 9] = "SHUTDOWN";
    E_UlMsgType[E_UlMsgType["DEBUG"] = 255] = "DEBUG";
})(E_UlMsgType = exports.E_UlMsgType || (exports.E_UlMsgType = {}));
var E_Tag;
(function (E_Tag) {
    E_Tag[E_Tag["ACTIVITY"] = 1] = "ACTIVITY";
    E_Tag[E_Tag["CONFIG"] = 2] = "CONFIG";
})(E_Tag = exports.E_Tag || (exports.E_Tag = {}));
var E_OperatingMode;
(function (E_OperatingMode) {
    E_OperatingMode[E_OperatingMode["STANDBY"] = 0] = "STANDBY";
    E_OperatingMode[E_OperatingMode["MOTION_TRACKING"] = 1] = "MOTION_TRACKING";
    E_OperatingMode[E_OperatingMode["PERMANENT_TRACKING"] = 2] = "PERMANENT_TRACKING";
    E_OperatingMode[E_OperatingMode["START_END_TRACKING"] = 3] = "START_END_TRACKING";
    E_OperatingMode[E_OperatingMode["ACTIVITY_TRACKING"] = 4] = "ACTIVITY_TRACKING";
    E_OperatingMode[E_OperatingMode["OFF"] = 5] = "OFF";
})(E_OperatingMode = exports.E_OperatingMode || (exports.E_OperatingMode = {}));
var E_PositionInformation;
(function (E_PositionInformation) {
    E_PositionInformation[E_PositionInformation["GPS_FIX"] = 0] = "GPS_FIX";
    E_PositionInformation[E_PositionInformation["GPS_TIMEOUT"] = 1] = "GPS_TIMEOUT";
    E_PositionInformation[E_PositionInformation["NO_MORE_USED"] = 2] = "NO_MORE_USED";
    E_PositionInformation[E_PositionInformation["WIFI_TIMEOUT"] = 3] = "WIFI_TIMEOUT";
    E_PositionInformation[E_PositionInformation["WIFI_FAILURE"] = 4] = "WIFI_FAILURE";
    E_PositionInformation[E_PositionInformation["LPGPS_DATA1"] = 5] = "LPGPS_DATA1";
    E_PositionInformation[E_PositionInformation["LPGPS_DATA2"] = 6] = "LPGPS_DATA2";
    E_PositionInformation[E_PositionInformation["BLE_BACON_SCAN"] = 7] = "BLE_BACON_SCAN";
    E_PositionInformation[E_PositionInformation["BLE_BACON_FAILURE"] = 8] = "BLE_BACON_FAILURE";
    E_PositionInformation[E_PositionInformation["WIFI_BSSIDS"] = 9] = "WIFI_BSSIDS";
})(E_PositionInformation = exports.E_PositionInformation || (exports.E_PositionInformation = {}));
var E_WiFiFailure;
(function (E_WiFiFailure) {
    E_WiFiFailure[E_WiFiFailure["CONNECTION_FAILURE"] = 0] = "CONNECTION_FAILURE";
    E_WiFiFailure[E_WiFiFailure["SCAN_FAILURE"] = 1] = "SCAN_FAILURE";
    E_WiFiFailure[E_WiFiFailure["ANTENNA_UNAVAILABLE"] = 2] = "ANTENNA_UNAVAILABLE";
    E_WiFiFailure[E_WiFiFailure["WIFI_NOT_SUPPORTED"] = 3] = "WIFI_NOT_SUPPORTED";
})(E_WiFiFailure = exports.E_WiFiFailure || (exports.E_WiFiFailure = {}));
var E_BLEFailure;
(function (E_BLEFailure) {
    E_BLEFailure[E_BLEFailure["BLE_IS_NOT_RESPONDING"] = 0] = "BLE_IS_NOT_RESPONDING";
    E_BLEFailure[E_BLEFailure["INTERNAL_ERROR"] = 1] = "INTERNAL_ERROR";
    E_BLEFailure[E_BLEFailure["SHARED_ANTENNA_NOT_AVAILABLE"] = 2] = "SHARED_ANTENNA_NOT_AVAILABLE";
    E_BLEFailure[E_BLEFailure["SCAN_ALREADY_ONGOING"] = 3] = "SCAN_ALREADY_ONGOING";
    E_BLEFailure[E_BLEFailure["NO_BEACON_DETECTED"] = 4] = "NO_BEACON_DETECTED";
    E_BLEFailure[E_BLEFailure["HARDWARE_INCOMPATIBILITY"] = 5] = "HARDWARE_INCOMPATIBILITY";
})(E_BLEFailure = exports.E_BLEFailure || (exports.E_BLEFailure = {}));
var E_DlMsgType;
(function (E_DlMsgType) {
    E_DlMsgType[E_DlMsgType["POSITION_ON_DEMAND"] = 1] = "POSITION_ON_DEMAND";
    E_DlMsgType[E_DlMsgType["SET_MODE"] = 2] = "SET_MODE";
    E_DlMsgType[E_DlMsgType["REQUEST_CONFIGURATION"] = 3] = "REQUEST_CONFIGURATION";
    E_DlMsgType[E_DlMsgType["START_SOS_MODE"] = 4] = "START_SOS_MODE";
    E_DlMsgType[E_DlMsgType["STOP_SOS_MODE"] = 5] = "STOP_SOS_MODE";
    E_DlMsgType[E_DlMsgType["SET_PARAM"] = 11] = "SET_PARAM";
    E_DlMsgType[E_DlMsgType["DEBUG_COMMAND"] = 255] = "DEBUG_COMMAND";
})(E_DlMsgType = exports.E_DlMsgType || (exports.E_DlMsgType = {}));
var E_DebugCmd;
(function (E_DebugCmd) {
    E_DebugCmd[E_DebugCmd["RESET_DEVICE"] = 1] = "RESET_DEVICE";
    E_DebugCmd[E_DebugCmd["BLE_BOND_REMOVE"] = 2] = "BLE_BOND_REMOVE";
})(E_DebugCmd = exports.E_DebugCmd || (exports.E_DebugCmd = {}));
var E_GPSTimeoutCause;
(function (E_GPSTimeoutCause) {
    E_GPSTimeoutCause[E_GPSTimeoutCause["USER_TIMEOUT"] = 0] = "USER_TIMEOUT";
})(E_GPSTimeoutCause = exports.E_GPSTimeoutCause || (exports.E_GPSTimeoutCause = {}));
var E_ParameterId;
(function (E_ParameterId) {
    E_ParameterId[E_ParameterId["UL_PERIOD"] = 0] = "UL_PERIOD";
    E_ParameterId[E_ParameterId["LORA_PERIOD"] = 1] = "LORA_PERIOD";
    E_ParameterId[E_ParameterId["PW_STAT_PERIOD"] = 2] = "PW_STAT_PERIOD";
    E_ParameterId[E_ParameterId["PERIODIC_POS_PERIOD"] = 3] = "PERIODIC_POS_PERIOD";
    E_ParameterId[E_ParameterId["GEOLOC_SENSOR"] = 5] = "GEOLOC_SENSOR";
    E_ParameterId[E_ParameterId["GEOLOC_METHOD"] = 6] = "GEOLOC_METHOD";
    E_ParameterId[E_ParameterId["MOTION_NB_POS"] = 8] = "MOTION_NB_POS";
    E_ParameterId[E_ParameterId["GPS_TIMEOUT"] = 9] = "GPS_TIMEOUT";
    E_ParameterId[E_ParameterId["AGPS_TIMEOUT"] = 10] = "AGPS_TIMEOUT";
    E_ParameterId[E_ParameterId["GPS_EHPE"] = 11] = "GPS_EHPE";
    E_ParameterId[E_ParameterId["GPS_CONVERGENCE"] = 12] = "GPS_CONVERGENCE";
    E_ParameterId[E_ParameterId["CONFIG_FLAGS"] = 13] = "CONFIG_FLAGS";
    E_ParameterId[E_ParameterId["TRANSMIT_STRAT"] = 14] = "TRANSMIT_STRAT";
    E_ParameterId[E_ParameterId["BLE_BEACON_COUNT"] = 15] = "BLE_BEACON_COUNT";
    E_ParameterId[E_ParameterId["BLE_BEACON_TIMEOUT"] = 16] = "BLE_BEACON_TIMEOUT";
    E_ParameterId[E_ParameterId["GPS_STANDBY_TIMEOUT"] = 17] = "GPS_STANDBY_TIMEOUT";
    //TODO: what is this?
    E_ParameterId[E_ParameterId["CONFIRMED_UL_BITMAP"] = 18] = "CONFIRMED_UL_BITMAP";
    E_ParameterId[E_ParameterId["CONFIRMED_UL_RETRY"] = 19] = "CONFIRMED_UL_RETRY";
})(E_ParameterId = exports.E_ParameterId || (exports.E_ParameterId = {}));
exports.C_ParameterId = {
    0x00: { name: 'UL_PERIOD', unit: 's', min: 60, max: 86400 },
    0x01: { name: 'LORA_PERIOD', unit: 's', min: 300, max: 86400 },
    0x02: { name: 'PW_STAT_PERIOD', unit: 's', min: 300, max: 604800 },
    0x03: { name: 'PERIODIC_POS_PERIOD', unit: 's', min: 900, max: 604800 },
    0x05: { name: 'GEOLOC_SENSOR', unit: '', min: 0x00, max: 0x10 },
    0x06: { name: 'GEOLOC_METHOD', unit: '', min: 0x00, max: 0x05 },
    0x08: { name: 'MOTION_NB_POS', unit: '', min: 1, max: 60 },
    0x09: { name: 'GPS_TIMEOUT', unit: 's', min: 3, max: 300 },
    0x0a: { name: 'AGPS_TIMEOUT', unit: 's', min: 30, max: 250 },
    0x0b: { name: 'GPS_EHPE', unit: 's', min: 0, max: 100 },
    0x0c: { name: 'GPS_CONVERGENCE', unit: 's', min: 0, max: 300 },
    0x0d: { name: 'CONFIG_FLAGS', unit: '', min: 0x00, max: 0xff },
    0x0e: { name: 'TRANSMIT_STRAT', unit: '', min: 0x00, max: 0x04 },
    0x0f: { name: 'BLE_BEACON_COUNT', unit: '', min: 1, max: 4 },
    0x10: { name: 'BLE_BEACON_TIMEOUT', unit: 's', min: 1, max: 5 },
    0x11: { name: 'GPS_STANDBY_TIMEOUT', unit: 's', min: 10, max: 7200 },
    0x12: { name: 'CONFIRMED_UL_BITMAP', unit: '', min: 0x00, max: 0xffff },
    0x13: { name: 'CONFIRMED_UL_RETRY', unit: '', min: 0, max: 8 },
};
var E_Param_GeolocSensor;
(function (E_Param_GeolocSensor) {
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFi"] = 0] = "WiFi";
    E_Param_GeolocSensor[E_Param_GeolocSensor["GPS"] = 1] = "GPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["LPGPS"] = 2] = "LPGPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFiLPGPSGPS"] = 5] = "WiFiLPGPSGPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFiGPS"] = 6] = "WiFiGPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFiLPGPS"] = 7] = "WiFiLPGPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFiLPGPS_WiFiGPS_WiFiLPGPS"] = 9] = "WiFiLPGPS_WiFiGPS_WiFiLPGPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["BLE"] = 16] = "BLE";
})(E_Param_GeolocSensor = exports.E_Param_GeolocSensor || (exports.E_Param_GeolocSensor = {}));
var E_Param_GeolocMethod;
(function (E_Param_GeolocMethod) {
    E_Param_GeolocMethod[E_Param_GeolocMethod["WiFi"] = 0] = "WiFi";
    E_Param_GeolocMethod[E_Param_GeolocMethod["GPS"] = 1] = "GPS";
    E_Param_GeolocMethod[E_Param_GeolocMethod["LPGPS"] = 2] = "LPGPS";
    E_Param_GeolocMethod[E_Param_GeolocMethod["WiFiGPS"] = 3] = "WiFiGPS";
    E_Param_GeolocMethod[E_Param_GeolocMethod["WiFiLPGPS"] = 4] = "WiFiLPGPS";
    E_Param_GeolocMethod[E_Param_GeolocMethod["BLE"] = 5] = "BLE";
})(E_Param_GeolocMethod = exports.E_Param_GeolocMethod || (exports.E_Param_GeolocMethod = {}));
var E_Param_TransmitStrat;
(function (E_Param_TransmitStrat) {
    E_Param_TransmitStrat[E_Param_TransmitStrat["SINGLE_FIXED"] = 0] = "SINGLE_FIXED";
    E_Param_TransmitStrat[E_Param_TransmitStrat["SINGLE_RANDOM"] = 1] = "SINGLE_RANDOM";
    E_Param_TransmitStrat[E_Param_TransmitStrat["DUAL_RANDOM"] = 2] = "DUAL_RANDOM";
    E_Param_TransmitStrat[E_Param_TransmitStrat["DUAL_FIXED"] = 3] = "DUAL_FIXED";
    E_Param_TransmitStrat[E_Param_TransmitStrat["NETWORK_ADR"] = 4] = "NETWORK_ADR";
})(E_Param_TransmitStrat = exports.E_Param_TransmitStrat || (exports.E_Param_TransmitStrat = {}));
//# sourceMappingURL=constants.js.map