const ROUTEPATH = {
    dashboard: '/',
    login: '/login',
    folder: '/folder/',
    folderId: '/folder/:folderId',
    signUp: '/signup',
    resetPassword: '/reset-password',
    updateProfile: '/update-profile'
}

const LANGUAGE = [
    { countryCode: 'fr', languageCode: 'fr' },
    { countryCode: 'gb', languageCode: 'en' },
]

const AUTHTYPE = {
    email: "email",
    googleAuth: "googleAuth"
}

const MESSAGE = {
    passwordResetSuccess: 'Password reset successfully',
    profileUpdateSuccess: 'Profile updated successfully'
}

const DEFAULT_USER_PHOTO_URL = 'https://firebasestorage.googleapis.com/v0/b/my-workspace-dev-ab3a6.appspot.com/o/default_user_ico.png?alt=media&token=99a989b7-1ce1-4023-b102-f1d1ddebe7e9'

//DRIVE
const ROOT_FOLDER = { name: 'Root', id: null, path: [] }
export { ROUTEPATH, AUTHTYPE, MESSAGE, DEFAULT_USER_PHOTO_URL, LANGUAGE, ROOT_FOLDER }