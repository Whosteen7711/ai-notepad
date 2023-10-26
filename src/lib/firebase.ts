// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Firebase Storage
const storage = getStorage(app)

export const uploadFileToFirebase = async (
  image_url: string,
  title: string
) => {
  try {
    // GET request to image_url
    const response = await fetch(image_url)
    // convert request object to bytes array
    const buffer = await response.arrayBuffer()
    // create file name for the DALLE image from the note title
    const fileName = title.replace(' ', '') + Date.now() + '.jpeg'
    // create an image ref for storage instance
    const imageRef = ref(storage, fileName)
    // upload the image to firebase storage
    await uploadBytes(imageRef, buffer, {
      contentType: 'image/jpeg',
    })
    // get the permanent url for the image
    const firebaseUrl = await getDownloadURL(imageRef)
    return firebaseUrl
  } catch (error) {
    console.error(error)
  }
}
