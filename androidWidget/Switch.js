const { Utils } = require("../utils/Utils");
const { Text } = require("../nodes/Text");

const { Group } = require("../nodes/Group");
const xd = require("scenegraph"); 


class Switch {

    static parseSwitchToJson(Switch){

        var jsonSwitchView = {};
        var jsonGroup= {};

        jsonSwitchView[".class"]="Switch";
        jsonSwitchView[".adobeClass"]=Switch.constructor.name;
        jsonSwitchView[".id"]=Switch.name.substring( Switch.name.lastIndexOf("_") + 1, );

        if(Switch instanceof xd.Group)
        {  
        jsonGroup=  Group.parseGroupFromButtonToJson(Switch);
        jsonGroup["width"]= Switch.globalBounds.width;
        jsonGroup["height"]= Switch.globalBounds.height;
        jsonGroup["x"]= Switch.boundsInParent.x;
        jsonGroup["y"]= Switch.boundsInParent.y;
        jsonSwitchView = {...jsonSwitchView,...jsonGroup };
    }
    return jsonSwitchView ; 

    }



}

exports.Switch = Switch;   