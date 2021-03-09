const { Utils } = require("../utils/Utils");
class Button {

 static parseButtonToJson(button){
     let jsonButton = {};
     jsonButton[".class"]="Button";
     jsonButton[".adobeClass"]=button.constructor.name;
        return jsonButton;
 }



}

exports.Button = Button;