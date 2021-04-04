
const { Utils } = require("../utils/Utils");
const { Button } = require("../androidWidget/Button");
class ArtBoard {


static parseArtBoardToJson (artboard){
	
	
	let Jsonitem = {}
	let jsonChildren = [];
	Jsonitem["name"]= artboard.name;
		artboard.children.forEach(element => {
			jsonChildren.push(Utils.ParseByAndroidClass(element,Utils.getype(element.name)));
			
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