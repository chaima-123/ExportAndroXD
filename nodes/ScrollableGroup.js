

class ScrollableGroup {

	static parseScrollableGroupToJson(ScrollableGroup){
		const { Utils } = require("../utils/Utils");

		let jsonObj={};
        let jsonChildren = [];
		jsonObj[".class"]="ScrollView";
		jsonObj[".adobeClass"]="ScrollableGroup";
		jsonObj["x"]=ScrollableGroup.boundsInParent.x ;
		jsonObj["y"]=ScrollableGroup.globalBounds.y ;
		jsonObj["width"]=ScrollableGroup.boundsInParent.width ;
		jsonObj["height"]=ScrollableGroup.boundsInParent.height ;
		jsonObj["scrollingType"]=ScrollableGroup.scrollingType;
		jsonObj["viewport"]=ScrollableGroup.viewport ;
		jsonObj["marginRight"]=widthArt-ScrollableGroup.boundsInParent.width-ScrollableGroup.boundsInParent.x;
	
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
	 if(ScrollableGroup.scrollingType=="vertical"){
		jsonChildren.forEach((newElement)=>{
			//newElement["y"]=newElement["y"]-ScrollableGroup.globalBounds.y;
			if(newElement[".adobeClass"]!="ScrollableGroup"){
			newElement["marginRight"]=undefined
		}
		});

	 }else{
		jsonChildren.forEach((newElement)=>{
			//newElement["y"]=newElement["y"]-ScrollableGroup.globalBounds.y;
			newElement["x"]=newElement["x"]-12;
			newElement["marginRight"]=undefined
			newElement["marginBottom"]=0

		});



	 }


	  jsonObj["children"]= jsonChildren;
    
		return jsonObj;

	}


}

exports.ScrollableGroup = ScrollableGroup;