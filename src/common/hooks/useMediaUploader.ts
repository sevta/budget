import { useState } from "react";
type Props = {
  files: File[];
};

export default function useMediaUploader({ files }: Props) {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  async function upload() {
    setIsLoading(true);
    for (const file of files) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gxb9lnzq");
      formData.append("cloud_name", "dbgdwtymv");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dbgdwtymv/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        let temp = [];
        temp.push(data.secure_url);
        setMedia(temp);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return {
    upload,
    media,
    isLoading,
  };
}
