
const xd = require("scenegraph");
const application = require("application");
const { selection } = require("scenegraph")
const { RootNode } = require("./nodes/RootNode")
const uxp = require("uxp");
const fs = require("uxp").storage;
//const fs = require("uxp").storage.localFileSystem;
const { Utils } = require("./utils/Utils")

const { Group } = require("./nodes/Group");
const { UploadImage } = require("./utils/UploadImage");
const export_image = require("./utils/image_export");




//const ngroxBase="http://51.116.181.200/api/";
//const ngroxBase="http://20.52.48.122/api/";
//const ngroxBase="https://2534fbd40a51.ngrok.io/";
const ngroxBase = "http://localhost:3000/";

let renditionTimer;
let panel;

let androidSupportedType = ["Button", "EditText", "ImageView", "Switch", "TextView"];
let AdobeSupportedType = ["Line", "RepeatGrid", "ScrollableGroup"];
var folder;
function create() {

  // [1]
  const html = `
<style>
    .break {
        flex-wrap: wrap;
    }
    label.row > span {
        color: #8E8E8E;
        width: 70px;
        text-align: left;
        font-size: 10px;
    }
    label.row input {
        flex: 1 1 auto;
        width:50%;
    }


    label.row > fieldset {
      width:50%;
      padding: 12px 20px;
      margin: 10px 0;
      box-sizing: border-box;      
 
  }
    
    input[type=text] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
    }

    form {
        width:90%;
        margin: -20px;
        padding: 0px;
    }
    .show {
        display: block;
    }
    .hide {
        display: none;
    }
    .parent {
      margin:auto;
    }

    .container {
      display:flex;
      margin: auto;
      flex-wrap: wrap;
      margin-left:40px;
      background-color:#E0E0E0;

  
  }
  img {
      flex: 1 1 auto;
      width: 100px;
      margin-top:10px;
      margin-left:10px;
      margin-right:10px;
      margin-bottom: 10px;
 
  }
</style>

<form method="dialog" id="main">

<div class="parent">
<div class="container" id="images" > 
</div>
</div>

<div class="row break">
<label class="row">
    <span>↕︎</span>
    <label for="ElementType">Element Type:</label>
    <fieldset>
       <select id = "myList">
         <option value = "EditText">EditText</option>
         <option value = "Button">Button</option>
         <option value = "CheckBox">CheckBox</option>
         <option value = "TextView">TextView</option>
         <option value = "ImageView">ImageView</option>
         <option value = "ProgressBar">ProgressBbar</option>
         <option value = "Switch">Switch</option>


       </select>
 </fieldset>
</label> 
</div>
    <div class="row break">
        <label class="row">
            <span>↕︎</span>
            <label for="idTxt">Element id :</label>
            <input type="text" uxp-quiet="true" id="idTxt"  placeholder="Write the id here" required>
        </label>      
    </div>


    <footer><button id="ok" type="submit" uxp-variant="cta">Apply</button></footer>
  
</form>
<form  method="dialog" id="main">



<button id="export" type="submit" uxp-variant="cta">Export Artboard</button>
<br>

</form>
<p id="warning"> Please select an Artboard to Export Or a Single element.</p>
<p id="instanceType">Init class name</p>

<p id="position"> </p>
`;



  panel = document.createElement("div"); // [9]
  panel.innerHTML = html; // [10]
  panel.querySelectorAll("form")[0].addEventListener("submit", setElementType); // [11]


  return panel; // [12]



}

function setElementType() { // [2]

  const { editDocument } = require("application"); // [3]
  const idTxt = String(document.querySelector("#idTxt").value); // [4]
  var sel = document.getElementById('myList');
  var selectedBox = String(sel.value);
  //const width = Number(document.querySelector("#txtH").value); // [5]

  // [6]

  editDocument({ editLabel: "Increase rectangle size" }, function (selection) {
    const selectedItem = selection.items[0]; // [7]
    //  let res ="*Button*id";

    let res = "";
    res = "_" + selectedBox + "_" + idTxt;
    selectedItem.name = res;
  });
}


function show(event) { // [1]
  if (!panel) event.node.appendChild(create()); // [2]
}

