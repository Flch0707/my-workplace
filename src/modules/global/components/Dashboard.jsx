import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useFolder } from '../../drive/hooks/useFolder'
import AddFolder from '../../drive/components/AddFolder';
import AddFile from '../../drive/components/AddFile';
import Folder from '../../drive/components/Folder';
import FolderBreadcrums from '../../drive/components/FolderBreadcrums';
import { useParams, useLocation } from 'react-router-dom';

function Dashboard() {
    const { folderId } = useParams()
    const { state: routerState = {} } = useLocation()
    const { state: { folder, childFolders } } = useFolder(folderId, routerState.folder)
    return (
        <>
            <div className='d-flex align-items-center'>
                <FolderBreadcrums currentFolder={folder} />
                <AddFolder currentFolder={folder} className='m-5' />
                <AddFile currentFolder={folder} />
            </div>
            {childFolders && childFolders.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFolders.map(childFolder => (
                        <div key={childFolder.id} className='p-2' style={{ maxWidth: '250px' }}>
                            <Folder folder={childFolder}></Folder>
                        </div>
                    ))}
                </div>)}
        </>
    )
}

export default Dashboard
