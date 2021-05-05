

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

		jsonObj["marginRight"]=widthArt-RepeatGrid.boundsInParent.width-RepeatGrid.boundsInParent.x;

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

	  jsonObj["children"]= jsonChildren;
    
		return jsonObj;

	}


}

exports.RepeatGrid = RepeatGrid;