 #  Adobe XD to Android Studio Code Generator – Plugin

 ## READ THIS FIRST

Thank you for helping to test this plugin! Our goal is to release the best plugin we possibly can, and your feedback is a huge part of that.

Before you get started, please read through the rest of this document, especially "Using This Plugin".


 ## INSTALLATION  & SETUP

- In the Adobe XD menubar, go to Plugins > Discover Plugins, then search for and install the "Android" plugin. It will now show up in your plugins sidebar in the bottom left of XD. If you don't see the plugin listed, make sure you have the most recent version of Adobe XD installed, and try again.

- You can also get the .zip of the plugin from our website, then go to Adobe XD > Plugins > development > Show Develop Folder and put the plugin project there. After that you just need to reload the by plugin Adobe XD > Plugins > development > Reload plugins.
By these simple clicks Androx will be ready to use on your computer!
 


## ABOUT THIS PLUGIN

This plugin will help you to simplify the workflow of the design-to-development by allowing developers to design android application in XD and converting them to XML code of Android Studio with a simple click of a button.


# **USING THIS PLUGIN**

To make this plugin works correctly, there are primary ways that you need to follow: 


## **Artboard**

You need to select the whole artboard and then you click on the button “export all artboard” to get the XML files or you can also export only the selected artboards and click on button “export selected artboards” .

## **NAMES OF ARTBOARD**

Every artboard will be converted to an xml file in android studio, for that you must attach the extension .xml to name of the artboard.

## **ID**

In android Studio, every component should have an id, for that we provided for you a simple panel where you will indicate for every component its id.
Remember to not provide the same id for different component, other ways the xml file will contain errors.

## **TYPES**

It is required to select the type of the element you are creating whether it is a button or edit text or text field...
Other ways the plugin will not work correctly.

## **BUTTONS**

A button can be with text or without, so when you create a rectangle with a text it is necessary to group them.

## **EDIT TEXT**

An edit text can be also with hint or without, so when you create a rectangle with a text it is necessary to group them and select the EditText type from the panel

## **RECYCLER VIEWER**

In this version, the recycler contents can be only an image view and a text view ,to get a correct list you just need to group these two components and define them as a repeat Grid. 
Our plugin will automatically generate the recycler viewer in Android Studio with the necessary java classes (adapters, activity..) while you can test directly in your simulator.


## **EXPORT IMAGES**

In order to optimize export,     images are not exported with widgets. Only images with a name assigned in the plugin panel can be exported. Select an image and click "Export Image", or use the "Export All Images" button to export all images with a name to the Image Path.


#  NOTES

-	Only solid color backgrounds are supported for artboard.

-	Only horizontal or Vertical Scroll View is accepted because the Horizontal/Vertical widget is not supported in android studio.

-	Opacity is always considered as 100.

-	Gradient backgrounds on artboards.






