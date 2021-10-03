const ACTION_TYPE = {
    selectFolder: 'selectFolder',
    setChildFolders: 'setChildFolders',
    updateFolder: 'updateFolder'
}

const ACTION = {
    selectFolder: (folderId, folder) => {
        return { type: ACTION_TYPE.selectFolder, payload: { folderId, folder } }
    },
    setChildFolders: (childFolders) => {
        return { type: ACTION_TYPE.setChildFolders, payload: childFolders }
    },
    updateFolder: (folder) => {
        return { type: ACTION_TYPE.updateFolder, payload: folder }
    }
}
export { ACTION, ACTION_TYPE }