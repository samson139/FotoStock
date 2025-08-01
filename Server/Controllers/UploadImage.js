
const UserModel = require("../models/usermodel")
const path = require("path");
const PhotoModel = require("../models/products")
// const cloudinary = require("../Utils/cloudinary");
const fs = require("fs");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadImage = async (req, res) => {

  const { imagename, username, price, description } = req.body;

  const userId = req.userId;
  const user = await UserModel.findById(userId);

  const place = path.join(__dirname, '..', 'public', 'data', 'uploads');
  try {

    const filePath = path.join(place, req.file.filename);
    const uniqueImageName = `${imagename}_${Date.now()}`;
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `photopedia/${username}/${uniqueImageName}${path.extname(req.file.originalname)}`,
      Body: fileContent,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
    };

    const s3UploadPromise = new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    const s3UploadResult = await s3UploadPromise;
    console.log("Image uploaded successfully:", s3UploadResult);
    const location = s3UploadResult.Location;


    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting local file:', err);
      } else {
        console.log('Local file deleted successfully');
      }
    });
    const photo = await PhotoModel.create({
      imagename: imagename,
      price: price,
      description: description,
      url: location,
      user: userId,
      firstname: user.firstname,
      lastname: user.lastname,
    });

    return res.status(200).send(photo);
  } catch (error) {

    res.status(500).send("Error uploading image");
  }
}
module.exports = uploadImage;