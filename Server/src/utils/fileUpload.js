const cloudinary = require('cloudinary')

const uploadImageToCloudinary = async(file)=>{
    try{
        //below statement to upload file to cloudinary so we have cloudinary.uploader which has and upload function( which takes the path of file to be uploaded)
        const result = await cloudinary.uploader.upload(file.path)
        //the result will have the secure url of the place in cloudinary where file is uploaded
        return result.secure_url;
    }catch(error){
        throw new Error('error in uploading image to cloudinary')
    }
}

module.exports = uploadImageToCloudinary