import React, { useContext } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import { storage } from '../../../../firebase'
import { ROOT_FOLDER } from '../../../constants/constants'
import { AuthContext } from '../../../contexts/authContext'
const AddFile = ({ currentFolder }) => {
    const { state: { currentUser } } = useContext(AuthContext)
    const handleUpload = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if (currentFolder === null || file === null) return
        const filePath = currentFolder === ROOT_FOLDER ?
            `/${file.name}`
            : `${currentFolder.path.map(p => p.name).join('/')}/${currentFolder.name}/${Math.random() + file.name}`

        const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file)
    }
    return (
        <label className='btn btn-outline-success btn-sm m-0 mr-2'>
            <FaFileUpload style={{ height: '2rem', width: '2rem' }} />
            <input type='file' onChange={handleUpload} style={{ opacity: 0, position: 'absolute', left: '-9999px' }}></input>
        </label>
    )
}

export default AddFile
