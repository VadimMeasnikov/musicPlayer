import { ref, uploadBytes } from "firebase/storage"
import { imageDb } from ".."

export async function useAvatar(file, user) {
    const imgRef = ref(imageDb,'images/' + user.uid + '.png')
    const snapshot = await uploadBytes(imgRef, file)
    console.log('succelsfull');
}