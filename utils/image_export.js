
const application = require("application");
const fs = require("uxp").storage.localFileSystem;


async function  exportImage(selection,folder) {
  console.log("imm clalledddddddddddddddddddddddddddddddddddddddddddddddddddddd ");
  // Exit if there's no selection
  // For production plugins, providing feedback to the user is expected
    // if (selection.items.length === 0)
    //   return console.log("No selection. Guide the user on what to do.");

  // Get a folder by showing the user the system folder picker

  //const folder = await fs.getFolder();

  //const folder = global.folder
  // Exit if user doesn't select a folder
  if (!folder) return console.log("User canceled folder picker.");
  
  // Create a file that will store the rendition
  let file = await folder.createFile(selection.name.substring( selection.name.lastIndexOf("_") + 1,  )+".png", { overwrite: true });

  // Create options for rendering a PNG.
  // Other file formats have different required options.
  // See `application#createRenditions` docs for details.
  let renditionOptions = [
    {
      node: selection,
      outputFile: file,
      type: application.RenditionType.PNG,
      scale: 2
    }
  ];

  try {
    // Create the rendition(s)
    let results = await application.createRenditions(renditionOptions);

    // Create and show a modal dialog displaying info about the results
    let dialog = createDialog(results[0].outputFile.nativePath);
    return dialog.showModal();
  } catch (err) {
    // Exit if there's an error rendering.
    return console.log("Something went wrong. Let the user know.");
  }
}

exports.exportImage = exportImage;


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



