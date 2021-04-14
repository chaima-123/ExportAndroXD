
const xd = require("scenegraph");


const { RootNode } = require("./nodes/RootNode")
const uxp = require("uxp");
const fs = require("uxp").storage.localFileSystem;
const { Utils } = require("./utils/Utils")

const { Group } = require("./nodes/Group");
const { UploadImage } = require("./utils/UploadImage");
const export_image  = require("./utils/image_export");





const ngroxBase="https://100821e9a20b.ngrok.io/";


let panel;
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
</style>

<form method="dialog" id="main">

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

<button id="emptyProject" type="submit" uxp-variant="cta">emptyProject</button>
<br>

<button id="export" type="submit" uxp-variant="cta">Export Artboard</button>
<br>
<button id="saveProject" type="submit" uxp-variant="cta">saveProject</button>
<br> 

<button id="downloadProject" type="submit" uxp-variant="cta">downloadProject  </button>





</form>
<p id="warning"> Please select an Artboard to Export Or a Single element.</p>
<p id="instanceType">Init class name</p>
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
  const emptyProject = document.querySelector('#emptyProject');
  const exportArboards= document.querySelector('#export');
  const saveProject = document.querySelector('#saveProject');
  const downloadProject = document.querySelector('#downloadProject');


  emptyProject.addEventListener('click', event => {
    sendRequestAll(ngroxBase+"GenerateProject","GET",false);
  });
  exportArboards.addEventListener('click', event => {
    exportAllWidget();
  });
  saveProject.addEventListener('click', event => {
    sendRequestAll(ngroxBase+"GetProject","GET",false);
  });
  downloadProject.addEventListener('click', event => {
      sendRequestAll(ngroxBase+"download","GET",true);
  });



  //RootNode.ExportAll(root);

  const form = document.querySelector("form"); // [3]

  const warning = document.querySelector("#warning");
  const buttonExport = document.querySelector("#export");
  const instanceType = document.querySelector("#instanceType"); // [4]
  const firstItem = selection.items[0];
  instanceType.innerHTML = "SomeThing Went Wrong  err ";

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

  instanceType.innerHTML = alltypes;


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

  } else if (!(xNode.fill instanceof xd.ImageFill)) {

    return "<br>" + " Please select an image"+"<br>";
  }
  else if (checkImage(xNode)) {
    // return "fill is "+xNode.fill +"<br>";
    return "<br>" + "MimeType is " + xNode.fill.mimeType + "   Name = " + UploadImage._getImageFillName(xNode.fill) + "<br>";

  }
  else {
    return typeNode + "<br>";
  }

}




function checkImage(xNode) {
  let res = "";
  if (!xNode.fill && !(xNode.fill instanceof xd.ImageFill)) { return false; }
  return true;

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
  var theUrl = ngroxBase+"ExportToXml";
  xmlhttp.open("POST", theUrl);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("X-API-KEY", "12345"); 
  xmlhttp.send(res);


}

async function exportAllWidget() {
  console.log("im hererererer")
  const { editDocument } = require("application"); // [
  editDocument({ editLabel: "Export all widgets" }, async (selected, root) => {
    const folder = await fs.getFolder();

     sendRequest(root);
     Utils.exportAllImages(root,folder);
   
   
});

}


// 1- Generate empty project 
// localhost:3000/GenerateProject
// [POST] 2- Export to xml
// localhost:3000/ExportToXml
// 3- Save Project to the cloud
// localhost:3000/GetProject
// 4- Download project ( client )
// localhost:3000/download



async function sendRequestAll(url,methode,withAction) {

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  var fileUrl;
  

  if(withAction){
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      fileUrl = this.responseText;
      downloadZip(fileUrl);

    }
  };

}
  xmlhttp.open(methode, url);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("X-API-KEY", "12345");
  xmlhttp.send();

}


async function downloadZip(url) {
  try {
      const photoObj = await xhrBinary(url);
      const tempFolder = await fs.getFolder();
      const tempFile = await tempFolder.createFile("tmp.zip", { overwrite: true });
      await tempFile.write(photoObj, { format: uxp.storage.formats.binary });
    
  } catch (err) {
      console.log("error")
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
      req.setRequestHeader("X-API-KEY", "12345");
      req.responseType = "arraybuffer";
      req.send();
  });
}

 

  


module.exports = {
  panels: {
    enlargeRectangle: {
      show,
      update
    }
  },
  commands: {
    exportAllWidget
  }

}
