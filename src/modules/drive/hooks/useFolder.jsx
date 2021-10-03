import { database, firestore, storage } from '../../../../firebase'
import { useReducer, useState, useEffect, useContext } from 'react'
import { folderReducer } from '../reducers/reducer'
import { ACTION } from '../actions/action'
import { ROOT_FOLDER } from '../../../constants/constants'
import { AuthContext } from '../../../contexts/authContext'

const useFolder = (folderId = null, folder = null) => {
    const folderCollection = firestore.collection("folders")
    const fileCollection = firestore.collection("files")
    const { state: { currentUser } } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const initialState = {
        folderId: '',
        folder: null,
        childFiles: [],
        childFolders: []
    }
    const [state, dispatch] = useReducer(folderReducer, initialState, () => initialState)
    const addFolder = async (folder) => {
        setError(null)
        setLoading(true)
        try {
            const res = await folderCollection.add({ ...folder, createAt: database.getCurrentTimestamp() })
            setLoading(false)
            return res
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            setLoading(false)
        }
    }
    const getFolder = async () => {
        try {
            setError(null)
            // get() is  asynchronous
            const res = await folderCollection.doc(folderId).get()
            if (res) {
                dispatch(ACTION.updateFolder({ folder: database.formatDoc(res) }))
            }
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            dispatch(ACTION.updateFolder({ folder: ROOT_FOLDER }))
        }
    }
    const getFolders = () => {
        try {
            setError(null)
            let query = folderCollection
                .where('parentId', "==", folderId)
                .where("userId", "==", currentUser.uid)
            // onSnapShot is not asynchronous
            return query.onSnapshot(snapshot => {
                dispatch(ACTION.setChildFolders({ childFolders: snapshot.docs.map(database.formatDoc) }))
            })
        } catch (err) {
            console.log(err.message)
            setError(err.message)
            dispatch(ACTION.updateFolder({ folder: ROOT_FOLDER }))
        }
    }
    useEffect(() => {
        dispatch(ACTION.selectFolder(folderId, folder))
    }, [folderId, folder])

    useEffect(() => {
        if (folderId === null) {
            return dispatch(ACTION.updateFolder({ folder: ROOT_FOLDER }))
        }
        getFolder()
    }, [folderId])

    useEffect(() => {
        if (currentUser) {
            let unsub = getFolders()
            return () => unsub()
        }
    }, [folderId, folder])

    return { addFolder, error, loading, state }

}

export { useFolder }