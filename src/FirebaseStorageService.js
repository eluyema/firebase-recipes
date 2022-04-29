import firebase from "./FirebaseConfig";

const storageRef = firebase.storage().ref();

const uploadFile = (file, fullFilePath, progressCallback) => {
  let i = 0;

  const uploadTask = storageRef.child(fullFilePath).put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      progressCallback(progress);
    },
    (error) => {
      throw error;
    }
  );

  return uploadTask.then(async () => {
    const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();

    return downloadUrl;
  });
};

const deleteFile = (fileDownloadUrl) => {
  const decodedUrl = decodeURIComponent(fileDownloadUrl);
  console.log('1',fileDownloadUrl);
  console.log('2',decodedUrl);
  const startIndex = decodedUrl.indexOf("/o/") + 3;
  const endIndex = decodedUrl.indexOf("?");
  const filePath = decodedUrl.substring(startIndex, endIndex);
  console.log('3',filePath, startIndex, endIndex);
  console.log('4', startIndex);
  console.log('5',endIndex);


  return storageRef.child(filePath).delete();
};

const FirebaseStorageService = {
  uploadFile,
  deleteFile,
};

export default FirebaseStorageService;