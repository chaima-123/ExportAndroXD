const { Color } = require("../utils/Color");

class Line {

	
	static parseLineToJson(Line) {
		let jsonObj={};
        const widthArt = global.widthArt;

        jsonObj[".class"]="RelativeLayout";
        jsonObj[".adobeClass"]=Line.constructor.name;
		jsonObj["height"]=Line.strokeWidth;
        jsonObj["width"]=Line.boundsInParent.width;
        jsonObj["x"]=Line.boundsInParent.x;
		jsonObj["y"]=Line.boundsInParent.y;
        jsonObj["marginRight"]= widthArt-Line.boundsInParent.width-Line.boundsInParent.x;


        console.log("globalBounds",Line.globalBounds);
		console.log("localBounds",Line.localBounds );
		console.log("boundsInParent",Line.boundsInParent);
		console.log("topLeftInParent",Line.topLeftInParent);
		console.log("localCenterPoint",Line.localCenterPoint);
		console.log("globalDrawBounds",Line.globalDrawBounds);
        
		return jsonObj;
	   
   }


}

exports.Line = Line;