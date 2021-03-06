const { Color } = require("../utils/Color");

class Line {

	
	static parseLineToJson(Line) {
		let jsonObj={};
        const widthArt = global.widthArt;

        jsonObj[".class"]="RelativeLayout";
        jsonObj[".adobeClass"]=Line.constructor.name;
		jsonObj["height"]=Line.strokeWidth;
        jsonObj["width"]=Line.boundsInParent.width;
        jsonObj["color"]= Line.stroke.value ;
        jsonObj["x"]=Line.boundsInParent.x;
		jsonObj["y"]=Line.boundsInParent.y;
        jsonObj["marginRight"]= widthArt-Line.boundsInParent.width-Line.boundsInParent.x;



		return jsonObj;
	   
   }


}

exports.Line = Line;