
const uxp = require("uxp");
var folder;


async function downloadZip(url) {
    try {
        const photoObj = await xhrBinary(url);
        //const tempFolder = await fs.getFolder();
        const tempFile = await folder.createFile("tmp.zip", { overwrite: true });
        await tempFile.write(photoObj, { format: uxp.storage.formats.binary });
      
    } catch (err) {
        console.log("error on Download Zip")
        console.log(err.message);
    }
  }
  
  
  
  exports.downloadZip = downloadZip;

  
  function xhrBinary(url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
     
        req.onload = () => {
            if (req.status === 200) {
                try {
                    const arr = new Uint8Array(req.response);
                    resolve(arr);
                } catch (err) {
                    reject('Couldnt parse response. ${err.message}, ${req.response}');
                }
            } else {
                reject('Request had an error: ${req.status}');
            }
        }
        req.onerror = reject;
        req.onabort = reject;
        req.open('GET', url, true);
        req.setRequestHeader("X-API-KEY", "12345");
        req.responseType = "arraybuffer";
        req.send();
    });
  }

