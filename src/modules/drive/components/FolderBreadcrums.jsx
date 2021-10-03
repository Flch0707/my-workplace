import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { ROOT_FOLDER, ROUTEPATH } from '../../../constants/constants'
import { Link } from 'react-router-dom'
const FolderBreadcrums = ({ currentFolder }) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) {
        path = [...path, ...currentFolder.path]
    }
    return (
        <Breadcrumb
            listProps={{ className: 'bg-white pl-0 m-0' }}
            className='flex-grow-1'>
            {currentFolder && path.map((folder, index) =>
            (
                <Breadcrumb.Item
                    key={folder.id}
                    linkAs={Link}
                    linkProps={{
                        to: {
                            pathname: folder.id ? ROUTEPATH.folder + folder.id : ROUTEPATH.dashboard,
                            state: { folder: { ...folder, path: path.slice(1, index) } }
                        }
                    }}
                    style={{ maxWidth: '150px' }}
                    className='text-truncate d-inline-block'>
                    {folder.name}
                </Breadcrumb.Item>
            )
            )}
            {
                currentFolder && (
                    <Breadcrumb.Item
                        style={{ maxWidth: '200px' }}
                        active
                        className='text-truncate d-inline-block'>
                        {currentFolder.name}
                    </Breadcrumb.Item>
                )}
        </Breadcrumb>
    )
}

export default FolderBreadcrums
