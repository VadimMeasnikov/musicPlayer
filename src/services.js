import firebase from 'firebase/compat/app'
import config from "../config.js";
import 'firebase/compat/database'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { update } from 'firebase/database';


const app = firebase.initializeApp(config)
const db = app.database()


export function useAddData() {
    console.log('useAddData');
    const queryClient = useQueryClient();

    return useMutation(
        async (newData) => {
            const ref = db.ref('users').push();
            const userKey = ref.key;

            await ref.set(newData);
            return userKey;
        },
        {
            onSuccess: (userKey) => {
                queryClient.invalidateQueries('users');
            },
        }
    );
}


export function useEditData() {
    console.log('useEditData');
    const queryClient = useQueryClient()

    return useMutation(async ({ id, field, updateData }) => {
        await db.ref(`users/${id}/${field}`).set(updateData)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
            }
        }
    )
}


// export function useCorrectData() {
//     const queryClient = useQueryClient()

//     return useMutation(async ({ id, field, updateData }) => {
//         const snapshot = await db.ref(`users/${id}/${field}`).get();
        
//         const existingData = JSON.parse(snapshot.val())
//         console.log(updateData);
//         const track = JSON.parse(updateData)
//         const updatedData = [existingData, track];

//         await db.ref(`users/${id}/${field}`).set(JSON.stringify(updatedData))
//         console.log('succesfull');
//     },
//         {
//             onSuccess: () => {
//                 queryClient.invalidateQueries('users')
//             }
//         }
//     )
// }


export async function getAllUsersData() {
    console.log('getAllUsersData');
    const snapshot = await db.ref('users').once('value');
    const data = snapshot.val();
    return data;
}

