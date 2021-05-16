const { Color } = require("../utils/Color");

class Rectangle {

	
	static parseRectangleToJson(rectangle) {
		let jsonObj={};

		const widthArt = global.widthArt;

		jsonObj["width"]=rectangle.width;
		jsonObj["height"]=rectangle.height;
		jsonObj["background"]=rectangle.fill.value ;
		jsonObj["x"]=rectangle.boundsInParent.x;
		jsonObj["y"]=rectangle.boundsInParent.y;
		
		jsonObj["cornerRadius"]=rectangle.cornerRadii;
		jsonObj["marginRight"]= widthArt-rectangle.width-rectangle.translation.x;


	

		return jsonObj;
	   
   }


}

exports.Rectangle = Rectangle;