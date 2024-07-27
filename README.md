

---

<h1>Image Upload and Resize Project</h1>

This Node.js application allows users to upload image files, resize them to a specified size, and save them to a server directory. The resizing is performed using the `sharp` library, and the system handles various image formats and ensures that files are not enlarged beyond their original dimensions.

 Features

- File Upload: Upload image files through an API endpoint.
- File Resize: Resize images to fit within a target size while preserving the aspect ratio.
- Directory Management: Automatically creates an upload directory if it doesn’t exist.
- Error Handling: Includes error handling for invalid input and file processing issues.
- Supported Formats: Handles common image formats like JPEG, PNG, WebP, TIFF, and GIF.

 Installation

1. Clone the Repository

   bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install Dependencies

   Make sure you have Node.js and npm installed. Run:

   bash
   npm install
   

3. Create `.env` File

   Create a `.env` file in the root directory if needed for configuration. For this project, no environment variables are required by default.

Usage

1. Start the Server

   To start the server, run:

  bash
  npm start
  

2. Upload and Resize Files

   Use an API client like Postman to test the file upload and resize functionality.

   Endpoint: `POST /upload`

   Request Body:
   - `file` (form-data): The image file to upload.
   - `targetSizeKB` (form-data): The maximum target size of the resized image in kilobytes.

   Response:
   - Success: Returns a JSON object with success status and file details.
   - Error: Returns error messages for invalid input or processing issues.
 Example

Uploading a File

In Postman or any HTTP client:

- Method: `POST`
- URL: `http://localhost:3000/upload`
- Body: Form-data
 Key: `file`, Type: `File`, Value: [Select image file]
Key: `targetSizeKB`, Type: `Text`, Value: `200` (for example)

Response

On success:

json
{
  "success": true,
  "message": "File resized and saved successfully",
  "data": {
    "name": "resized-image.jpg",
    "path": "/uploads/resized-image.jpg",
    "size": 204800  // Size in bytes
  }
}


On error:`json
{
  "success": false,
  "message": "Invalid target size provided. Please provide a positive integer value."
}
```
 Directory Structure

- `index.js`: Main server file
- `model/`: Contains Mongoose models
  - `file.js`: Mongoose schema for file metadata
- `uploads/`: Directory where uploaded and resized files are saved

Contributing

Feel free to submit issues or pull requests to improve the project. For major changes, please open an issue first to discuss the changes.

