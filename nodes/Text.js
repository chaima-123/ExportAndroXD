class Text {

	static parseTextToJson(text){
		let jsonObj={};

		jsonObj["text"]=text.text;
		jsonObj["fontFamily "]=text.fontFamily ;


		return jsonObj;


	}


}

exports.Text = Text;