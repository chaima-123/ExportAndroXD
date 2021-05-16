const xd = require("scenegraph"); 
const { Rectangle } = require("./Rectangle");
const { Text } = require("./Text");
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

  static parseGroupFromButtonToJson(button){

    var  jsonText={};
    var  jsonRectangle={};
    let Texts = button.children.filter(groupChild => {
      return groupChild instanceof xd.Text;
  });
  let Rectangles = button.children.filter(groupChild => {
      return groupChild instanceof xd.Rectangle;
  });

  if(Texts.length>0){

    jsonText= Text.parseTextToJson(Texts[0]);

  }

  if(Rectangles.length>0){

    jsonRectangle= Rectangle.parseRectangleToJson(Rectangles[0]);
    jsonRectangle["x"]=button.boundsInParent.x;
    jsonRectangle["y"]=button.boundsInParent.y;

  }



  return {...jsonText,...jsonRectangle}


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