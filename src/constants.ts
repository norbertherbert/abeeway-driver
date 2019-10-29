// ***************************************************************
// *** Abeeway Driver Constants **********************************
// ***************************************************************

export enum E_UPDUType {
    FRAME_PENDING                = 0x00,
    POSITION                     = 0x03,
    ENERGY_STATUS                = 0x04,
    HEART_BEAT                   = 0x05,
    ACTIVITY_CONFIG_SHOCKDETECT  = 0x07,
    SHUTDOWN                     = 0x09,
    EVENT_MESSAGE                = 0x0a,
    DEBUG                        = 0x0f,
}

export enum E_LastResetCause {
    POWERON_RESET                     = 0x01,
    BROWNOUT_UNREGULATED_DOMAIN_RESET = 0x02,
    BROWNOUT_REGULATED_DOMAIN_RESET   = 0x04,
    EXTERNAL_PIN_RESET                = 0x08,
    WATCHDOG_RESET                    = 0x10,
    LOCKUP_RESET                      = 0x20,
    SYSTEM_REQUEST_RESET              = 0x40,
}

export enum E_Tag {
    ACTIVITY                     = 0x01,
    CONFIG                       = 0x02,
    SHOCK_DETECTION              = 0x03,
    ACTIVITY_SIDEOP              = 0x04,
}

export enum E_OperatingMode {
    STANDBY                      = 0x00,
    MOTION_TRACKING              = 0x01,
    PERMANENT_TRACKING           = 0x02,
    START_END_TRACKING           = 0x03,
    ACTIVITY_MONITORING          = 0x04,
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
    BLE_BUSY                     = 0x04,
    NO_BEACON_DETECTED           = 0x05,
    HARDWARE_INCOMPATIBILITY     = 0x06,
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
    TRIGGER_HEARTBEAT            = 0x05,
}

export enum E_DebugAction {
    RESETDEVICE                       = 0x01,
    RESETDEVICE_INITCONFIG            = 0x02,
    RESETDEVICE_INITCONFIG_DELETEBOND = 0x03,
}

export enum E_GPSTimeoutCause {
    USER_TIMEOUT                 = 0x00,
}

export enum E_ParameterId {
    UL_PERIOD                    = 0x00, // s, 60-86400
    LORA_PERIOD                  = 0x01, // s, 300-86400
    PW_STAT_PERIOD               = 0x02, // s, 0 | 300-604800
    PERIODIC_POS_PERIOD          = 0x03, // s, 0 | 900-604800

    RESERVED_04                  = 0x04,

    GEOLOC_SENSOR                = 0x05, // E_Param_GeolocSensor
    GEOLOC_METHOD                = 0x06, // E_Param_GeolocMethod

    RESERVED_07                  = 0x07,

    MOTION_NB_POS                = 0x08, // 1-60
    GPS_TIMEOUT                  = 0x09, // s, 3-300
    AGPS_TIMEOUT                 = 0x0a, // s, 30-250
    GPS_EHPE                     = 0x0b, // s, 0-100
    GPS_CONVERGENCE              = 0x0c, // s, 0-300
    CONFIG_FLAGS                 = 0x0d, // CPDU_ParamConfigFlags
    TRANSMIT_STRAT               = 0x0e, // E_Param_TransmitStrat (0-4)
    BLE_BEACON_COUNT             = 0x0f, // 1-4
    BLE_BEACON_TIMEOUT           = 0x10, // s, 1-5

    GPS_STANDBY_TIMEOUT          = 0x11, // s, 0-28800

    CONFIRMED_UL_BITMAP          = 0x12, // 0x0000-0xffff

    CONFIRMED_UL_RETRY           = 0x13, // 0-8

