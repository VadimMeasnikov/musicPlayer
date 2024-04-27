import firebase from 'firebase/compat/app'
import config from "../config.js";
import 'firebase/compat/database'
import { useQuery, useMutation, useQueryClient } from 'react-query'


const app = firebase.initializeApp(config)
const db = app.database()


export function useAddData() {
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
    const queryClient = useQueryClient()

    return useMutation(async ({ id, field, updateData }) => {
        
        console.log(`users/${id}/${field}`);
        console.log('update data is ' + updateData);

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

