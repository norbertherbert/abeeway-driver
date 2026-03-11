const driver = require("../dist/abw-at2-drv-min.js");

function hexToBytes(str){
    var result = [];
    while (str.length >= 2) {
        result.push(parseInt(str.substring(0, 2), 16));
        str = str.substring(2, str.length);
    }
    return result;
}

const bytes = hexToBytes("0a00f9860007");
const recvTime = new Date().toISOString();
const fPort = 18;

const result = driver.decodeUplink({
  bytes,
  recvTime,
  fPort,
});

console.log(JSON.stringify(result, null, 2));