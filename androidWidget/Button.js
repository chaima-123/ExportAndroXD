const { Utils } = require("../utils/Utils");
const { Group } = require("../nodes/Group");
const { Rectangle } = require("../nodes/Rectangle");
const { Text } = require("../nodes/Text");
const xd = require("scenegraph"); 
class Button {

 static parseButtonToJson(button){
     var jsonButton = {};
     var jsonGroup= {};
     var jsonRectangle= {};
     var jsonText= {};
     jsonButton[".class"]="Button";
     jsonButton[".adobeClass"]=button.constructor.name;
    //  console.log(Utils.getype(button.name));
     jsonButton[".id"]=button.name.substring(
        button.name.lastIndexOf("_") + 1, 
    );
     if(button instanceof xd.Group)
     {  
     jsonGroup=  Group.parseGroupFromButtonToJson(button);
        
     jsonButton = {...jsonButton,...jsonGroup};

     }else if(button instanceof xd.Rectangle){

     jsonRectangle=Rectangle.parseRectangleToJson(button);

      jsonButton = {...jsonButton,...jsonRectangle};

     }else if(button instanceof xd.Text){

        jsonText= Text.parseTextToJson(button);
        jsonButton = {...jsonButton,...jsonText};
     }
      button.triggeredInteractions.forEach(interaction => {
      jsonButton["destination"]= interaction.action.destination.name;
   });
  
        return jsonButton;
 }



}

exports.Button = Button;