**Adobe XD to Android Studio Code Generator – Plugin**
READ THIS FIRST
Thank you for helping to test this plugin! Our goal is to release the best plugin we possibly can, and your feedback is a huge part of that.
Before you get started, please read through the rest of this document, especially "Using This Plugin".

INSTALLATION  & SETUP
In the Adobe XD menubar, go to Plugins > Discover Plugins, then search for and install the "Android" plugin. It will now show up in your plugins sidebar in the bottom left of XD. If you don't see the plugin listed, make sure you have the most recent version of Adobe XD installed, and try again.

ABOUT THIS PLUGIN
This plugin will help you to simplify the workflow of the design-to-development by allowing developers to design android application in XD and converting them to XML code of Android Studio with a simple click of a button.
ABOUT USING THIS PLUGIN
To make this plugin works correctly, there are primary ways that you need to follow: 


Select the whole artboard
You need to select the whole artboard and then you click on the button “export artboard” to export the XML file.

ID
In android Studio, every component should have an id, for that we provided for you a simple panel where you will indicate for every component its id.

Remember to not provide the same id for different component, other ways the xml file will contain errors.

TYPES
It is required to select the type of the element you are creating whether it is a button or edit text or text field...
Other ways the plugin will not work correctly.

BUTTON
A button can be with text or without, so when you create a rectangle with a text it is necessary to group them.

EDIT TEXT
An edit text can be also with hint or without, so when you create a rectangle with a text it is necessary to group them and select the EditText type from the panel

NAMES OF ARTBOARD
Every artboard will be converted to an xml file in android studio, for that you must attach the extension .xml to name of the artboard.

EXPORT IMAGES
In order to optimize export,     images are not exported with widgets. Only images with a name assigned in the plugin panel can be exported. Select an image and click "Export Image", or use the "Export All Images" button to export all images with a name to the Image Path.


ISSUES
•	Only solid color backgrounds are supported for artboard.
•	List views, recycler Viewer, grid view are not supported in this version and will be aded for the next versions.
•	Opacity is always considered as 100
•	Only horizontal or Vertical Scroll View is accepted because the Horizontal/Vertical widget does not exist in android studio.





