

class ScrollableGroup {

	static parseScrollableGroupToJson(ScrollableGroup){
		const { Utils } = require("../utils/Utils");

		let jsonObj={};
        let jsonChildren = [];


		jsonObj["scrollingType"]=ScrollableGroup.scrollingType;
		jsonObj["viewport"]=ScrollableGroup.viewport ;
	
        ScrollableGroup.children.forEach(element => {

			let res= Utils.parseElement(element);

			if(!(res instanceof Array)){
				jsonChildren.push(res);

			}else{
			
				res.forEach(resElem=>{
					jsonChildren.push(resElem);
	
				})

			}

		
			
	  });

	  jsonObj["children"]= jsonChildren;
    
		return jsonObj;

	}


}

exports.ScrollableGroup = ScrollableGroup;