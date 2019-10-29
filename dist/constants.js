"use strict";
// ***************************************************************
// *** Abeeway Driver Constants **********************************
// ***************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
var E_UPDUType;
(function (E_UPDUType) {
    E_UPDUType[E_UPDUType["FRAME_PENDING"] = 0] = "FRAME_PENDING";
    E_UPDUType[E_UPDUType["POSITION"] = 3] = "POSITION";
    E_UPDUType[E_UPDUType["ENERGY_STATUS"] = 4] = "ENERGY_STATUS";
    E_UPDUType[E_UPDUType["HEART_BEAT"] = 5] = "HEART_BEAT";
    E_UPDUType[E_UPDUType["ACTIVITY_CONFIG_SHOCKDETECT"] = 7] = "ACTIVITY_CONFIG_SHOCKDETECT";
    E_UPDUType[E_UPDUType["SHUTDOWN"] = 9] = "SHUTDOWN";
    E_UPDUType[E_UPDUType["EVENT_MESSAGE"] = 10] = "EVENT_MESSAGE";
    E_UPDUType[E_UPDUType["DEBUG"] = 15] = "DEBUG";
})(E_UPDUType = exports.E_UPDUType || (exports.E_UPDUType = {}));
var E_LastResetCause;
(function (E_LastResetCause) {
    E_LastResetCause[E_LastResetCause["POWERON_RESET"] = 1] = "POWERON_RESET";
    E_LastResetCause[E_LastResetCause["BROWNOUT_UNREGULATED_DOMAIN_RESET"] = 2] = "BROWNOUT_UNREGULATED_DOMAIN_RESET";
    E_LastResetCause[E_LastResetCause["BROWNOUT_REGULATED_DOMAIN_RESET"] = 4] = "BROWNOUT_REGULATED_DOMAIN_RESET";
    E_LastResetCause[E_LastResetCause["EXTERNAL_PIN_RESET"] = 8] = "EXTERNAL_PIN_RESET";
    E_LastResetCause[E_LastResetCause["WATCHDOG_RESET"] = 16] = "WATCHDOG_RESET";
    E_LastResetCause[E_LastResetCause["LOCKUP_RESET"] = 32] = "LOCKUP_RESET";
    E_LastResetCause[E_LastResetCause["SYSTEM_REQUEST_RESET"] = 64] = "SYSTEM_REQUEST_RESET";
})(E_LastResetCause = exports.E_LastResetCause || (exports.E_LastResetCause = {}));
var E_Tag;
(function (E_Tag) {
    E_Tag[E_Tag["ACTIVITY"] = 1] = "ACTIVITY";
    E_Tag[E_Tag["CONFIG"] = 2] = "CONFIG";
    E_Tag[E_Tag["SHOCK_DETECTION"] = 3] = "SHOCK_DETECTION";
    E_Tag[E_Tag["ACTIVITY_SIDEOP"] = 4] = "ACTIVITY_SIDEOP";
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
    E_PositionInformation[E_PositionInformation["BLE_BEACONIDS"] = 7] = "BLE_BEACONIDS";
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
    E_BLEFailure[E_BLEFailure["BLE_BUSY"] = 4] = "BLE_BUSY";
    E_BLEFailure[E_BLEFailure["NO_BEACON_DETECTED"] = 5] = "NO_BEACON_DETECTED";
    E_BLEFailure[E_BLEFailure["HARDWARE_INCOMPATIBILITY"] = 6] = "HARDWARE_INCOMPATIBILITY";
})(E_BLEFailure = exports.E_BLEFailure || (exports.E_BLEFailure = {}));
var E_DPDUType;
(function (E_DPDUType) {
    E_DPDUType[E_DPDUType["POSITION_ON_DEMAND"] = 1] = "POSITION_ON_DEMAND";
    E_DPDUType[E_DPDUType["SET_MODE"] = 2] = "SET_MODE";
    E_DPDUType[E_DPDUType["REQUEST_CONFIGURATION"] = 3] = "REQUEST_CONFIGURATION";
    E_DPDUType[E_DPDUType["START_SOS_MODE"] = 4] = "START_SOS_MODE";
    E_DPDUType[E_DPDUType["STOP_SOS_MODE"] = 5] = "STOP_SOS_MODE";
    E_DPDUType[E_DPDUType["SET_PARAM"] = 11] = "SET_PARAM";
    E_DPDUType[E_DPDUType["DEBUG_COMMAND"] = 255] = "DEBUG_COMMAND";
})(E_DPDUType = exports.E_DPDUType || (exports.E_DPDUType = {}));
var E_DebugCmd;
(function (E_DebugCmd) {
    E_DebugCmd[E_DebugCmd["RESET_DEVICE"] = 1] = "RESET_DEVICE";
    E_DebugCmd[E_DebugCmd["BLE_BOND_REMOVE"] = 2] = "BLE_BOND_REMOVE";
    E_DebugCmd[E_DebugCmd["TRIGGER_HEARTBEAT"] = 5] = "TRIGGER_HEARTBEAT";
})(E_DebugCmd = exports.E_DebugCmd || (exports.E_DebugCmd = {}));
var E_DebugAction;
(function (E_DebugAction) {
    E_DebugAction[E_DebugAction["RESETDEVICE"] = 1] = "RESETDEVICE";
    E_DebugAction[E_DebugAction["RESETDEVICE_INITCONFIG"] = 2] = "RESETDEVICE_INITCONFIG";
    E_DebugAction[E_DebugAction["RESETDEVICE_INITCONFIG_DELETEBOND"] = 3] = "RESETDEVICE_INITCONFIG_DELETEBOND";
})(E_DebugAction = exports.E_DebugAction || (exports.E_DebugAction = {}));
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
    E_ParameterId[E_ParameterId["RESERVED_04"] = 4] = "RESERVED_04";
    E_ParameterId[E_ParameterId["GEOLOC_SENSOR"] = 5] = "GEOLOC_SENSOR";
    E_ParameterId[E_ParameterId["GEOLOC_METHOD"] = 6] = "GEOLOC_METHOD";
    E_ParameterId[E_ParameterId["RESERVED_07"] = 7] = "RESERVED_07";
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
    E_ParameterId[E_ParameterId["CONFIRMED_UL_BITMAP"] = 18] = "CONFIRMED_UL_BITMAP";
    E_ParameterId[E_ParameterId["CONFIRMED_UL_RETRY"] = 19] = "CONFIRMED_UL_RETRY";
    E_ParameterId[E_ParameterId["MOTION_SENSITIVITY"] = 20] = "MOTION_SENSITIVITY";
    E_ParameterId[E_ParameterId["SHOCK_DETECTION"] = 21] = "SHOCK_DETECTION";
    E_ParameterId[E_ParameterId["PERIODIC_ACTIVITY_PERIOD"] = 22] = "PERIODIC_ACTIVITY_PERIOD";
    E_ParameterId[E_ParameterId["MOTION_DURATION"] = 23] = "MOTION_DURATION";
    E_ParameterId[E_ParameterId["RESERVED_18"] = 24] = "RESERVED_18";
    E_ParameterId[E_ParameterId["RESERVED_19"] = 25] = "RESERVED_19";
    E_ParameterId[E_ParameterId["BLE_RSSI_FILTER"] = 26] = "BLE_RSSI_FILTER";
    // (negative value, refer to the section Two’s complement Encoding for information about the encoding).
    E_ParameterId[E_ParameterId["BLE_VERSION"] = 253] = "BLE_VERSION";
    E_ParameterId[E_ParameterId["FIRMWARE_VERSION"] = 254] = "FIRMWARE_VERSION";
})(E_ParameterId = exports.E_ParameterId || (exports.E_ParameterId = {}));
exports.C_ParamDescriptions = {
    UL_PERIOD: { code: 0x00, name: 'UL_PERIOD', unit: 's', min: 60, max: 86400,
        description: 'Period of position or activity messages in motion, start/end, activity or permanent operating mode. [60..86400 s]',
    },
    LORA_PERIOD: { code: 0x01, name: 'LORA_PERIOD', unit: 's', min: 300, max: 86400,
        description: 'Period of LoRa heartbeat messages. [300..86400 s]',
    },
    PW_STAT_PERIOD: { code: 0x02, name: 'PW_STAT_PERIOD', unit: 's', min: 300, max: 604800,
        description: 'Period of energy status report. When 0, no status report is sent. (Not used for micro trackers, should be set to 0) [0, 300..60480 s]',
    },
    PERIODIC_POS_PERIOD: { code: 0x03, name: 'PERIODIC_POS_PERIOD', unit: 's', min: 900, max: 604800,
        description: 'Period of the periodic position report. When set to 0, the reporting is disabled. [0, 900..60480 s]',
    },
    GEOLOC_SENSOR: { code: 0x05, name: 'GEOLOC_SENSOR', unit: '', min: 0x00, max: 0x0b,
        description: 'Geolocation sensor profile used in main operating mode and SOS mode.',
    },
    GEOLOC_METHOD: { code: 0x06, name: 'GEOLOC_METHOD', unit: '', min: 0x00, max: 0x06,
        description: 'Geolocation policy used for the side operating modes.',
    },
    MOTION_NB_POS: { code: 0x08, name: 'MOTION_NB_POS', unit: '', min: 1, max: 60,
        description: 'Number of positions to report during motion events (in motion start/end mode only) [1..60]',
    },
    GPS_TIMEOUT: { code: 0x09, name: 'GPS_TIMEOUT', unit: 's', min: 30, max: 300,
        description: 'Timeout for GPS scans before sending a GPS timeout message. [30..300 s]',
    },
    AGPS_TIMEOUT: { code: 0x0a, name: 'AGPS_TIMEOUT', unit: 's', min: 30, max: 250,
        description: 'Timeout for LPGPS scans before sending a GPS timeout message. [30..250 s]',
    },
    GPS_EHPE: { code: 0x0b, name: 'GPS_EHPE', unit: 's', min: 0, max: 100,
        description: 'Acceptable GPS Horizontal Positioning Error [0..100 m]',
    },
    GPS_CONVERGENCE: { code: 0x0c, name: 'GPS_CONVERGENCE', unit: 's', min: 0, max: 300,
        description: 'Time let to the GPS module to refine the calculated position. [0..300 s]',
    },
    CONFIG_FLAGS: { code: 0x0d, name: 'CONFIG_FLAGS', unit: '', min: 0x0000, max: 0x0fff,
        description: 'Configuration flags.',
    },
    TRANSMIT_STRAT: { code: 0x0e, name: 'TRANSMIT_STRAT', unit: '', min: 0x00, max: 0x04,
        description: 'LoRa transmit strategy in motion. (If not in motion always ADR is used.) [0x00..0x04]',
    },
    BLE_BEACON_COUNT: { code: 0x0f, name: 'BLE_BEACON_COUNT', unit: '', min: 1, max: 4,
        description: 'Maximum number of BLE beacons to report. [1..4]',
    },
    BLE_BEACON_TIMEOUT: { code: 0x10, name: 'BLE_BEACON_TIMEOUT', unit: 's', min: 1, max: 5,
        description: 'BLE scan duration. [1..5 s]',
    },
    GPS_STANDBY_TIMEOUT: { code: 0x11, name: 'GPS_STANDBY_TIMEOUT', unit: 's', min: 0, max: 28800,
        description: 'Duration of GPS standby mode before going OFF. When 0, no standby timeout is applied. [0..28800 s]',
    },
    CONFIRMED_UL_BITMAP: { code: 0x12, name: 'CONFIRMED_UL_BITMAP', unit: '', min: 0x0000, max: 0xffff,
        description: 'Bitmap enabling the LoRa confirmation of specific type of uplink message. [0x0000..0xffff]',
    },
    CONFIRMED_UL_RETRY: { code: 0x13, name: 'CONFIRMED_UL_RETRY', unit: '', min: 0, max: 8,
        description: 'The number of retries for each confirmed uplink when the confirmation is not received. [0..8]',
    },
    MOTION_SENSITIVITY: { code: 0x14, name: 'MOTION_SENSITIVITY', unit: '%', min: 0, max: 100,
        description: 'Accelerometer configuration. 0 is default configuration. 1-100 configures the accelerometer sensitivity from 1 to 100% [0..100]',
    },
    SHOCK_DETECTION: { code: 0x15, name: 'SHOCK_DETECTION', unit: '%', min: 0, max: 100,
        description: 'This parameter provides the configuration of the sensitivity of the shock detection from 1 to 100% ' +
            'A value of 0 disables the shock detection. Note: When enabled, the motion_sensitivity parameter must ' +
            'be set to a non-zero value and SHOCK_DETECTION should be strictly less than MOTION_SENSITIVITY [0..100]',
    },
    PERIODIC_ACTIVITY_PERIOD: { code: 0x16, name: 'PERIODIC_ACTIVITY_PERIOD', unit: 's', min: 1800, max: 86400,
        description: 'Period of the periodic activity report. The value must be a multiple of 6. When set to 0, the reporting is disabled. [0, 1800..86400]',
    },
    MOTION_DURATION: { code: 0x17, name: 'MOTION_DURATION', unit: 's', min: 60, max: 3600,
        description: 'Period required to detect the end of a motion. [60..3600]',
    },
    BLE_RSSI_FILTER: { code: 0x1a, name: 'BLE_RSSI_FILTER', unit: 'dBm', min: -100, max: -40,
        description: 'RSSI value to filter BLE beacons with BLE-GPS geolocation mode. [-100..-40]',
    },
    BLE_VERSION: { code: 0xfd, name: 'BLE_VERSION', unit: '', min: 0, max: 0,
        description: 'Get the BLE version.',
    },
    FIRMWARE_VERSION: { code: 0xfe, name: 'FIRMWARE_VERSION', unit: '', min: 0, max: 0,
        description: 'Get the firmware version.',
    },
};
var E_Param_GeolocSensor;
(function (E_Param_GeolocSensor) {
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFi"] = 0] = "WiFi";
    E_Param_GeolocSensor[E_Param_GeolocSensor["GPS"] = 1] = "GPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["LPGPS"] = 2] = "LPGPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["RESERVED_03"] = 3] = "RESERVED_03";
    E_Param_GeolocSensor[E_Param_GeolocSensor["RESERVED_04"] = 4] = "RESERVED_04";
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFiLPGPSGPS"] = 5] = "WiFiLPGPSGPS";
    // (with reset to WIFI on timeout). Superseded by mode 9.
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFiGPS"] = 6] = "WiFiGPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFiLPGPS"] = 7] = "WiFiLPGPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["RESERVED_08"] = 8] = "RESERVED_08";
    E_Param_GeolocSensor[E_Param_GeolocSensor["WiFiLPGPS_WiFiGPS_WiFiLPGPS"] = 9] = "WiFiLPGPS_WiFiGPS_WiFiLPGPS";
    E_Param_GeolocSensor[E_Param_GeolocSensor["BLE"] = 10] = "BLE";
    E_Param_GeolocSensor[E_Param_GeolocSensor["BLEGPS"] = 11] = "BLEGPS";
})(E_Param_GeolocSensor = exports.E_Param_GeolocSensor || (exports.E_Param_GeolocSensor = {}));
var E_Param_GeolocMethod;
(function (E_Param_GeolocMethod) {
    E_Param_GeolocMethod[E_Param_GeolocMethod["WiFi"] = 0] = "WiFi";
    E_Param_GeolocMethod[E_Param_GeolocMethod["GPS"] = 1] = "GPS";
    E_Param_GeolocMethod[E_Param_GeolocMethod["LPGPS"] = 2] = "LPGPS";
    E_Param_GeolocMethod[E_Param_GeolocMethod["WiFiGPS"] = 3] = "WiFiGPS";
    E_Param_GeolocMethod[E_Param_GeolocMethod["WiFiLPGPS"] = 4] = "WiFiLPGPS";
    E_Param_GeolocMethod[E_Param_GeolocMethod["BLE"] = 5] = "BLE";
    E_Param_GeolocMethod[E_Param_GeolocMethod["BLEGPS"] = 6] = "BLEGPS";
})(E_Param_GeolocMethod = exports.E_Param_GeolocMethod || (exports.E_Param_GeolocMethod = {}));
var E_Param_TransmitStrat;
(function (E_Param_TransmitStrat) {
    E_Param_TransmitStrat[E_Param_TransmitStrat["SINGLE_FIXED"] = 0] = "SINGLE_FIXED";
    E_Param_TransmitStrat[E_Param_TransmitStrat["SINGLE_RANDOM"] = 1] = "SINGLE_RANDOM";
    E_Param_TransmitStrat[E_Param_TransmitStrat["DUAL_RANDOM"] = 2] = "DUAL_RANDOM";
    E_Param_TransmitStrat[E_Param_TransmitStrat["DUAL_FIXED"] = 3] = "DUAL_FIXED";
    E_Param_TransmitStrat[E_Param_TransmitStrat["NETWORK_ADR"] = 4] = "NETWORK_ADR";
})(E_Param_TransmitStrat = exports.E_Param_TransmitStrat || (exports.E_Param_TransmitStrat = {}));
var E_ShutdownCause;
(function (E_ShutdownCause) {
    E_ShutdownCause[E_ShutdownCause["USER_ACTION"] = 0] = "USER_ACTION";
    E_ShutdownCause[E_ShutdownCause["LOW_BATTERY"] = 1] = "LOW_BATTERY";
    E_ShutdownCause[E_ShutdownCause["DOWNLINK_REQUEST"] = 2] = "DOWNLINK_REQUEST";
    E_ShutdownCause[E_ShutdownCause["BLE_REQUEST"] = 3] = "BLE_REQUEST";
})(E_ShutdownCause = exports.E_ShutdownCause || (exports.E_ShutdownCause = {}));
var E_EventValue;
(function (E_EventValue) {
    E_EventValue[E_EventValue["GEOLOCATION_START"] = 0] = "GEOLOCATION_START";
    E_EventValue[E_EventValue["MOTION_START"] = 1] = "MOTION_START";
    E_EventValue[E_EventValue["MOTION_END"] = 2] = "MOTION_END";
    E_EventValue[E_EventValue["BLE_CONNECTED"] = 3] = "BLE_CONNECTED";
    E_EventValue[E_EventValue["BLE_DISCONNECTED"] = 4] = "BLE_DISCONNECTED";
})(E_EventValue = exports.E_EventValue || (exports.E_EventValue = {}));
//# sourceMappingURL=constants.js.map