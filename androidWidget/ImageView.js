const { Utils } = require("../utils/Utils");
const { Group } = require("../nodes/Group");
const { Rectangle } = require("../nodes/Rectangle");
const { Image } = require("../nodes/Image");
const export_image = require("../utils/image_export");
const xd = require("scenegraph");

class ImageView {

    static parseImageViewToJson(imageView) {
        var jsonImageView = {};
        var jsonObj = {};
        var jsonRectangle = {};
        jsonImageView[".class"] = "ImageView";
        jsonImageView[".adobeClass"] = imageView.constructor.name;
        jsonImageView[".id"] = imageView.name.substring(imageView.name.lastIndexOf("_") + 1,);

         console.log(imageView);
 
         let test = false ;
        if (imageView instanceof xd.Group) {

            imageView.children.forEach(element => {

                if (element instanceof xd.Path) {
                    test =true ;}
                });

                if(test == true){
                    jsonImageView[".adobeClass"] = "Rectangle";
                    jsonObj["width"] =imageView.boundsInParent.width ;
                    jsonObj["height"] = imageView.boundsInParent.height;
                    jsonObj["background"]=null ;

                    jsonObj["x"] = imageView.boundsInParent.x;
                    jsonObj["y"] = imageView.boundsInParent.y;
                    jsonObj["cornerRadius"] = null;
                    jsonObj["marginRight"] = null;

                    jsonImageView = { ...jsonImageView, ...jsonObj };
                }
                
          

        }


        else {
            // we expect that all images are rectangles here 

            jsonRectangle = Rectangle.parseRectangleToJson(imageView);

            jsonImageView = { ...jsonImageView, ...jsonRectangle };
        }

        return jsonImageView;




    }

}

exports.ImageView = ImageView;