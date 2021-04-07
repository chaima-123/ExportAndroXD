const { Utils } = require("../utils/Utils");
const { Group } = require("../nodes/Group");
const { Rectangle } = require("../nodes/Rectangle");
const { Image } = require("../nodes/Image");
const export_image  = require("../utils/image_export");
const xd = require("scenegraph"); 

class ImageView {

    static parseImageViewToJson(imageView,folder){

        export_image.exportImage(imageView,folder);
        var jsonEditText = {};
        var jsonGroup= {};
        var jsonRectangle= {};
        jsonEditText[".class"]="ImageView";
        jsonEditText[".adobeClass"]=imageView.constructor.name;
        jsonEditText[".id"]=imageView.name.substring( imageView.name.lastIndexOf("_") + 1,  );
           
        jsonRectangle=Image.parseImageViewToJson(imageView);
   
        jsonEditText = {...jsonEditText,...jsonRectangle};
      
           return jsonEditText;
        




    }

}

exports.ImageView = ImageView;