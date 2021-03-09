const xd = require("scenegraph"); 
class Group {
  
  static parseGroupToJson(xdNode){

    let text= "";
    node.children.forEach(element => {
       
    
      });

    let data= {
       "type":this.getype(node.name),
       "id": this.getId(node.name),
       "width":"match_parent",
       "height":"wrap_content",
       "text":text,


    }

    return data;
    
  }






    getype( fullNameNode){

		var myType = fullNameNode.substring(
			fullNameNode.indexOf("*") + 1, 
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
    
        let text= "";
        node.children.forEach(element => {
           if((element instanceof xd.Text)){
            
            text= element.text 
           }
        
          });

        let data= {
           "type":this.getype(node.name),
           "id": this.getId(node.name),
           "width":"match_parent",
           "height":"wrap_content",
           "text":text,


        }

        return data;
       
   }
  

}


exports.Group = Group;