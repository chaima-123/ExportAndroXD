class ScrollableGroup {

	static parseScrollableGroupToJson(ScrollableGroup){
		let jsonObj={};

		jsonObj["scrollingType"]=ScrollableGroup.scrollingType;
		jsonObj["viewport"]=ScrollableGroup.viewport ;
	
		return jsonObj;

	}


}

exports.ScrollableGroup = ScrollableGroup;