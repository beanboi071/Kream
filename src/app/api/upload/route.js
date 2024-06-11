import uniqid from "uniqid";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";

const pump = promisify(pipeline);

export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    // Process the file
    const file = data.get("file");
    const ext = file.name.split(".").pop();
    const newFileName = `${uniqid()}.${ext}`;

    // Define the directory where the file will be saved
    const uploadDir = "public/uploads"; // Make sure this directory exists
    const filePath = path.join(uploadDir, newFileName);
    console.log("uploadDir", uploadDir);
    try {
      // Ensure the upload directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Save the file to the filesystem
      await pump(file.stream(), fs.createWriteStream(filePath));

      // Here, you can return a link or a message indicating success
      // For local files, you might return a path, or a message to indicate success
      return new Response(
        JSON.stringify({
          message: "File uploaded successfully",
          filePath: newFileName,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error saving file:", error);
      return new Response(JSON.stringify({ error: "Failed to upload file" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // If no file was uploaded
  return new Response(JSON.stringify(true), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
