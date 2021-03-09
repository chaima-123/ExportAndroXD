class Rectangle {

	
	static parseRectangleToJson(rectangle) {
		let jsonObj={};

		jsonObj["width"]=rectangle.width;
		jsonObj["height"]=rectangle.height;





		return jsonObj;
	   
   }

	//  parseNodeToJson(node) {
	// 	 let data= {
	// 		"width":"match_parent",
	// 		"height":"wrap_content"

		

	// 	 }
		
	// }



}

exports.Rectangle = Rectangle;