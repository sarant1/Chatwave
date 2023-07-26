async function getPresignedUrl(type) {
  const fetch = (await import("node-fetch")).default;
  const url = "https://jr5xo1wa2h.execute-api.us-east-1.amazonaws.com/prod";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Type: type,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function uploadPhoto(data, url, file) {
  const FormData = (await import("form-data")).default;
  const formData = new FormData();
  console.log("FIELDS: ", data.fields);
  Object.entries(data.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("file", file);
  formData.submit(url, () => {
    //handle the response
    console.log("DONE");
  });
  return data;
}

async function main() {
  const { createReadStream } = await import("fs");
  const file = createReadStream(
    "/home/sudosarant/Pictures/Wallpapers/SBKjnxm.jpeg"
  );
  const data = await getPresignedUrl("jpeg");
  await uploadPhoto(data, data.url, file);
}

main();
