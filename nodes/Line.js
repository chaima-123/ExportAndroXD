const { Color } = require("../utils/Color");

class Line {

	
	static parseLineToJson(Line) {
		let jsonObj={};

        jsonObj[".class"]="RelativeLayout";
        jsonObj[".adobeClass"]=Line.constructor.name;
		jsonObj["height"]=Line.strokeWidth;
        jsonObj["width"]=Line.boundsInParent.width;
        jsonObj["x"]=Line.translation.x;
		jsonObj["y"]=Line.translation.y;
        
		return jsonObj;
	   
   }


}

exports.Line = Line;