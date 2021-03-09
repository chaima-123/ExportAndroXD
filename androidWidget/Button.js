const { Utils } = require("../utils/Utils");
const { Group } = require("../nodes/Group");
const { Rectangle } = require("../nodes/Rectangle");
const xd = require("scenegraph"); 
class Button {

 static parseButtonToJson(button){
     var jsonButton = {};
     var jsonGroup= {};
     var jsonRectangle= {};
     jsonButton[".class"]="Button";
     jsonButton[".adobeClass"]=button.constructor.name;
     jsonButton[".id"]=button.name;
     if(button instanceof xd.Group)
     {  
     jsonGroup=  Group.parseGroupFromButtonToJson(button);
        
     jsonButton = {...jsonButton,...jsonGroup};

     }else if(button instanceof xd.Rectangle){

     jsonRectangle=Rectangle.parseRectangleToJson(button);

      jsonButton = {...jsonButton,...jsonRectangle};

     }

  
        return jsonButton;
 }



}

exports.Button = Button;