import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: "dxu8fhyua",
  api_key: "367945334196537",
  api_secret: "cs4zyNZcqlATGpjHECNPx_JwhHg",
  verbose: true,
});


const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      timeout: 1200000, // 60 seconds
    });

    console.log("File uploaded to Cloudinary: ", response.url);

    // Remove the local file
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error("Error while deleting local file:", err);
      } else {
        console.log("Local file deleted successfully");
      }
    });

    const fileSizeInBytes = fs.statSync(localFilePath).size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    console.log(`File size: ${fileSizeInMB} MB`);

    if (fileSizeInMB > 10) {
      console.warn("File size is large, consider compressing before upload.");
    }


    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    // Attempt to delete the local file even if the upload fails
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error("Error while deleting local file after failure:", err);
      }

    });
    const fileSizeInBytes = fs.statSync(localFilePath).size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    console.log(`File size: ${fileSizeInMB} MB`);

    if (fileSizeInMB > 10) {
      console.warn("File size is large, consider compressing before upload.");
    }


    return null;
  }
};

export { uploadOnCloudinary };
