class Rectangle {


	constructor(xdNode) {
		this.data= null;
	}
	getype(fullNameNode){

		var myType = fullNameNode.substring(
			fullNameNode.firstIndexOf("*") + 1, 
			fullNameNode.lastIndexOf("*")
		);

		return myType;

	}

	getId(fullNameNode){

		var myId = fullNameNode.substring(
			fullNameNode.lastIndexOf("*") + 1, 
			
		);

		return myId;

	}

	 parseNodeToJson(node) {
		 let data= {
			"type":this.getype(node),
			"id": this.getId(node),
			"width":"match_parent",
			"height":"wrap_content"

		

		 }
		
	}



}

exports.Rectangle = Rectangle;