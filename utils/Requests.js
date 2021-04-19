

const ngroxBase="https://52374a2f7855.ngrok.io/";

async function sendRequest(root) {
    //   const folder = await fs.getFolder();
    //   console.log(folder);
    // global.folder=folder;
    var res = RootNode.ExportAll(root);
  
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = ngroxBase+"ExportToXml";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("X-API-KEY", "12345"); 
    xmlhttp.send(res);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 8000);
  });
  }
  

  exports.sendRequest =sendRequest ;


  async function sendRequestAll(url,methode,withAction) {

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var fileUrl;
    
  
    if(withAction){
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        fileUrl = this.responseText;
        export_project.downloadZip(fileUrl);
  
      }
    };
  
  }
    xmlhttp.open(methode, url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("X-API-KEY", "12345");
    xmlhttp.send();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
  });
  
  }


  exports.sendRequestAll =sendRequestAll ;