    MOTION_SENSITIVITY           = 0x14, // %, 0-100
    SHOCK_DETECTION              = 0x15, // %, 0-100
    PERIODIC_ACTIVITY_PERIOD     = 0x16, // s, 0 | 1800-86400
    MOTION_DURATION              = 0x17, // 60..3600S
    RESERVED_18                  = 0x18,
    RESERVED_19                  = 0x19,
    BLE_RSSI_FILTER              = 0x1a, // -100..-40, RSSI value to filter BLE beacons with BLE-GPS geolocation mode. 
                                         // (negative value, refer to the section Two’s complement Encoding for information about the encoding).

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
        description: 'Period of energy status report. When 0, no status report is sent. (Not used for micro trackers, should be set to 0) [0, 300..60480 s]',
    },
    PERIODIC_POS_PERIOD:   { code: 0x03, name: 'PERIODIC_POS_PERIOD',   unit:'s', min: 900,  max: 604800,
        description: 'Period of the periodic position report. When set to 0, the reporting is disabled. [0, 900..60480 s]',
    },

    GEOLOC_SENSOR:         { code: 0x05, name: 'GEOLOC_SENSOR',         unit:'',  min: 0x00, max: 0x0b,
        description: 'Geolocation sensor profile used in main operating mode and SOS mode.',
    }, // E_Param_GeolocSensor
    GEOLOC_METHOD:         { code: 0x06, name: 'GEOLOC_METHOD',         unit:'',  min: 0x00, max: 0x06,
        description: 'Geolocation policy used for the side operating modes.',
    }, // E_Param_GeolocMethod

    MOTION_NB_POS:         { code: 0x08, name: 'MOTION_NB_POS',         unit:'',  min: 1,    max: 60,
        description: 'Number of positions to report during motion events (in motion start/end mode only) [1..60]',
    },
    GPS_TIMEOUT:           { code: 0x09, name: 'GPS_TIMEOUT',           unit:'s', min: 30,    max: 300,
        description: 'Timeout for GPS scans before sending a GPS timeout message. [30..300 s]',
    },
    AGPS_TIMEOUT:          { code: 0x0a, name: 'AGPS_TIMEOUT',          unit:'s', min: 30,   max: 250,
        description: 'Timeout for LPGPS scans before sending a GPS timeout message. [30..250 s]',
    },
    GPS_EHPE:              { code: 0x0b, name: 'GPS_EHPE',              unit:'s', min: 0,    max: 100,
        description: 'Acceptable GPS Horizontal Positioning Error [0..100 m]',
    },
    GPS_CONVERGENCE:       { code: 0x0c, name: 'GPS_CONVERGENCE',       unit:'s', min: 0,    max: 300,
        description: 'Time let to the GPS module to refine the calculated position. [0..300 s]',
    },
    CONFIG_FLAGS:          { code: 0x0d, name: 'CONFIG_FLAGS',          unit:'',  min: 0x0000, max: 0x0fff,
        description: 'Configuration flags.',
    }, // Param_ConfigFlags
    TRANSMIT_STRAT:        { code: 0x0e, name: 'TRANSMIT_STRAT',        unit:'',  min: 0x00, max: 0x04,
        description: 'LoRa transmit strategy in motion. (If not in motion always ADR is used.) [0x00..0x04]',
    }, // E_Param_TransmitStrat (0-4)
    BLE_BEACON_COUNT:      { code: 0x0f, name: 'BLE_BEACON_COUNT',      unit:'',  min: 1,    max: 4,
        description: 'Maximum number of BLE beacons to report. [1..4]',
    },
    BLE_BEACON_TIMEOUT:    { code: 0x10, name: 'BLE_BEACON_TIMEOUT',    unit:'s', min: 1,    max: 5,
        description: 'BLE scan duration. [1..5 s]',
    },
    GPS_STANDBY_TIMEOUT:   { code: 0x11, name: 'GPS_STANDBY_TIMEOUT',   unit:'s', min: 0,   max: 28800,
        description: 'Duration of GPS standby mode before going OFF. When 0, no standby timeout is applied. [0..28800 s]',
    },
    CONFIRMED_UL_BITMAP: { code: 0x12, name: 'CONFIRMED_UL_BITMAP', unit:'',  min: 0x0000, max: 0xffff,
        description: 'Bitmap enabling the LoRa confirmation of specific type of uplink message. [0x0000..0xffff]',
    }, // E_Param_UlBitmap
    CONFIRMED_UL_RETRY:  { code: 0x13, name: 'CONFIRMED_UL_RETRY',  unit:'',  min: 0,    max: 8,
        description: 'The number of retries for each confirmed uplink when the confirmation is not received. [0..8]',
    },


    MOTION_SENSITIVITY:  { code: 0x14, name: 'MOTION_SENSITIVITY',  unit:'%',  min: 0,    max: 100,
        description: 'Accelerometer configuration. 0 is default configuration. 1-100 configures the accelerometer sensitivity from 1 to 100% [0..100]',
    },

    SHOCK_DETECTION:  { code: 0x15, name: 'SHOCK_DETECTION',  unit:'%',  min: 0,    max: 100,
        description: 'This parameter provides the configuration of the sensitivity of the shock detection from 1 to 100% ' +
                     'A value of 0 disables the shock detection. Note: When enabled, the motion_sensitivity parameter must ' +
                     'be set to a non-zero value and SHOCK_DETECTION should be strictly less than MOTION_SENSITIVITY [0..100]',
    },

    PERIODIC_ACTIVITY_PERIOD:  { code: 0x16, name: 'PERIODIC_ACTIVITY_PERIOD',  unit:'s',  min: 1800,    max: 86400,
        description: 'Period of the periodic activity report. The value must be a multiple of 6. When set to 0, the reporting is disabled. [0, 1800..86400]',
    },

    MOTION_DURATION:  { code: 0x17, name: 'MOTION_DURATION',  unit:'s',  min: 60,    max: 3600,
        description: 'Period required to detect the end of a motion. [60..3600]',
    },

    BLE_RSSI_FILTER:  { code: 0x1a, name: 'BLE_RSSI_FILTER',  unit:'dBm',  min: -100,    max: -40,
        description: 'RSSI value to filter BLE beacons with BLE-GPS geolocation mode. [-100..-40]',
    },


    BLE_VERSION: { code: 0xfd, name: 'BLE_VERSION', unit:'', min: 0, max: 0,
        description: 'Get the BLE version.',
    },
    FIRMWARE_VERSION:  { code: 0xfe, name: 'FIRMWARE_VERSION', unit:'', min: 0, max: 0,
        description: 'Get the firmware version.',
    },


}

