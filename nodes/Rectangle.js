const { Color } = require("../utils/Color");

class Rectangle {

	
	static parseRectangleToJson(rectangle) {
		let jsonObj={};

		jsonObj["width"]=rectangle.width;
		jsonObj["height"]=rectangle.height;
		jsonObj["background"]=rectangle.fill.value ;
		jsonObj["x"]=rectangle.translation.x;
		jsonObj["y"]=rectangle.translation.y;
		jsonObj["cornerRadius"]=rectangle.cornerRadii;


		return jsonObj;
	   
   }


}

exports.Rectangle = Rectangle;