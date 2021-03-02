const {Rectangle, Color} = require("scenegraph"); 
const xd = require("scenegraph"); 

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
<form method="dialog" id="export">
<button id="export" type="submit" uxp-variant="cta">Export Artboard</button>
</form>
<p id="warning"> Please select an Artboard to Export Or a Single element.</p>
<p id="instanceType">Init class name</p>
`;






  panel = document.createElement("div"); // [9]
  panel.innerHTML = html; // [10]
  panel.querySelector("form").addEventListener("submit", setElementType); // [11]
  

  return panel; // [12]


  
}

function setElementType() { // [2]
  const { Rectangle } = require("scenegraph"); // [2]
  const { editDocument } = require("application"); // [3]
  const idTxt =String(document.querySelector("#idTxt").value); // [4]
  var sel = document.getElementById('myList');
  var selectedBox = String(sel.value);
  //const width = Number(document.querySelector("#txtH").value); // [5]

  // [6]
  editDocument({ editLabel: "Increase rectangle size" }, function(selection) {
    const selectedRectangle = selection.items[0]; // [7]
    selectedRectangle.name="test";
  

  });
}



function show(event) { // [1]
  if (!panel) event.node.appendChild(create()); // [2]
}

function update(selection) { // [1]
  
  document.querySelector("#export").addEventListener("click", sendRequest(selection)); // [11]

  

  const form = document.querySelector("form"); // [3]
  
  const warning = document.querySelector("#warning");
  const buttonExport = document.querySelector("#export");
  const instanceType = document.querySelector("#instanceType"); // [4]
  const firstItem = selection.items[0];
  instanceType.innerHTML ="SomeThing Went Wrong Sofiene err ";

  let alltypes = "";


if(selection.items.length>1){
  warning.className = "show" ;
  form.className = "hide" ;
  buttonExport.className = "hide" ; 
  alltypes = parseSelectedItems(selection.items);
  

}else if(selection.items[0] instanceof xd.Artboard){
  alltypes= parseSelectedItems(selection.items[0].children);



  warning.className = "hide" ;
  form.className = "hide" ;
  buttonExport.className = "show" ; 
}else if(selection.items.length==1) {
  warning.className = "hide" ;
  form.className = "show" ;
  buttonExport.className = "hide" ;
 
  alltypes = parseSelectedItems(selection.items);


}else {

  warning.className = "hide" ;
  form.className = "hide" ;
  buttonExport.className = "hide" ; 

}

  instanceType.innerHTML =alltypes;

  /*
  if (!selection || !(selection.items[0] instanceof Rectangle)) { // [5]
  
   // instanceType.className=  "hide";
 instanceType.innerHTML = name
    
  } else {
    form.className = "show";
    warning.className = "hide";
 //   instanceType.className=  "show";
   // instanceType.value = selection.items[0].constructor.name()
    instanceType.innerHTML = name
  

    
  }
  */
}
function parseSelectedItems(selection){
  let res = "";
  selection.forEach(element=>{
    res+=parseSingleNode(element,"");

  })
  return res;

}

function parseSingleNode(xNode,level){
  let typeNode = xNode.constructor.name;
  let res = "";
  if(!xNode || (xNode instanceof xd.Group)){
    
    res+=typeNode+"<br>"+parseGroup(xNode,level+"--");
   // res+=typeNode+getDimension(xNode)+"<br>"+parseGroup(xNode,level+"--");

   return res;
   
  }else {
    return typeNode+"<br>";
  //return typeNode+"<br>"+xNode.name+"<br>";
 // return typeNode+getDimension(xNode)+"<br>";
  }

}



function parseGroup (group,level){
  let res = "";
  group.children.forEach(element => {
    res+=level+ parseSingleNode(element,level);

  });
 
  return res;

}

function test(selection){
  console.log("toutoutuu");
  console.log(selection.items.length);
  
  
  }


  function sendRequest(selection)
{
 let alltypes="";
 console.log("ranni lena wlh");
  alltypes = parseSelectedItems(selection.items);
  console.log(alltypes);
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  var theUrl = "https://3c972f9866b8.ngrok.io/post";
  xmlhttp.open("POST", theUrl);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


  xmlhttp.send(JSON.stringify({ "elementId": "test", "elementType":"test" }));
}

module.exports = {
  panels: {
    enlargeRectangle: {
      show,
      update
    }
  }
 
}
;