export enum E_Param_GeolocSensor {
    WiFi                        = 0x00, // WiFi only
    GPS                         = 0x01, // GPS only
    LPGPS                       = 0x02, // LPGPS (AGPS/GPS) only
    RESERVED_03                 = 0x03,
    RESERVED_04                 = 0x04,
    WiFiLPGPSGPS                = 0x05, // Multimode (WIFI + low power-GPS + GPS) 
                                        // (with reset to WIFI on timeout). Superseded by mode 9.
    WiFiGPS                     = 0x06, // WIFI-GPS only (WIFI then GPS if WIFI fails in one geolocation cycle)
    WiFiLPGPS                   = 0x07, // WIFI-LPGPS only (WIFI then LPGPS if WIFI fails in one geolocation cycle)
    RESERVED_08                 = 0x08,
    WiFiLPGPS_WiFiGPS_WiFiLPGPS = 0x09, // WIFI-LPGPS first, then WIFI-GPS until timeout, then back to WIFI-LPGPS
    BLE                         = 0x0a, // BLE scan only
    BLEGPS                      = 0x0b, // BLE-GPS only (BLE then GPS if BLE fails in one geolocation cycle)
}

export enum E_Param_GeolocMethod {
    WiFi                        = 0x00, // WIFI
    GPS                         = 0x01, // GPS
    LPGPS                       = 0x02, // LPGPS (AGPS/GPS)
    WiFiGPS                     = 0x03, // WIFI-GPS only (WIFI then GPS if WIFI fails in one geolocation cycle)
    WiFiLPGPS                   = 0x04, // WIFI-LPGPS only (WIFI then LPGPS if WIFI fails in one geolocation cycle)
    BLE                         = 0x05, // WIFI-LPGPS only (WIFI then LPGPS if WIFI fails in one geolocation cycle)
    BLEGPS                      = 0x06, // BLE-GPS only (BLE then GPS if BLE fails in one geolocation cycle)
}

export enum E_Param_TransmitStrat {
    SINGLE_FIXED                = 0x00,
    SINGLE_RANDOM               = 0x01,
    DUAL_RANDOM                 = 0x02,
    DUAL_FIXED                  = 0x03,
    NETWORK_ADR                 = 0x04,
}

export enum E_ShutdownCause {
    USER_ACTION                 = 0x00,
    LOW_BATTERY                 = 0x01,
    DOWNLINK_REQUEST            = 0x02,
    BLE_REQUEST                 = 0x03,
}

export enum E_EventValue {
    GEOLOCATION_START           = 0x00,
    MOTION_START                = 0x01,
    MOTION_END                  = 0x02,
    BLE_CONNECTED               = 0x03,
    BLE_DISCONNECTED            = 0x04,
}
