// package com.example.springapp.config;

// import com.cloudinary.Cloudinary;
// import com.cloudinary.utils.ObjectUtils;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.File;
// import java.io.IOException;

// @Service
// public class MediaFileService {

//     private final Cloudinary cloudinary;

//     public MediaFileService() {
//         cloudinary = new Cloudinary(ObjectUtils.asMap(
//                 "cloud_name", "dojkaeq7z",
//                 "api_key", "627827944452969",
//                 "api_secret", "2hT5-Cn73z8CxDcWbr1EN1LgK2s"));
//     }

//     public String saveMediaFile(MultipartFile file) throws IOException {
//         // Check if the file is null or has a valid content type
//         if (file == null || file.getContentType() == null) {
//             // Handle the case where the file is null or the content type is missing
//             throw new IllegalArgumentException("Invalid file or missing content type.");
//         }

//         // Get the original filename
//         String originalFilename = file.getOriginalFilename();

//         // Check if the file is an image or a video
//         String contentType = file.getContentType();
//         boolean isImage = contentType != null && contentType.startsWith("image");

//         // Upload the file to Cloudinary with the appropriate resource type
//         String mediaUrl;
//         if (isImage) {
//             mediaUrl = cloudinary.uploader()
//                     .upload(file.getBytes(), ObjectUtils.asMap("public_id", originalFilename))
//                     .get("url").toString();
//         } else {
//             mediaUrl = cloudinary.uploader()
//                     .upload(file.getBytes(), ObjectUtils.asMap("resource_type", "video", "public_id", originalFilename))
//                     .get("url").toString();
//         }

//         // Return the public URL of the uploaded file
//         return mediaUrl;
//     }

//     public String saveFile(MultipartFile file) throws IOException {
//         String fileName = file.getOriginalFilename();
//         String filePath = "https://8081-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io\\public\\Assets\\PropertyMedia\\"
//                 + fileName;
//         File destinationFile = new File(filePath);
//         file.transferTo(destinationFile);
//         return "./Assets/PropertyMedia/" + fileName;
//     }
// }
