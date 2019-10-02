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
    GEOLOC_START                 = 0x0a,
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
    BLE_BEACONIDS                = 0x07,
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

    RESERVED                     = 0x04,

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
    CONFIRMED_UL_BITMAP          = 0x12, // 0x00-0xff

    CONFIRMED_UL_RETRY           = 0x13, // 0-8

    MOTION_SENSITIVITY           = 0x14,
    SHOCK_DETECTION              = 0x15,
    PERIODIC_ACTIVITY_PERIOD     = 0x16,
    MOTION_DURATION              = 0x17,
    RESERVED1                    = 0x18,
    RESERVED2                    = 0x19,
    BLE_RSSI_FILTER              = 0x1A,

    BLE_VERSION                  = 0xfd,
    FIRMWARE_VERSION             = 0xfe,

}

export const C_ParamDescriptions = {
    UL_PERIOD:             { code: 0x00, name: 'UL_PERIOD',             unit:'s', min: 60,   max: 86400,
        description: 'Period of position or activity messages in motion, start/end, activity or permanent operating mode. [60..86400 s]',
    },
    LORA_PERIOD:           { code: 0x01, name: 'LORA_PERIOD',           unit:'s', min: 300,  max: 86400,
        description: 'Period of LoRa heartbeat messages. [300..86400 s]',
    },
    PW_STAT_PERIOD:        { code: 0x02, name: 'PW_STAT_PERIOD',        unit:'s', min: 300,  max: 604800,
        description: 'Period of energy status report. When 0, no status report is sent. (Not used for micro trackers) [0, 300..60480 s]',
    },
    PERIODIC_POS_PERIOD:   { code: 0x03, name: 'PERIODIC_POS_PERIOD',   unit:'s', min: 900,  max: 604800,
        description: 'Period of the periodic position report. A 0 value disables this reporting. [0, 900..60480 s]',
    },

    GEOLOC_SENSOR:         { code: 0x05, name: 'GEOLOC_SENSOR',         unit:'',  min: 0x00, max: 0x10,
        description: 'Geoloc sensor profile used in motion, start/end or permanent tracking operating mode.',
    }, // E_Param_GeolocSensor
    GEOLOC_METHOD:         { code: 0x06, name: 'GEOLOC_METHOD',         unit:'',  min: 0x00, max: 0x05,
        description: 'Oneshot geolocation policy used for alert, periodic or on demand positions.',
    }, // E_Param_GeolocMethod

    MOTION_NB_POS:         { code: 0x08, name: 'MOTION_NB_POS',         unit:'',  min: 1,    max: 60,
        description: 'Number of positions to report during motion events (in motion start/end mode only) [1..60]',
    },
    GPS_TIMEOUT:           { code: 0x09, name: 'GPS_TIMEOUT',           unit:'s', min: 3,    max: 300,
        description: 'Timeout for GPS scans before sending a GPS timeout message. [30..300 s]',
    },
    AGPS_TIMEOUT:          { code: 0x0a, name: 'AGPS_TIMEOUT',          unit:'s', min: 30,   max: 250,
        description: 'Timeout for LPGPS scans before sending a GPS timeout message. [30..250 s]',
    },
    GPS_EHPE:              { code: 0x0b, name: 'GPS_EHPE',              unit:'s', min: 0,    max: 100,
        description: 'Acceptable GPS Horizontal Positioning Error [0..100 m]',
    },
    GPS_CONVERGENCE:       { code: 0x0c, name: 'GPS_CONVERGENCE',       unit:'s', min: 0,    max: 300,
        description: 'Time available for the GPS module to refine the calculated position. [0..300 s]',
    },
    CONFIG_FLAGS:          { code: 0x0d, name: 'CONFIG_FLAGS',          unit:'',  min: 0x00, max: 0xff,
        description: 'Configuration flags.',
    }, // Param_ConfigFlags
    TRANSMIT_STRAT:        { code: 0x0e, name: 'TRANSMIT_STRAT',        unit:'',  min: 0x00, max: 0x04,
        description: 'LoRa transmit strategy in motion. (If not in motion always ADR is used.)',
    }, // E_Param_TransmitStrat (0-4)
    BLE_BEACON_COUNT:      { code: 0x0f, name: 'BLE_BEACON_COUNT',      unit:'',  min: 1,    max: 4,
        description: 'Maximum number of BLE beacons to report. [1..4]',
    },
    BLE_BEACON_TIMEOUT:    { code: 0x10, name: 'BLE_BEACON_TIMEOUT',    unit:'s', min: 1,    max: 5,
        description: 'Timeout used by the BLE beacon for geolocation. [1..5 s]',
    },
    GPS_STANDBY_TIMEOUT:   { code: 0x11, name: 'GPS_STANDBY_TIMEOUT',   unit:'s', min: 10,   max: 28800,
        description: 'Duration of GPS standby mode before going OFF. [10..28800 s]',
    },
    CONFIRMED_UL_BITMAP: { code: 0x12, name: 'CONFIRMED_UL_BITMAP', unit:'',  min: 0x00, max: 0xff,
        description: 'Bitmap enabling the LoRa confirmation of specific type of uplink message. [0x00..0xff]',
    }, // E_Param_UlBitmap
    CONFIRMED_UL_RETRY:  { code: 0x13, name: 'CONFIRMED_UL_RETRY',  unit:'',  min: 0,    max: 8,
        description: 'The number of retries for each confirmed uplink when the confirmation is not received. [0..8]',
    },



    BLE_VERSION: { code: 0xfd, name: 'BLE_VERSION', unit:'', min: 0, max: 0,
        description: 'Get the BLE version.',
    },
    FIRMWARE_VERSION:  { code: 0xfe, name: 'FIRMWARE_VERSION', unit:'', min: 0, max: 0,
        description: 'Get the firmware version.',
    },


}

export enum E_Param_GeolocSensor {
    WiFi                        = 0x00,
    GPS                         = 0x01,
    LPGPS                       = 0x02,

    WiFiLPGPSGPS                = 0x05,
    WiFiGPS                     = 0x06,
    WiFiLPGPS                   = 0x07,
    WiFiLPGPS_WiFiGPS_WiFiLPGPS = 0x09,
    BLE                         = 0x0a,
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
