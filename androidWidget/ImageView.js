const { Utils } = require("../utils/Utils");
const { Group } = require("../nodes/Group");
const { Rectangle } = require("../nodes/Rectangle");
const { Image } = require("../nodes/Image");
const export_image  = require("../utils/image_export");
const xd = require("scenegraph"); 

class ImageView {

    static parseImageViewToJson(imageView){

    
        var jsonImageView = {};
        var jsonGroup= {};
        var jsonRectangle= {};
        jsonImageView[".class"]="ImageView";
        jsonImageView[".adobeClass"]=imageView.constructor.name;
        jsonImageView[".id"]=imageView.name.substring( imageView.name.lastIndexOf("_") + 1,);
         // we expect that all images are rectangles here 
           
        jsonRectangle=Rectangle.parseRectangleToJson(imageView);
   
        jsonImageView = {...jsonImageView,...jsonRectangle};
      
           return jsonImageView;
        




    }

}

exports.ImageView = ImageView;