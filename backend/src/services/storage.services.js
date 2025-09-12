
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});


async function uploadImage(file,fileName){
    try{

    
    const response = await imagekit.upload({
        file:file,
        fileName:fileName,
        folder:"/nyandesk/users",
    })
    return response.url;
    }catch(err){
        throw new error("Image upload failed:", err);
    }
}

module.exports = uploadImage;