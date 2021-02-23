const {Rectangle, Color} = require("scenegraph"); 


function rectangleHandlerFunction(selection) { 

  const newElement = new Rectangle(); 
  newElement.width = 100;
  newElement.height = 50;
  newElement.fill = new Color("Purple");

  selection.insertionParent.addChild(newElement);
  newElement.moveInParentCoordinates(100, 100);

}

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
        width: 20px;
        text-align: right;
        font-size: 9px;
    }
    label.row input {
        flex: 1 1 auto;
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
            <input type="number" uxp-quiet="true" id="txtV" value="10" placeholder="Height" />
        </label>
        <label class="row">
            <span>↔︎</span>
            <input type="number" uxp-quiet="true" id="txtH" value="10" placeholder="Width" />
        </label>
    </div>
    <footer><button id="ok" type="submit" uxp-variant="cta">Apply</button></footer>
</form>

<p id="warning">This plugin requires you to select a rectangle in the document. Please select a rectangle.</p>
<p id="instanceType">.</p>
`;

  function increaseRectangleSize() { // [2]
    const { Rectangle } = require("scenegraph"); // [2]
    const { editDocument } = require("application"); // [3]
    const height = Number(document.querySelector("#txtV").value); // [4]
    const width = Number(document.querySelector("#txtH").value); // [5]
  
    // [6]
    editDocument({ editLabel: "Increase rectangle size" }, function(selection) {
      const selectedRectangle = selection.items[0]; // [7]
      const test = new Rectangle(); 
     // console.log(test.X);
     // console.log(test.globalX);
     // console.log(test.x);
     // console.log(test.X);
      selectedRectangle.width += width; // [8]
      selectedRectangle.height += height;
      
      console.log("x ",selectedRectangle.translation.x);
      console.log("y ",selectedRectangle.translation.y);
      console.log("width ",selectedRectangle.width);
      console.log("height ",selectedRectangle.height);
      console.log("visible ",selectedRectangle.visible);
      console.log(selectedRectangle.constructor.name);
     

     // console.log(selectedRectangle.width);
     
    });
  }

  panel = document.createElement("div"); // [9]
  panel.innerHTML = html; // [10]
  panel.querySelector("form").addEventListener("submit", increaseRectangleSize); // [11]

  return panel; // [12]
}

function show(event) { // [1]
  if (!panel) event.node.appendChild(create()); // [2]
}

function update(selection) { // [1]
  const { Rectangle } = require("scenegraph"); // [2]

  const form = document.querySelector("form"); // [3]
  const warning = document.querySelector("#warning"); // [4]
  const instanceType = document.querySelector("#instanceType"); // [4]
  let name = selection.items[0].constructor.name;
  console.log("this the name ",name)
  if (!selection || !(selection.items[0] instanceof Rectangle)) { // [5]
    form.className = "hide";
    warning.className = "show";
   // instanceType.className=  "hide";
    instanceType.innerHTML = name
    
  } else {
    form.className = "show";
    warning.className = "hide";
 //   instanceType.className=  "show";
   // instanceType.value = selection.items[0].constructor.name()
    instanceType.innerHTML = name
  

    
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
    firstAction: rectangleHandlerFunction
}
}
;