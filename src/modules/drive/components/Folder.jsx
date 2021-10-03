import React from 'react'
import { Button } from 'react-bootstrap'
import { FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTEPATH } from '../../../constants/constants';
const Folder = ({ folder }) => {
    return (
        <Button
            className='text-truncate w-100'
            variant='outline-dark'
            as={Link}
            to={{
                pathname: ROUTEPATH.folder + folder.id,
                state: { folder: folder }
            }}>
            <FaFolder
                style={{ marginRight: '5px' }} />
            {folder.name}
        </Button>
    )
}

export default Folder

