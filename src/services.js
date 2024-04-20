import firebase from 'firebase/compat/app'
import config from "../config.js";
import 'firebase/compat/database'
import { useQuery, useMutation, useQueryClient } from 'react-query'


const app = firebase.initializeApp(config)
const db = app.database()

// export function useAddData() {
//     const queryClient = useQueryClient()

//     return useMutation(async (newData) => {
//         await db.ref('users').set(newData)
//         console.log('succesfull');
//     },
//         {
//             onSuccess: () => {
//                 queryClient.invalidateQueries('users')
//             }
//         }
//     )
// }

export function useAddData() {
    const queryClient = useQueryClient();
    return useMutation(async (newData) => {
        console.log(newData);
        const ref = db.ref('users').push();
        await ref.set(newData);
    }, {
        onSuccess: (newKey) => {
            queryClient.invalidateQueries('users');
        },
    });
}

export function useEditData() {
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


export function useGetData() {
    return useQuery('users', async () => {
        const snapshot = await db.ref('users').once('value')
        console.log(snapshot.val());
        return snapshot.val()
    })
}

