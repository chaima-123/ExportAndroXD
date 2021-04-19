const { Rectangle } = require("../nodes/Rectangle");
const { Utils } = require("../utils/Utils");
const { Group } = require("../nodes/Group");

const xd = require("scenegraph"); 

class CheckBox {
    static parseCheckBoxToJson(checkBox){
            var jsonCheckBox = {};
            var jsonGroup= {};
            var jsonRectangle= {};
            jsonCheckBox[".class"]="CheckBox";
            jsonCheckBox[".adobeClass"]=checkBox.constructor.name;
            jsonCheckBox[".id"]=checkBox.name.substring( checkBox.name.lastIndexOf("_") + 1,  );
               
            if(checkBox instanceof xd.Group)
            {  
            jsonGroup=  Group.parseGroupFromButtonToJson(checkBox);
            jsonGroup["text"]= jsonGroup["text"];
            jsonCheckBox = {...jsonCheckBox,...jsonGroup};
       
            }else if(checkBox instanceof xd.Rectangle){
       
            jsonRectangle=Rectangle.parseRectangleToJson(checkBox);
       
            jsonCheckBox = {...jsonCheckBox,...jsonRectangle};
       
            }
               return jsonCheckBox;
    
    
    
    
        }
}

exports.CheckBox = CheckBox;