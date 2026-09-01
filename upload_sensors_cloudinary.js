const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Read credentials manually from .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [k, v] = line.split('=');
  if (k && v) envVars[k.trim()] = v.trim();
});

cloudinary.config({
  cloud_name: envVars.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'hrmmi1ox',
  api_key: envVars.CLOUDINARY_API_KEY || '469689995734156',
  api_secret: envVars.CLOUDINARY_API_SECRET || 'iFmotAgKb3XCZsfrHvlqT-H_f4k'
});

const sensorsDir = 'C:\\Users\\AWIE LABS\\Website\\assets\\Sensors';

async function uploadSensors() {
  console.log('Starting Cloudinary Sensor Asset Upload...');
  const results = {};

  const folders = fs.readdirSync(sensorsDir);

  for (const folder of folders) {
    const folderPath = path.join(sensorsDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    console.log(`\nProcessing folder: ${folder}`);
    results[folder] = {};

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      if (!fs.statSync(filePath).isFile()) continue;

      const cleanFolder = folder.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const cleanFile = file.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const publicId = `awie_store/sensors/${cleanFolder}_${cleanFile}`;

      try {
        console.log(`Uploading ${file} as ${publicId}...`);
        const res = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          overwrite: true,
          resource_type: 'image'
        });
        console.log(`SUCCESS: ${res.secure_url}`);
        results[folder][file] = res.secure_url;
      } catch (err) {
        console.error(`FAILED to upload ${file}:`, err.message);
      }
    }
  }

  console.log('\n=== FINAL SENSOR CLOUDINARY URL MAP ===');
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync('sensor_cloudinary_results.json', JSON.stringify(results, null, 2));
}

uploadSensors();
