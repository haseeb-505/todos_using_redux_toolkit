import { v2 as cloudinary } from "cloudinary";
import { fs } from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadaToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
    
        // upload the file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        console.log("Files have been uploaded, response url is: ", response.url);
        // remove the file from local path
        fs.unlinkSync(localFilePath);
        // return the final response
        return response
    }catch (error) {
        // unlink the local file if it could not be uploaded to cloudinary
        fs.unlinkSync(localFilePath)
        console.log("The localFilePath is unlinked becuase there was an error");
        return null;
    }
}

export { uploadaToCloudinary }






