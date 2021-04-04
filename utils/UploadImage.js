const application = require("application");
const fs = require("uxp").storage.localFileSystem;
const xd = require("scenegraph"); 
class UploadImage {

//     async static uploadImage(selection) {

// }

static getRenditionType(xdNode) {
	let fill = xdNode.fill;
	if (!fill || !(fill instanceof xd.ImageFill))
     { return null; }
	return fill.mimeType === 'image/jpeg' ? app.RenditionType.JPG : app.RenditionType.PNG
}

static getImageExtension(xdNode) {
	let type = this.getRenditionType(xdNode);
	return !type ? null : type === app.RenditionType.JPG ? "jpg" : "png";
}

static getImageFileName(xdNode) {
	let ext = this._getImageExtension(xdNode), name = this.getImageName(xdNode);
	return ext && name ? `${name}.${ext}` : null;
}

static getImageId(xdNode) {
	return xdNode.fill && xdNode.fill.assetId;
}

static getImageHash(xdNode) {
	// This only works on images that have been dragged into XD from the file system.
	let path = this._getImageFillName(xdNode.fill);
	return path ? this.getHash(path) : null;
}


static _getImageFillName(fill) {
	if (!fill) { return null; }
	// this is a huge hack, because ImageFill doesn't have a .file property
	let fillStr = fill.toString().replace(/\\/g, '/');
	// as of XD29, this returns a file name & dimensions
	let match = /ImageFill\(([^<][^(]+)\)/.exec(fillStr);
	return match ? match[1] : null;
}

static getImageName(xdNode) {
	if (!xdNode.fill) { return "touotu"; }
	let name, hash = this.getImageHash(xdNode), id = this.getImageId(xdNode);
	let o = xd.root.pluginData, map = o && o.imageMap;
	if (id) { name = map && map[id]; }
    if (!name && hash) { // for backwards compatibility.
		name = map && map[hash];
    }
    return name || this.getProp(xdNode,"imageFillName") || "nouonu";
}

static getProp(xdNode, prop) {
    let o = xdNode.pluginData;
    return o && o[prop];
}

static getHash(str) {
	let hash = 0;
	for (let i = 0; i < str.length; ++i) {
		// Original fn: h = c + (h << 6) + (h << 16) - h
		// Idk if the bit version or multiply version is faster, it probably doesn't matter
		hash = hash * 65599 + str.charCodeAt(i) | 0; // Prime multiply, add character to hash, convert to int
	}
	return hash;
}

}

exports.UploadImage = UploadImage;