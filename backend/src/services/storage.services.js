const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(file, fileName) {
  try {
    const response = await imagekit.upload({
      file,
      fileName,
      folder: "/nyandesk/users",
    });

    return {
      url: response.url,
      fileId: response.fileId,
      filePath: response.filePath,
    };
  } catch (err) {
    throw new Error("Image upload failed: " + err.message);
  }
}

async function deleteImage(fileId) {
  try {
    if (!fileId || typeof fileId !== "string") return false;

    // Must be a valid ImageKit fileId, not a URL
    if (fileId.startsWith("http")) return false;

    await imagekit.deleteFile(fileId);
    return true;
  } catch {
    return false;
  }
}

module.exports = { uploadImage, deleteImage };
