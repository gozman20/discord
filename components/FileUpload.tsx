import React from "react";
import Image from "next/image";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { Trash } from "lucide-react";

interface FileUploadProps {
  onChange(url?: string): void;
  value: string;
  endPoint: "messageFile" | "serverImage";
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endPoint,
}) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20 ">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <div>
      <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(err: Error) => {
          console.log(err);
        }}
      />
    </div>
  );
};
