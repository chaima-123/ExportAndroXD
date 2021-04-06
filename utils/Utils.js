
const { Button } = require("../androidWidget/Button");
const { EditText } = require("../androidWidget/EditText");
const { TextView } = require("../androidWidget/TextView");
const { CheckBox } = require("../androidWidget/CheckBox");
const xd = require("scenegraph"); 

const { Text } = require("../nodes/Text");
const { Group } = require("../nodes/Group");
const { Rectangle } = require("../nodes/Rectangle");


const AndroidTypes = {
  Button:"Button",
  Textview:"Textview",
  EditText:"EditText",

};

class Utils {
 

static getype(fullNameNode){

    var myType = fullNameNode.substring(
        fullNameNode.indexOf("_") + 1, 
        fullNameNode.lastIndexOf("_")
    );

    return myType;

}

static getId(fullNameNode){

    var myId = fullNameNode.substring(
        fullNameNode.lastIndexOf("_") + 1, 
        
    );

    return myId;

}

static ParseByAndroidClass(xdNode,typeWidget) {
    if(typeWidget=="Button"){
        return Button.parseButtonToJson(xdNode);
    }else if (typeWidget=="EditText"){
      return EditText.parseEditTextToJson(xdNode);
    }else if(typeWidget=="TextView"){ 
      return TextView.parseTextViewToJson(xdNode);
    }else{

      return {"res":"Types widget invalide"};
            // let data={};
            //     data["NOTYPE"]="NOTYPE";
            // return data;
          }
    }
  

    static parseElement(xdNode){
      
     let  typeWidget= this.getype(xdNode.name);
     console.log(xdNode.name+"  "+typeWidget);
      if(typeWidget!=""){
          return this.ParseByAndroidClass(xdNode,typeWidget);

      }else {

        return this.ParseByAdobeClass(xdNode)



      }



    }







 static ParseByAdobeClass(xdNode) {
    if (xdNode instanceof xd.Group) { 
      let arr=Array();
     xdNode.children.forEach(element => {
      arr.push( this.parseElement(element));
 
    
      });
      return arr;
  
      }
      if (xdNode instanceof xd.Text) { 
        //  return  Text.parseTextToJson(xdNode);
        return {"result":"this is a Text From Adobe Class without Annot"};
      }
      if (xdNode instanceof xd.Rectangle) { 
        return {"result":"this is a Rectangle From Adobe Class without Annot"};
      //  return  Rectangle.parseRectangleToJson(xdNode);
      }
     
      if (xdNode instanceof xd.Path || xdNode instanceof xd.Polygon ||
         xdNode instanceof xd.Ellipse ||
          xdNode instanceof xd.BooleanGroup || xdNode instanceof xd.Line) {
            return {"res":"not yet"};
      }
      if (xdNode instanceof xd.SymbolInstance) {
        return {"res":"not yet"};
        }
      if (xdNode instanceof xd.Artboard) {
        return {"res":"not yet"};
        }
        return {"res":"not yet"};
  }

}

exports.Utils = Utils;