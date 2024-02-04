import { v2 as cloudinary } from 'cloudinary' 

// Load the configuration file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagedb = (image)=>{
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.upload(image, (err, res)=>{
            if(err) return reject(err);
            return resolve(res.secure_url);
        });
    });
}
export default imagedb