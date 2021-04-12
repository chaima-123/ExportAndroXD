class Text {

	static parseTextToJson(text){
		let jsonObj={};

		jsonObj["text"]=text.text;
		jsonObj["fontFamily"]=text.fontFamily ;
		jsonObj["fontStyle"]=text.fontStyle ;
		jsonObj["fontSize"]=text.fontSize ;
		jsonObj["textColor"]=text.fill.value ;
		jsonObj["charSpacing"]=text.charSpacing ;
		jsonObj["textAlign"]=text.textAlign ;
		jsonObj["lineSpacing"]=text.fontFlineSpacingamily ;
		// jsonObj["text-x"]=text.translation.x;
		// jsonObj["text-y"]=text.translation.y;
		jsonObj["x"]=text.globalBounds.x ;
		jsonObj["y"]=text.globalBounds.y ;
		

		// console.log("globalBounds",text.globalBounds);
		// console.log("localBounds",text.localBounds );
		// console.log("boundsInParent",text.boundsInParent);
		// console.log("topLeftInParent",text.topLeftInParent);

		// console.log("localCenterPoint",text.localCenterPoint);

		// console.log("globalDrawBounds",text.globalDrawBounds);
		return jsonObj;


	}


}

exports.Text = Text;