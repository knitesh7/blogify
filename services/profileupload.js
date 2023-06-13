
import multer, { diskStorage } from 'multer';

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profileImages'); // Specify the destination folder to store uploaded files
    },
    filename: (req, file, cb) => {
        let imgnameArr = file.originalname.split('.')
        cb(null, `${imgnameArr[0]}(${Date.now()}).${imgnameArr[1]}`)
    }
});

const fileFilter = (req, file, cb) => {
    // Define the allowed mimetypes for image files
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(null, false); // Reject the file
        cb(new Error('Only image files are allowed')); // Optional error message
    }
};

const profileUpload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default profileUpload;
