import stringUtils from "@/utilities/stringUtils";
import {
    v4
} from "uuid";
import {
    ref,
    getDownloadURL,
    uploadBytes
} from "firebase/storage";
import {
    storage
} from "../configs/firebase";
import axios from "axios";


let uploadFileToFirebase = async (_file) => {
    //PREPARE UPLOADING
    let fileName = `sp_${Date.now()}_${v4()}.${stringUtils.getFilenameExtension(
      _file.name
    )}`;
    const storageRef = ref(storage, `images/${fileName}`);

    //UPLOADING
    let uploadedPath;
    await uploadBytes(storageRef, _file).then((snapshot) => {
        console.log(`Uploaded file ${fileName} successfully.`);
        uploadedPath = snapshot.metadata.fullPath;
    });
    return uploadedPath;
}

let getFriebaseFileUrl = async (path) => {
    let res;
    await getDownloadURL(ref(storage, path))
        .then((url) => {
            res = url;
        })
        .catch((error) => {
            error;
            res = null;
        });
    return res;
}

let getFriebaseFile = async (path) => {
    let fileUrl, fileType;
    await getDownloadURL(ref(storage, path))
        .then((url) => {
            fileUrl = url;
        })
        .catch((error) => {
            error;
            fileUrl = null;
        });

    let getDetailFilePath = fileUrl.split("?alt=")[0];
    await axios
        .get(getDetailFilePath)
        .then((res) => {
            fileType = res.data["contentType"];
        })
        .catch((err) => {
            err;
            fileType = null;
        });
    return [fileUrl, fileType];
}


let uploadFilesToFirebase = async (files) => {
    let uploadedFilenames = [];
    for (let file of files) {
        // console.log(file);
        let uploadedFilename = await uploadFileToFirebase(file);
        if (uploadedFilename != null) {
            uploadedFilenames.push(uploadedFilename);
        }
    }
    // console.log(uploadedFilenames);
    return uploadedFilenames;
}

export default {
    uploadFileToFirebase: uploadFileToFirebase,
    getFriebaseFileUrl: getFriebaseFileUrl,
    getFriebaseFile: getFriebaseFile,
    uploadFilesToFirebase: uploadFilesToFirebase
}