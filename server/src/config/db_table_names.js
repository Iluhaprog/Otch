module.exports = {
    CHATS: process.env.NODE_ENV === 'production' ? 'chats' : 'Chats',
    FILES: process.env.NODE_ENV === 'production' ? 'files' : 'Files',
    MESSAGES: process.env.NODE_ENV === 'production' ? 'messages' : 'Messages',
    NOTIFICATIONS: process.env.NODE_ENV === 'production' ? 'notifications' : 'Notifications',
    ROLES: process.env.NODE_ENV === 'production' ? 'roles' : 'Roles',
    USERS: process.env.NODE_ENV === 'production' ? 'users' : 'Users',
    USERS_CHATS: process.env.NODE_ENV === 'production' ? 'users_chats' : 'Users_Chats',
    VERIFICATION_CODES: process.env.NODE_ENV === 'production' ? 'verificationcodes' : 'VerificationCodes',
};