function update(selection, root) { // [1]

  const exportArboards = document.querySelector('#export');



  exportArboards.addEventListener('click', event => {
    exportAllArtboardFromClick();
    //sendRequestAll(ngroxBase+"GenerateProject","GET",false);
  });




  //RootNode.ExportAll(root);

  const form = document.querySelector("form"); // [3]
  let images = document.querySelector("#images");
  const warning = document.querySelector("#warning");
  const buttonExport = document.querySelector("#export");
  const instanceType = document.querySelector("#instanceType"); // [4]
  const position = document.querySelector("#position"); // [4]

  const firstItem = selection.items[0];
  instanceType.innerHTML = "SomeThing Went Wrong  err ";

  while (images.firstChild) {
    images.removeChild(images.firstChild);
  }

  if (renditionTimer) {
    clearTimeout(renditionTimer);
    renditionTimer = null;
  }
  renditionTimer = setTimeout(
    async () => {
      try {
        if (selection.items.length) {
          const renditionsFiles = await createRenditions();
          renditionsFiles.forEach(async renditionFile => {
            const arrayBuffer = await renditionFile.read({ format: fs.formats.binary });
            let image = document.createElement("img");
            let base64 = base64ArrayBuffer(arrayBuffer);
            image.setAttribute("src", `data:image/png;base64,${base64}`);
            images.appendChild(image);
          })
        }
      } catch (e) {
        console.log(e)
      }
    }, 100
  );



  let alltypes = "";


  if (selection.items.length > 1) {
    warning.className = "show";
    form.className = "hide";
    buttonExport.className = "hide";
    alltypes = parseSelectedItems(selection.items);


  } else if (selection.items[0] instanceof xd.Artboard) {
    alltypes = parseSelectedItems(selection.items[0].children);



    warning.className = "hide";
    form.className = "hide";
    buttonExport.className = "show";
  } else if (selection.items.length == 1) {
    warning.className = "hide";
    form.className = "show";
    buttonExport.className = "hide";

    alltypes = parseSelectedItems(selection.items);


  } else {

    warning.className = "hide";
    form.className = "hide";
    buttonExport.className = "hide";

  }

  if (selection.items.length == 1) {

    position.innerHTML = displayPositionOfElement(selection.items[0]);

  }

  instanceType.innerHTML = alltypes;


}

function displayPositionOfElement(element) {
  // console.log("globalBounds",text.globalBounds);
  // console.log("localBounds",text.localBounds );
  // console.log("boundsInParent",text.boundsInParent);
  // console.log("topLeftInParent",text.topLeftInParent);

  // console.log("localCenterPoint",text.localCenterPoint);

  // console.log("globalDrawBounds",text.globalDrawBounds);
  let resPos = "globalBounds X:" + element.globalBounds.x + " Y:" + element.globalBounds.y + "<br>" +
    "localBounds X:" + element.localBounds.x + " Y:" + element.localBounds.y + "<br>" +
    "boundsInParent X:" + element.boundsInParent.x + " Y:" + element.boundsInParent.y + "<br>" +
    "topLeftInParent X:" + element.topLeftInParent.x + " Y:" + element.topLeftInParent.y + "<br>" +
    "localCenterPoint X:" + element.localCenterPoint.x + " Y:" + element.localCenterPoint.y + "<br>" +
    "globalDrawBounds X:" + element.globalDrawBounds.x + " Y:" + element.globalDrawBounds.y + "<br>" +
    "Translation X:" + element.translation.x + " Y:" + element.translation.y + "<br>";

  return resPos;



}


function parseSelectedItems(selection) {
  let res = "";
  selection.forEach(element => {
    res += parseSingleNode(element, "");

  })
  return res;

}

function parseSingleNode(xNode, level) {
  let typeNode = xNode.constructor.name;
  let res = "";
  if (!xNode || (xNode instanceof xd.Group)) {

    res += typeNode + "<br>" + parseGroup(xNode, level + "--");
    // res+=typeNode+getDimension(xNode)+"<br>"+parseGroup(xNode,level+"--");

    return res;

  }
  else {
    return typeNode + "<br>";
  }

}

function parseGroup(group, level) {
  let res = "";
  group.children.forEach(element => {
    res += level + parseSingleNode(element, level);

  });

  return res;

}

async function sendRequest(root) {
  //   const folder = await fs.getFolder();
  //   console.log(folder);

  // global.folder=folder;
  var res = RootNode.ExportAll(root);
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  var theUrl = ngroxBase + "ExportToXml";
  xmlhttp.open("POST", theUrl);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("X-API-KEY", "12345");
  xmlhttp.send(res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 8000);
  });


}

function parseIfGroup(group) {


  if (group instanceof xd.Group) {

    group.children.forEach(element => {

      valideSingleElement2(element);

    });


  }
}

function valideSingleElement(element) {

  let test = false;


  if (Utils.getId(element.name) == "") {
    console.log(Utils.getId(element.name));
    test = true;
    console.log("Error |" + element.name);
  }
  if (Utils.getype(element.name) == "") {
    console.log(Utils.getype(element.name));
    test = true;
    console.log("Error |" + element.name);

  }
  if (test == false) {

    console.log("Succes |" + element.name);

  }
  // if(true){
  //   //  lenaa naamlou fazet el ArrayliST 

  // }




}

