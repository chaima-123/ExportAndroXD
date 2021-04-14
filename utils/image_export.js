
const application = require("application");
const fs = require("uxp").storage.localFileSystem;


async function exportRendition(selection,folder) {
  console.log("im inside exportRen");

    const arr = await selection.map(async item => {	
   
	  let file = await folder.createFile(item.name.substring( item.name.lastIndexOf("_") + 1,  )+".png", { overwrite: true });
		let obj = {};
		obj.node = item;
		obj.outputFile = file;
		obj.type = "png";
		obj.scale = 2;
		return obj
    })
    const renditions = await Promise.all(arr);
    await application.createRenditions(renditions)
}

exports.exportRendition = exportRendition;


 function createDialog(filepath) {
  // Add your HTML to the DOM
  document.body.innerHTML = `
    <style>
    form {
        width: 400px;
    }
    </style>
    <dialog id="dialog">
        <form method="dialog">
            <h1>Redition saved</h1>
            <p>Your rendition was saved at:</p>
            <input type="text" uxp-quiet="true" value="${filepath}" readonly />
            <footer>
            <button type="submit" uxp-variant="cta" id="ok-button">OK</button>
            </footer>
        </form>
    </dialog>
  `;

  // Remove the dialog from the DOM every time it closes.
  // Note that this isn't your only option for DOM cleanup.
  // You can also leave the dialog in the DOM and reuse it.
  // See the `ui-html` sample for an example.
  let dialog = document.querySelector("#dialog");
  dialog.addEventListener("close", e => dialog.remove());

  return dialog;
}

exports.createDialog = createDialog;



