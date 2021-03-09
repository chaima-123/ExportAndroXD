class Text {

	static parseTextToJson(text){
		let jsonObj={};

		jsonObj["text"]=text.text;
		jsonObj["fontFamily"]=text.fontFamily ;
		jsonObj["fontStyle"]=text.fontStyle ;
		jsonObj["fontSize"]=text.fontSize ;
		jsonObj["fill"]=text.fill ;
		jsonObj["charSpacing"]=text.charSpacing ;
		jsonObj["textAlign"]=text.textAlign ;
		jsonObj["lineSpacing"]=text.fontFlineSpacingamily ;
		
		return jsonObj;


	}


}

exports.Text = Text;