function valideSingleElement2(element) {
  let test = false;
  let test2 = false;
  let test3 = false;
  const id=Utils.getId(element.name);

  // console.log(Utils.getId("test").length==0);
  if (androidSupportedType.includes(Utils.getype(element.name))) {
    // console.log("Succes"+element.name);
    test = true;

  } if (id!=undefined) {

    test2 = true;
    // console.log("Succes"+element.name);

  } if (AdobeSupportedType.includes(element.constructor.name)) {
    test3 = true
    console.log("Succes" + element.name);

  }
  if (test && test2 || test3) {

    console.log("Succes" + element.name);

  }

  else {
  //  console.log("ID:"+Utils.getId(element.name)+"  TYPE "+Utils.getype(element.name)+ " TEST NAME ="+test+ " TEST ID ="+test2+ " TEST ADOBE ="+test3)

    if (element instanceof xd.Group&&!test&&!test2 ) {

      parseIfGroup(element);

    }else  if(test&&!test2){
      console.log("EROOR No ID  : " + element.name);
    }
    else if(!test&&test2){
        console.log("EROOR No Type  : " + element.name);
    
      }  else {
        console.log("EROOR No ID NO TYPE  " + element.name);

      }



  }




}
function validAll(root) {
  root.children.forEach(artboard => {

    artboard.children.forEach(element => {

      valideSingleElement2(element);


    });

  });



}

async function exportAllArtboardFromClick() {



  const { editDocument } = require("application");
  editDocument({ editLabel: "Export/GenerateProject" }, async (selected, root) => {
    folder = await fs.localFileSystem.getFolder();
    Utils.exportAllImages(root, folder);

    sendRequestAll(ngroxBase + "GenerateProject", "GET", false).then(value => {
      console.log("On Generate Priject ");
      sendRequest(root).then(value => {
        console.log("On Generate XML ");

        sendRequestAll(ngroxBase + "GetProject", "GET", false).then(value => {

          console.log("On get Project ");

          sendRequestAll(ngroxBase + "download", "GET", true).then(value => {

            console.log("im done here ");
          })


        });

      });

    });


  });

}

async function exportAllArtboardFromCommandId(selection, root) {

  folder = await fs.localFileSystem.getFolder();
  Utils.exportAllImages(root, folder);
  validAll(root);
  // //  sendRequestAll(ngroxBase+"GenerateProject","GET",false).then(value=>{
  // //   console.log("On Generate Priject ");
  // //   sendRequest(root).then(value=>{
  // //     console.log("On Generate XML ");

  // //     sendRequestAll(ngroxBase+"GetProject","GET",false).then(value=>{

  // //       console.log("On get Project ");

  // //       sendRequestAll(ngroxBase+"download","GET",true).then(value=>{

  // //         console.log("im done here ");
  // //       })


  // //     });

  // //   });

  //  });




}
async function exportSelectedArtboardFromCommandId(selection, root) {

  var selectionObj = {};
  selectionObj["children"] = selection.items;
  console.log("hello", selectionObj);
  folder = await fs.localFileSystem.getFolder();
  Utils.exportAllImages(selectionObj, folder);

  sendRequestAll(ngroxBase + "GenerateProject", "GET", false).then(value => {
    console.log("On Generate Priject ");
    sendRequest(selectionObj).then(value => {
      console.log("On Generate XML ");

      sendRequestAll(ngroxBase + "GetProject", "GET", false).then(value => {

        console.log("On get Project ");

        sendRequestAll(ngroxBase + "download", "GET", true).then(value => {

          console.log("im done here ");
        })


      });

    });

  });




}

async function sendRequestAll(url, methode, withAction) {

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  var fileUrl;


  if (withAction) {
    xmlhttp.onreadystatechange = function () {


      try {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          fileUrl = this.responseText;
          downloadZip(fileUrl);

        }
      }
      catch (err) {
        console.log("error ")
        console.log(err.message);
      }
    };

  }
  xmlhttp.open(methode, url);
  xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*")
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("X-API-KEY", "12345");
  xmlhttp.send();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 5000);
  });

}

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
    req.setRequestHeader("Access-Control-Allow-Origin", "*")
    req.setRequestHeader("X-API-KEY", "12345");
    req.responseType = "arraybuffer";
    req.send();
  });
}

async function createRenditions() {
  const folder = await fs.localFileSystem.getTemporaryFolder();
  const arr = await selection.items.map(async item => {
    const file = await folder.createFile(`${item.guid}.png`, { overwrite: true });
    let obj = {};
    obj.node = item;
    obj.outputFile = file;
    obj.type = "png";
    obj.scale = 2;
    return obj
  })
  const renditions = await Promise.all(arr);
  const renditionResults = await application.createRenditions(renditions);
  const renditionsFiles = renditionResults.map(a => a.outputFile);
  return renditionsFiles;
}

function base64ArrayBuffer(arrayBuffer) {
  let base64 = ''
  const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  const bytes = new Uint8Array(arrayBuffer)
  const byteLength = bytes.byteLength
  const byteRemainder = byteLength % 3
  const mainLength = byteLength - byteRemainder

  let a, b, c, d
  let chunk

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63               // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength]

    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4 // 3   = 2^2 - 1

    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2 // 15    = 2^4 - 1

    base64 += encodings[a] + encodings[b] + encodings[c] + '='
  }

  return base64
}




module.exports = {
  panels: {
    enlargeRectangle: {
      show,
      update
    }
  },
  commands: {
    exportAllArtboard: exportAllArtboardFromCommandId,
    exportSelectedArtboard: exportSelectedArtboardFromCommandId,

  }

}
