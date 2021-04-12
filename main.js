
const xd = require("scenegraph");


const { RootNode } = require("./nodes/RootNode")

const fs = require("uxp").storage.localFileSystem;
const { Utils } = require("./utils/Utils")

const { Group } = require("./nodes/Group");
const { UploadImage } = require("./utils/UploadImage");
const export_image  = require("./utils/image_export");








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
<button id="export" type="submit" uxp-variant="cta">Export Artboard</button>
<button id="exportImage" type="submit" uxp-variant="cta">Export Image</button>
<button id="lastTry" type="submit" uxp-variant="cta">lastTry</button>
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
  const button = document.querySelector('#export');
  const buttonExportImage = document.querySelector('#exportImage');
  const testBtn = document.querySelector('#lastTry');

  testBtn.addEventListener('click', event => {
    test();
  });
  button.addEventListener('click', event => {
    sendRequest(root);
  });

  buttonExportImage.addEventListener('click', event => {

     export_image.exportImage(selection);
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


async function sendRequest(root,folder) {
  //   const folder = await fs.getFolder();
  //   console.log(folder);

  // global.folder=folder;
  var res = RootNode.ExportAll(root,folder);


  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  var theUrl = "https://a08dcc5cc885.ngrok.io/ExportToXml";
  xmlhttp.open("POST", theUrl);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(res);


}

async function test() {
  console.log("im hererererer")
  const { editDocument } = require("application"); // [
  editDocument({ editLabel: "Export all widgets" }, async (selected, root) => {

    await exportAllImages(root,folder);
    //sendRequest(root,folder);

  




     
});

}


async function exportAllImages(root,folder) {


// await Promise.all(root.children.map(async (artboard) => {  


 

//   //     console.log("1-im in ");
//   //     setTimeout(async() => {
//   // let ress= await export_image.exportImage(element,folder);
//   // console.log("5-"+ress);
//   //   }, 3000);
//   await Promise.all(artboard.children.map(async (element) => {
//     console.log(element.name);
//     if(Utils.getype(element.name)=="ImageView"){

//       const ress= await export_image.exportImage(element,folder);
//       console.log("5-"+ress);
  
//       }
//   }));

//   // for (let test in artboard.children) {
//   //   console.log("name"+test.name);
//   //   if(Utils.getype(test.name)=="ImageView"){

//   //   const ress= await export_image.exportImage(test,folder);
//   //   console.log("5-"+ress);

//   //   } 
//   // }




//   }));

let allImages=Array();
root.children.forEach((artboard)=>{

artboard.children.forEach((element)=>{
  
  if(Utils.getype(element.name)=="ImageView"){
    allImages.push(element);
  }


})



});

if(allImages.length>0){
  export_image.exportRendition(allImages,folder);
}



}

  


module.exports = {
  panels: {
    enlargeRectangle: {
      show,
      update
    }
  },
  commands: {
    test
  }

}
