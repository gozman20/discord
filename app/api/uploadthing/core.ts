import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  serverImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => {
      const { userId } = auth();

      if (!userId) {
        throw new Error("Please sign in");
      }

      return { userId };
    })
    .onUploadComplete(({ file, metadata }) => {
      metadata;
      // ^?
      console.log("upload completed", file);
    }),
  messageFile: f(["image", "pdf"])
    .middleware(() => {
      const { userId } = auth();
      if (!userId) {
        throw new Error("Please sign in");
      }
      return { userId };
    })
    .onUploadComplete(({ file, metadata }) => {
      metadata;
      // ^?
      console.log("upload completed", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
