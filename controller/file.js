const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { File } = require('../model/file');
const mime = require('mime-types'); // Import mime-types for format detection

// Define the path for the new directory
exports.uploadAndResizeFile = async (req, res) => {
    try {
        const file = req.files.file;
        const targetSizeKB = parseInt(req.body.targetSizeKB);

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a file'
            });
        }

        if (isNaN(targetSizeKB) || targetSizeKB <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid target size provided. Please provide a positive integer value.'
            });
        }

        // Validate file type
        const mimeType = mime.lookup(file.name);
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/tiff', 'image/gif'].includes(mimeType)) {
            return res.status(400).json({
                success: false,
                message: 'Unsupported file format. Please upload an image file.'
            });
        }

        const directoryPath = path.resolve('uploads');
        console.log('Absolute Path:', directoryPath);

        if (!fs.existsSync(directoryPath)) {
            try {
                fs.mkdirSync(directoryPath, { recursive: true });
                console.log('Directory created at:', directoryPath);
            } catch (error) {
                console.error('Error creating directory:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Error creating directory'
                });
            }
        } else {
            console.log('Directory already exists at:', directoryPath);
        }

        const originalFilePath = path.join(directoryPath, file.name);
        fs.writeFileSync(originalFilePath, file.data);
        console.log("file data=>", file.data, file.name);

        const fileSizeInKB = file.size / 1024;
        console.log(fileSizeInKB);
        if (fileSizeInKB > targetSizeKB) {
            const resizedFilePath = path.join(directoryPath, `resized-${file.name}`);

            // Calculating the resize dimensions correctly
            const resizeRatio = targetSizeKB / fileSizeInKB;
            console.log("resize ratio", resizeRatio);
            const metadata = await sharp(originalFilePath).metadata();
            console.log("metadata of file =>", metadata);
            const newWidth = Math.round(metadata.width * Math.sqrt(resizeRatio));
            console.log("new width =", newWidth);
            await sharp(originalFilePath)
                .resize({
                    width: newWidth,
                    withoutEnlargement: true
                })
                .toFile(resizedFilePath);

            const resizedFile = new File({
                name: `resized-${file.name}`,
                path: resizedFilePath,
                size: targetSizeKB * 1024 // Convert KB to bytes
            });
            await resizedFile.save();

            return res.status(200).json({
                success: true,
                message: 'File resized and saved successfully',
                data: resizedFile
            });
        } else {
            const savedFile = new File({
                name: file.name,
                path: originalFilePath,
                size: file.size
            });
            await savedFile.save();

            return res.status(200).json({
                success: true,
                message: 'File saved successfully',
                data: savedFile
            });
        }
    } catch (error) {
        console.error('Error processing file:', error);
        return res.status(500).json({
            success: false,
            message: 'Error processing file'
        });
    }
};
