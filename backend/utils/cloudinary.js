import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "da2pbdhnc", // Replace with your Cloudinary cloud name
  api_key: "643126473596827", // Replace with your Cloudinary API key
  api_secret: "02NSbZ7fkqTtAVYljccU501wPSY", // Replace with your Cloudinary API secret
});

export default cloudinary;
