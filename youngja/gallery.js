import { ImagePickerManager } from "NativeModules";

const GalleryUtil = {
    options: {
        title:                        "", // specify null or empty string to remove the title
        cancelButtonTitle:            "취소",
        takePhotoButtonTitle:         "사진 촬영", // specify null or empty string to remove this button
        chooseFromLibraryButtonTitle: "사진 가져오기", // specify null or empty string to remove this button
        cameraType:                   "back", // "front" or "back"
        mediaType:                    "photo", // "photo" or "video"
        videoQuality:                 "high", // "low", "medium", or "high"
        durationLimit:                10, // video recording max time in seconds
        maxWidth:                     1024, // photos only
        maxHeight:                    1024, // photos only
        quality:                      0.5, // 0 to 1, photos only
        angle:                        0, // android only, photos only
        allowsEditing:                true, // Built in functionality to resize/reposition the image after selection
        noData:                       false, // photos only - disables the base64 `data` field from being generated
                                             // (greatly improves performance on large photos)
    },

    getPhoto(callback, allowEditing){
        if(allowEditing === false) {
            this.options.allowsEditing = false;
        }
        ImagePickerManager.launchImageLibrary(this.options, callback);
    },

    getCamera(callback, allowEditing) {
        if(allowEditing === false) {
            this.options.allowsEditing = false;
        }
        ImagePickerManager.launchCamera(this.options, callback);
    },

    getPopupPhoto(callback, hasDefaultMenu){
        if (hasDefaultMenu) {
            this.options.setDefaultImage = "기본 이미지로 변경";
            this.options.customButtons = {"기본 이미지로 변경": "setDefaultImage"};
        }
        ImagePickerManager.showImagePicker(this.options, callback);
    }
};

module.exports = GalleryUtil;
