const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dssccm7cj",
  api_key: "445497312634646",
  api_secret: "_YI5TsRCwchVq9cUKnwr2S11-0M",
});

const cloudinaryUploadImg = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "shopver02",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return {
      url: result.secure_url,
      public_id: result.public_id,
      asset_id: result.asset_id,
    };
  } catch (error) {
    console.error("error", error);
  }
};

const cloudinaryDeleteImg = async (publicId) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {};

  try {
    // Upload the image
    const result = await cloudinary.uploader.destroy(publicId, options);
    return {
      url: result.secure_url,
      public_id: result.public_id,
      asset_id: result.asset_id,
    };
  } catch (error) {
    console.error("error", error);
  }
};

const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);
    console.log(result);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};

const createImageTag = (publicId, ...colors) => {
  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors;

  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
      { effect: "outline:10", color: effectColor },
      { background: backgroundColor },
    ],
  });

  return imageTag;
};

module.exports = { cloudinaryUploadImg };
