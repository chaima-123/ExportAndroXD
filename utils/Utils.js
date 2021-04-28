
const { Button } = require("../androidWidget/Button");
const { EditText } = require("../androidWidget/EditText");
const { TextView } = require("../androidWidget/TextView");
const { ImageView } = require("../androidWidget/ImageView");
const xd = require("scenegraph");
const export_image = require("./image_export");
const { CheckBox } = require("../androidWidget/CheckBox");

const { Switch } = require("../androidWidget/Switch");

const { ScrollableGroup } = require("../nodes/ScrollableGroup");
const { Line } = require("../nodes/Line");

const { Text } = require("../nodes/Text");
const { Group } = require("../nodes/Group");
const { Rectangle } = require("../nodes/Rectangle");


const AndroidTypes = {
  Button: "Button",
  Textview: "Textview",
  EditText: "EditText",

};

class Utils {

  static getype(fullNameNode) {

    var myType = fullNameNode.substring(
      fullNameNode.indexOf("_") + 1,
      fullNameNode.lastIndexOf("_")
    );

    return myType;

  }

  static getId(fullNameNode) {

    var myId = fullNameNode.substring(
      fullNameNode.lastIndexOf("_") + 1,

    );

    return myId;

  }

  static ParseByAndroidClass(xdNode, typeWidget) {
    if (typeWidget == "Button") {
      return Button.parseButtonToJson(xdNode);
    } else if (typeWidget == "EditText") {
      return EditText.parseEditTextToJson(xdNode);
    } else if (typeWidget == "TextView") {
      return TextView.parseTextViewToJson(xdNode);
    } else if (typeWidget == "ImageView") {
      return ImageView.parseImageViewToJson(xdNode);

    } else if (xdNode.fill instanceof xd.ImageFill) {
      return ImageView.parseImageViewToJson(xdNode);

    }
   
    else if (typeWidget == "CheckBox") {
      return CheckBox.parseCheckBoxToJson(xdNode);

    }

    else if (typeWidget == "Switch") {
      return Switch.parseSwitchToJson(xdNode);

    }
    else {

      return { "res": "Types widget invalide" };
      // let data={};
      //     data["NOTYPE"]="NOTYPE";
      // return data;
    }
  }


  static parseElement(xdNode) {
    let res = Array();
    let typeWidget = this.getype(xdNode.name);
    console.log(xdNode.name + "  " + typeWidget);
    if (typeWidget != "") {
      console.log("hahahah android");

      this.parseIfArray(this.ParseByAndroidClass(xdNode, typeWidget), res);

    } else {

      console.log("hahahah adobe classe");
      this.parseIfArray(this.ParseByAdobeClass(xdNode), res);

    }
    return res;



  }

  static parseIfArray(xdNode, result) {
    if (xdNode instanceof Array) {
      xdNode.forEach(element => {
        this.parseIfArray(element, result);

      })

    } else {
      result.push(xdNode);
    }

  }


  static ParseByAdobeClass(xdNode) {
    if (xdNode instanceof xd.Group) {
      let arr = []

      xdNode.children.forEach(element => {
        arr.push(this.parseElement(element));

        // arr.push( this.parseElement(element))
      });
      return arr;
    }


    if (xdNode instanceof xd.ScrollableGroup) {

      return ScrollableGroup.parseScrollableGroupToJson(xdNode);
    }

    if (xdNode instanceof xd.Text) {
      //  return  Text.parseTextToJson(xdNode);
      return { "result": "this is a Text From Adobe Class without Annot" };
    }
    if (xdNode instanceof xd.Rectangle) {
      return { "result": "this is a Rectangle From Adobe Class without Annot" };
      //  return  Rectangle.parseRectangleToJson(xdNode);

    }

    if (xdNode instanceof xd.Line) {
       return  Line.parseLineToJson(xdNode);

    }



    if (xdNode instanceof xd.Path || xdNode instanceof xd.Polygon ||
      xdNode instanceof xd.Ellipse ||
      xdNode instanceof xd.BooleanGroup ) {
      return { "res": "not yet" };
    }
    if (xdNode instanceof xd.SymbolInstance) {
      return { "res": "not yet" };
    }
    if (xdNode instanceof xd.Artboard) {
      return { "res": "not yet" };
    }
    return { "res": "not yet" };


  }



  static async exportAllImages(root, folder) {
    setTimeout(() => { console.log("im waiting here") }, 5000)
    let allImages = Array();
    root.children.forEach((artboard) => {

      artboard.children.forEach((element) => {

        if (Utils.getype(element.name) == "ImageView") {
          allImages.push(element);
        }

      })


    });
    if (allImages.length > 0) {
      export_image.exportRendition(allImages, folder);
    }


  }



}

exports.Utils = Utils;