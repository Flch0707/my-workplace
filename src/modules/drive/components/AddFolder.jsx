import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal } from 'react-bootstrap'
import { FaFolderPlus } from 'react-icons/fa';
import { database } from '../../../../firebase'
import { useFolder } from '../hooks/useFolder';
import { AuthContext } from '../../../contexts/authContext'
import { ROOT_FOLDER } from '../../../constants/constants';
const AddFolder = ({ currentFolder }) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const { state: { currentUser } } = useContext(AuthContext)
    const { t } = useTranslation();
    const { addFolder, error, loading } = useFolder()
    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentFolder === null) return
        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id })
        }
        addFolder({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path
        })
        setName('')
        closeModal()
    }
    return (
        <>
            <Button
                onClick={openModal}
                variant='outline-success'
                className='btn-sm'
            >
                <FaFolderPlus style={{ height: '2rem', width: '2.5rem' }} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form>
                    <Modal.Body>
                        <Form.Label>{t("folder.name")}</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        ></Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant='secondary'
                            onClick={closeModal}>{t('global.close')}
                        </Button>
                        <Button
                            type='submit'
                            variant='success'
                            onClick={handleSubmit}>{t('global.ok')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddFolder
