import firebase from 'firebase/compat/app'
import config from "../config.js";
import 'firebase/compat/database'
import { useQuery, useMutation, useQueryClient } from 'react-query'


const app = firebase.initializeApp(config)
const db = app.database()

export function useAddData() {
    const queryClient = useQueryClient()

    return useMutation(async (newData) => {
        await db.ref('users').set(newData)
        console.log('succesfull');
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
            }
        }
    )
}


export function useEditData() {
    const queryClient = useQueryClient()

    return useMutation(async ({ id, updateData }) => {
        await db.ref(`users/${id}`).set(updateData)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
            }
        }
    )
}


// export async function getData(){
//     console.log(db.onValue());
//     console.log(1);
//   try{
//     const users = await db.onValue((res) => {
//       console.log(res);
//     });
//     console.log(users);
//   }
//   catch (e){
//    console.error(e)
//   }

//  }



export function useGetData() {
    console.log(db);
    return useQuery('users', async () => {
        const snapshot = await db.ref('users').once('value')
        console.log(snapshot.val());
        return snapshot.val()
    })
}

