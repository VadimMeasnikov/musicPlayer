import { getDownloadURL, ref } from 'firebase/storage';
import { imageDb } from '../..';

export async function getCurrentAvatar(userId) {
  const imgRef = ref(imageDb, `images/${userId}.png`);
  try {
    const avatar = await getDownloadURL(imgRef);
    console.log(avatar);
    return avatar;
  } catch (error) {
    console.error('Error getting avatar URL:', error);
    return null;
  }
}