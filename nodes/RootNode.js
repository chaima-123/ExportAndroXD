
const { Utils } = require("../utils/Utils");
const { ArtBoard } = require("./ArtBoard");

class RootNode {

static ExportAll(root){
    var rootNode = {};
    var JsonArtBoards=[];
   
    root.children.forEach(element=>{
        var item = {};
        item = ArtBoard.parseArtBoardToJson(element);

           // item={"test":"test"};
        // item ["title"] = id;
        // item ["email"] = email;
        JsonArtBoards.push(item)
       
    });
    rootNode["ArtBoard"]=JsonArtBoards;


    //console.log(rootNode);
console.log(JSON.stringify(rootNode));
       

}

}

exports.RootNode = RootNode;