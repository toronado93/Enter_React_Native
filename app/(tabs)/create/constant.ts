import { z } from "zod";

const CreateSchema = z.object({
  title: z.string().min(1, "title required"),
  video: z
    .object({
      uri: z.string(),
      name: z.string(),
      size: z.number(),
      mimeType: z.string(),
    })
    .refine(
      (file) => {
        // Check if the type starts with "image/"
        const isVideo = file.mimeType.startsWith("video/");
        // Check if the size is less than 10 MB (adjust as needed)
        //const isSizeValid = file.size <= 10000000; // 10 MB in bytes
        return isVideo;
      },
      {
        message: "Invalid video file",
      }
    ),
  thumbnail: z
    .object({
      uri: z.string(),
      name: z.string(),
      size: z.number(),
      mimeType: z.string(),
    })
    .refine(
      (file) => {
        // Check if the type starts with "image/"
        const isImage = file.mimeType.startsWith("image/");
        // Check if the size is less than 10 MB (adjust as needed)
        //const isSizeValid = file.size <= 10000000; // 10 MB in bytes
        return isImage;
      },
      {
        message: "Invalid image file",
      }
    ),
  prompt: z.string().min(10, "Logical prompt is required"),
});

export { CreateSchema };
