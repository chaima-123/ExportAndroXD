const { Utils } = require("../utils/Utils");
const { Group } = require("../nodes/Group");
const { Rectangle } = require("../nodes/Rectangle");
const xd = require("scenegraph"); 
class EditText {


    static parseEditTextToJson(editText){
        var jsonEditText = {};
        var jsonGroup= {};
        var jsonRectangle= {};
        jsonEditText[".class"]="EditText";
        jsonEditText[".adobeClass"]=editText.constructor.name;
        jsonEditText[".id"]=editText.name.substring( editText.name.lastIndexOf("_") + 1,  );
           
        if(editText instanceof xd.Group)
        {  
        // @ts-ignore
        jsonGroup=  Group.parseGroupFromButtonToJson(editText);
        jsonGroup["hint"]= jsonGroup["text"];
        jsonGroup["text"]= undefined;
        jsonEditText = {...jsonEditText,...jsonGroup};
   
        }else if(editText instanceof xd.Rectangle){
   
        jsonRectangle=Rectangle.parseRectangleToJson(editText);
   
        jsonEditText = {...jsonEditText,...jsonRectangle};
   
        }
           return jsonEditText;




    }

}

exports.EditText = EditText;