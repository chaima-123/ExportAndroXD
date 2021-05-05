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

             jsonGroup["width"]= checkBox.globalBounds.width;
             jsonGroup["height"]= checkBox.globalBounds.height;
            jsonGroup["x"]= checkBox.boundsInParent.x;
            jsonGroup["y"]= checkBox.boundsInParent.y;

            console.log("coucoucoucou");

    

            console.log("globalBounds",checkBox.globalBounds);
		console.log("localBounds",checkBox.localBounds );
		console.log("boundsInParent",checkBox.boundsInParent);
		console.log("topLeftInParent",checkBox.topLeftInParent);
		console.log("localCenterPoint",checkBox.localCenterPoint);
		console.log("globalDrawBounds",checkBox.globalDrawBounds);
            jsonCheckBox = {...jsonCheckBox,...jsonGroup};
            }
              
            return jsonCheckBox;
    
    
        }
}

exports.CheckBox = CheckBox;