import React from "react";

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
  return <div></div>;
};
