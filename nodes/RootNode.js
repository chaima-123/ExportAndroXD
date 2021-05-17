
const { Utils } = require("../utils/Utils");
const { ArtBoard } = require("./ArtBoard");

class RootNode {

static ExportAll(root){
    var rootNode = {};
    var JsonArtBoards=[];
   
    root.children.forEach(element=>{
        var item = {};
        item = ArtBoard.parseArtBoardToJson(element);

        JsonArtBoards.push(item)
       
    });
    rootNode["ArtBoard"]=JsonArtBoards;


    //console.log(rootNode);
    var res =JSON.stringify(rootNode);
    console.log(res);
    console.log("--------");


    // });
   

return res;
}

 static sendRequest(res)
  {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "https://d0f8a1c9b087.ngrok.io/ExportToXml";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(res);
  }

}

exports.RootNode = RootNode;