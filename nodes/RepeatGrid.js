

class RepeatGrid {

	static parseRepeatGridToJson(RepeatGrid){
		const { Utils } = require("../utils/Utils");
        let test =true;

		let jsonObj={};
        let jsonChildren = [];
		jsonObj[".class"]="RecyclerViewer";
		jsonObj[".adobeClass"]="RepeatGrid";
		jsonObj["x"]=RepeatGrid.boundsInParent.x ;
		jsonObj["y"]=RepeatGrid.boundsInParent.y ;
		jsonObj["width"]=RepeatGrid.boundsInParent.width ;
		jsonObj["height"]=RepeatGrid.boundsInParent.height ;
		jsonObj["paddingX"]=RepeatGrid.paddingX  ;
        jsonObj["paddingY"]=RepeatGrid.paddingY  ;
        jsonObj["cellSize"]=RepeatGrid.cellSize  ;
		jsonObj["numRows"]=RepeatGrid.numRows  ;

		jsonObj["marginRight"]=widthArt-RepeatGrid.boundsInParent.width-RepeatGrid.boundsInParent.x;
		jsonObj["marginBottom"]=widthArt-RepeatGrid.boundsInParent.height-RepeatGrid.boundsInParent.y;


        console.log(RepeatGrid.numRows);
        
        RepeatGrid.children.forEach((element,index) => {
            if(test &&  index==0)
            {
			let res= Utils.parseElement(element);

			if(!(res instanceof Array)){
				jsonChildren.push(res);
			}else{
			
				res.forEach(resElem=>{
					jsonChildren.push(resElem);	
				})
			}      
        }
        else test=false;
		
        
	  });

	  jsonChildren.forEach((newElement)=>{
		newElement["x"]=newElement["x"]-RepeatGrid.boundsInParent.x;
		newElement["y"]=newElement["y"]-RepeatGrid.globalBounds.y;
		newElement["marginRight"]=newElement["marginRight"]-jsonObj["marginRight"]

	});



	  jsonObj["children"]= jsonChildren;
    
		return jsonObj;

	}


}

exports.RepeatGrid = RepeatGrid;