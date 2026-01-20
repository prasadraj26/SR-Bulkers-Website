const { onCall } = require("firebase-functions/v2/https");
const { defineString } = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();

// Cloudinary environment variables (modern)
const CLOUDINARY_CLOUD_NAME = defineString("CLOUDINARY_CLOUD_NAME");
const CLOUDINARY_API_KEY = defineString("CLOUDINARY_API_KEY");
const CLOUDINARY_API_SECRET = defineString("CLOUDINARY_API_SECRET");

// Dummy function (for now, just to verify setup)
exports.healthCheck = onCall(() => {
  return {
    status: "ok",
    cloud: CLOUDINARY_CLOUD_NAME.value(),
  };
});
