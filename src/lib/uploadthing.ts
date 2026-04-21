import { OurFileRouter } from "@/app/api/plants/uploadthing/core";
import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";

  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();