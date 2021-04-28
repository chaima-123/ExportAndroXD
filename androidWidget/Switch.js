const { Utils } = require("../utils/Utils");
const { Text } = require("../nodes/Text");
class Switch {

    static parseSwitchToJson(Switch){

        var jsonSwitchView = {};
        var jsonText= {};
        
        jsonSwitchView[".class"]="Switch";
        jsonSwitchView[".adobeClass"]=Switch.constructor.name;
        jsonSwitchView[".id"]=Switch.name.substring( Switch.name.lastIndexOf("_") + 1, );
       jsonSwitchView[".width"]="wrap_content";
       jsonSwitchView[".height"]="wrap_content";
      
        
        return jsonSwitchView ; 

    }

}

exports.Switch = Switch;   