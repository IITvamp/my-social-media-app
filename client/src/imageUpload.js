export const checkImage = (file) => {
  let err = "";
  if (!file) {
    return (err = "File does not exist.");
  }
  //?1 mb
  if (file.size > 1024 * 1024) {
    return (err = "File size must be less than 1 Mb.");
  }

  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/jpg"
  ) {
    return (err = "Image must be jpeg or png or jpg.");
  }

  return err;
};

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    formData.append("file", item);

    formData.append("upload_preset", "ayushbansalaccount");
    formData.append("cloud_name", "datinginsta110");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/datinginsta110/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
      console.log(res);
    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
