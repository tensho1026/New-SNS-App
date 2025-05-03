import { useState } from "react";

export const useImagePreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImageFile(file);
    }
  };

  const resetImage = () => {
    setPreviewUrl(null);
    setImageFile(null);
  };

  return {
    previewUrl,
    imageFile,
    handleImageChange,
    resetImage,
    setPreviewUrl
  };
};
