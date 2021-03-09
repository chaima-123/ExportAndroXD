
const { Button } = require("../androidWidget/Button");
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
    if(typeWidget="Button"){
        return Button.parseButtonToJson(xdNode);
    }else {
            let data={};
                data["test"]="test";
            return data;

    }
  }

}

exports.Utils = Utils;