const { Utils } = require("../utils/Utils");
const { Text } = require("../nodes/Text");
class TextView {

    static parseTextViewToJson(TextView){

        var jsonTextView = {};
        var jsonText= {};
        
        jsonTextView[".class"]="TextView";
        jsonTextView[".adobeClass"]=TextView.constructor.name;
       //  console.log(Utils.getype(button.name));
       jsonTextView[".id"]=TextView.name.substring(
        TextView.name.lastIndexOf("*") + 1, 
       );

        jsonText = Text.parseTextToJson(TextView);
        jsonTextView ={...jsonTextView,...jsonText};
        return jsonTextView ; 

    }

}

exports.TextView = TextView;