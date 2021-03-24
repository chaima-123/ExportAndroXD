
const { Button } = require("../androidWidget/Button");
const { EditText } = require("../androidWidget/EditText");
const { TextView } = require("../androidWidget/TextView");
const { CheckBox } = require("../androidWidget/CheckBox");


const { Text } = require("../nodes/Text");
const { Group } = require("../nodes/Group");
const { Rectangle } = require("../nodes/Rectangle");




class Utils {


static getype(fullNameNode){

    var myType = fullNameNode.substring(
        fullNameNode.indexOf("*") + 1, 
        fullNameNode.lastIndexOf("*")
    );

    return myType;

}

static getId(fullNameNode){

    var myId = fullNameNode.substring(
        fullNameNode.lastIndexOf("*") + 1, 
        
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

      return {};
            // let data={};
            //     data["NOTYPE"]="NOTYPE";
            // return data;
          }
    }
  








 static ParseByAdobeClass(xdNode) {
    if (xdNode instanceof xd.Text) { 
       return  Text.parseTextToJson(xdNode);
      }
      if (xdNode instanceof xd.Group) { 
        return  Group.parseGroupToJson(xdNode);
      }
      if (xdNode instanceof xd.Rectangle) { 
        return  Rectangle.parseRectangleToJson(xdNode);
      }
     
      if (xdNode instanceof xd.Path || xdNode instanceof xd.Polygon ||
         xdNode instanceof xd.Ellipse ||
          xdNode instanceof xd.BooleanGroup || xdNode instanceof xd.Line) {
            return  Text.parseTextToJson(xdNode);
      }
      if (xdNode instanceof xd.SymbolInstance) {
        return "none"
        }
      if (xdNode instanceof xd.Artboard) {
        return "artboard"; 
        }
      return "none";
  }

}

exports.Utils = Utils;