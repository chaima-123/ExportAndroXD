
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
    var res =JSON.stringify(rootNode);
    console.log(res);
    console.log("--------");


   

//     var all = JSON.parse(res);
//         all.ArtBoard.forEach(artboard=>{
//          artboard.children.forEach(element=>{
//         console.log("helo0",element[".class"]);
        
//     })


// })
    //     all.ArtBoard.children.forEach(element=>{
    //         console.log("helo0",element);
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