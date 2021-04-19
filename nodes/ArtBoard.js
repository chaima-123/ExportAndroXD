
const { Utils } = require("../utils/Utils");
const { Button } = require("../androidWidget/Button");
const xd = require("scenegraph");
class ArtBoard {


static parseArtBoardToJson (artboard,folder){
	
	
	let Jsonitem = {}
	let jsonChildren = [];
	Jsonitem["name"]= artboard.name;
	if(artboard.fill instanceof xd.Color){
		console.log(artboard.fill.value);
		Jsonitem["background"]= artboard.fill.value
	
	}else{
		Jsonitem["background"]=4294967295;
	}
		artboard.children.forEach(element => {
			let res= Utils.parseElement(element,folder);
			if(!(res instanceof Array)){
				jsonChildren.push(res);

			}else{
			
				res.forEach(resElem=>{
					jsonChildren.push(resElem);
	
				})



			}
	
		
			
	  });

	  Jsonitem["children"]= jsonChildren;
	  
	  return Jsonitem;

}

static parseSelectedItems(selection){
	let res = "";
	selection.forEach(element=>{
	  res+=parseSingleNode(element,"");
  
	})
	return res;
  
  }

  static parseAllNodesToJson(selection){
	let res = "";
	selection.forEach(element=>{
	  res+=parseSingleNode(element,"");
  
	})
	return res;
  
  }
  
static parseSingleNode(xNode,level){
	let typeNode = xNode.constructor.name;
	let res = "";
	if(!xNode || (xNode instanceof xd.Group)){
	  
	  res+=typeNode+"<br>"+parseGroup(xNode,level+"--");
	 // res+=typeNode+getDimension(xNode)+"<br>"+parseGroup(xNode,level+"--");
  
	 return res;
	 
	}else {
	  return typeNode+"<br>";
	//return typeNode+"<br>"+xNode.name+"<br>";
   // return typeNode+getDimension(xNode)+"<br>";
	}
  
  }
  
static  parseGroup (group,level){
	let res = "";
	group.children.forEach(element => {
	  res+=level+ parseSingleNode(element,level);
  
	});
   
	return res;
  
  }

  

}

exports.ArtBoard = ArtBoard;