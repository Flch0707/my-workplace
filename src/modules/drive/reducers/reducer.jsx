import { ACTION_TYPE } from '../actions/action'
const folderReducer = (state, { type, payload }) => {
    switch (type) {
        case ACTION_TYPE.selectFolder:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: []
            }
        case ACTION_TYPE.setChildFolders:
            return {
                ...state,
                childFolders: payload.childFolders
            }
        case ACTION_TYPE.updateFolder:
            return {
                ...state,
                folder: payload.folder
            }
        default:
            return state
    }
}
export { folderReducer }