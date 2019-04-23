// ***************************************************************
// *** Abeeway Driver Constants **********************************
// ***************************************************************

export enum E_UPDUType {
    FRAME_PENDING                = 0x00,
    POSITION                     = 0x03,
    ENERGY_STATUS                = 0x04,
    HEART_BEAT                   = 0x05,
    ACTIVITY_OR_CONFIG           = 0x07,
    SHUTDOWN                     = 0x09,
    DEBUG                        = 0xff,
}

export enum E_Tag {
    ACTIVITY                     = 0x01,
    CONFIG                       = 0x02,
}

export enum E_OperatingMode {
    STANDBY                      = 0x00,
    MOTION_TRACKING              = 0x01,
    PERMANENT_TRACKING           = 0x02,
    START_END_TRACKING           = 0x03,
    ACTIVITY_TRACKING            = 0x04,
    OFF                          = 0x05,
}

export enum E_PositionInformation {
    GPS_FIX                      = 0x00,
    GPS_TIMEOUT                  = 0x01,
    NO_MORE_USED                 = 0x02,
    WIFI_TIMEOUT                 = 0x03,
    WIFI_FAILURE                 = 0x04,
    LPGPS_DATA1                  = 0x05,
    LPGPS_DATA2                  = 0x06,
    BLE_BACON_SCAN               = 0x07,
    BLE_BACON_FAILURE            = 0x08,
    WIFI_BSSIDS                  = 0x09,
}

export enum E_WiFiFailure {
    CONNECTION_FAILURE           = 0x00,
    SCAN_FAILURE                 = 0x01,
    ANTENNA_UNAVAILABLE          = 0x02,
    WIFI_NOT_SUPPORTED           = 0x03,
}

export enum E_BLEFailure {
    BLE_IS_NOT_RESPONDING        = 0x00,
    INTERNAL_ERROR               = 0x01,
    SHARED_ANTENNA_NOT_AVAILABLE = 0x02,
    SCAN_ALREADY_ONGOING         = 0x03,
    NO_BEACON_DETECTED           = 0x04,
    HARDWARE_INCOMPATIBILITY     = 0x05,
}

export enum E_DPDUType {
    POSITION_ON_DEMAND           = 0x01,
    SET_MODE                     = 0x02,
    REQUEST_CONFIGURATION        = 0x03,
    START_SOS_MODE               = 0x04,
    STOP_SOS_MODE                = 0x05,
    SET_PARAM                    = 0x0b,
    DEBUG_COMMAND                = 0xff,
}

export enum E_DebugCmd {
    RESET_DEVICE                 = 0x01,
    BLE_BOND_REMOVE              = 0x02,
}

export enum E_GPSTimeoutCause {
    USER_TIMEOUT                 = 0x00,
}

export enum E_ParameterId {
    UL_PERIOD                    = 0x00, // s, 60-86400
    LORA_PERIOD                  = 0x01, // s, 300-86400
    PW_STAT_PERIOD               = 0x02, // s, 0 | 300-604800
    PERIODIC_POS_PERIOD          = 0x03, // s, 0 | 900-604800

    GEOLOC_SENSOR                = 0x05, // E_Param_GeolocSensor
    GEOLOC_METHOD                = 0x06, // E_Param_GeolocMethod

    MOTION_NB_POS                = 0x08, // 1-60
    GPS_TIMEOUT                  = 0x09, // s, 3-300
    AGPS_TIMEOUT                 = 0x0a, // s, 30-250
    GPS_EHPE                     = 0x0b, // s, 0-100
    GPS_CONVERGENCE              = 0x0c, // s, 0-300
    CONFIG_FLAGS                 = 0x0d, // Param_ConfigFlags
    TRANSMIT_STRAT               = 0x0e, // E_Param_TransmitStrat (0-4)
    BLE_BEACON_COUNT             = 0x0f, // 1-4
    BLE_BEACON_TIMEOUT           = 0x10, // s, 1-5
    GPS_STANDBY_TIMEOUT          = 0x11, // s, 10-7200

    //TODO: what is this?
    CONFIRMED_UPDU_BITMAP          = 0x12, // 0x00-0xffff

    CONFIRMED_UPDU_RETRY           = 0x13, // 0-8
}

export const C_ParameterId = {
    0x00: { name: 'UL_PERIOD',            unit:'s', min: 60,   max: 86400  },
    0x01: { name: 'LORA_PERIOD',          unit:'s', min: 300,  max: 86400  },
    0x02: { name: 'PW_STAT_PERIOD',       unit:'s', min: 300,  max: 604800 },
    0x03: { name: 'PERIODIC_POS_PERIOD',  unit:'s', min: 900,  max: 604800 },

    0x05: { name: 'GEOLOC_SENSOR',        unit:'',  min: 0x00, max: 0x10   }, // E_Param_GeolocSensor
    0x06: { name: 'GEOLOC_METHOD',        unit:'',  min: 0x00, max: 0x05   }, // E_Param_GeolocMethod

    0x08: { name: 'MOTION_NB_POS',        unit:'',  min: 1,    max: 60     },
    0x09: { name: 'GPS_TIMEOUT',          unit:'s', min: 3,    max: 300    },
    0x0a: { name: 'AGPS_TIMEOUT',         unit:'s', min: 30,   max: 250    },
    0x0b: { name: 'GPS_EHPE',             unit:'s', min: 0,    max: 100    },
    0x0c: { name: 'GPS_CONVERGENCE',      unit:'s', min: 0,    max: 300    },
    0x0d: { name: 'CONFIG_FLAGS',         unit:'',  min: 0x00, max: 0xff   }, // Param_ConfigFlags
    0x0e: { name: 'TRANSMIT_STRAT',       unit:'',  min: 0x00, max: 0x04   }, // E_Param_TransmitStrat (0-4)
    0x0f: { name: 'BLE_BEACON_COUNT',     unit:'',  min: 1,    max: 4      },
    0x10: { name: 'BLE_BEACON_TIMEOUT',   unit:'s', min: 1,    max: 5      },
    0x11: { name: 'GPS_STANDBY_TIMEOUT',  unit:'s', min: 10,   max: 7200   },
    0x12: { name: 'CONFIRMED_UPDU_BITMAP',  unit:'',  min: 0x00, max: 0xffff },
    0x13: { name: 'CONFIRMED_UPDU_RETRY',   unit:'',  min: 0,    max: 8      },
}

export enum E_Param_GeolocSensor {
    WiFi                        = 0x00,
    GPS                         = 0x01,
    LPGPS                       = 0x02,

    WiFiLPGPSGPS                = 0x05,
    WiFiGPS                     = 0x06,
    WiFiLPGPS                   = 0x07,
    WiFiLPGPS_WiFiGPS_WiFiLPGPS = 0x09,
    BLE                         = 0x10,
}

export enum E_Param_GeolocMethod {
    WiFi                        = 0x00,
    GPS                         = 0x01,
    LPGPS                       = 0x02,
    WiFiGPS                     = 0x03,
    WiFiLPGPS                   = 0x04,
    BLE                         = 0x05,
}

export enum E_Param_TransmitStrat {
    SINGLE_FIXED                = 0x00,
    SINGLE_RANDOM               = 0x01,
    DUAL_RANDOM                 = 0x02,
    DUAL_FIXED                  = 0x03,
    NETWORK_ADR                 = 0x04,
}
