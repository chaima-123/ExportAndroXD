
class Image {

	static parseImageViewToJson(Image){

    
		let jsonObj={};

        jsonObj["width"]=Image.width;
		jsonObj["height"]=Image.height;

		return jsonObj;


	}


}

exports.Image = Image;