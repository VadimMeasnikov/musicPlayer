import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import config from "../config.js";
import 'firebase/compat/database'

import { useQuery, useMutation, useQueryClient } from 'react-query'

const app = firebase.initializeApp(config)
const db = app.database()

export function useAddData() {
    const queryClient = useQueryClient()

    return useMutation(async (newData) => {
        await db.ref('users').push(newData)
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

    return useMutation(async ({id, updateData}) => {
        await db.ref(`users/${id}`).set(updateData)
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
            }
        }
    )
}


export function useGetData() {
   return useQuery('user', async () => {
    const snapshot = await db.ref('users').once('value')
    return snapshot.val()
   })
}

