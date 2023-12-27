const ROLES = {
    ADMIN: "Admin",
    USER:"User"
};
const STATUS = {
    ENABLE: "Enable",
    DISABLE: "Disable",
    DELETED: "Deleted",
};
const TOKEN_TYPE = {
    ACCESS_TOKEN: 1,
    REFRESH_TOKEN: 2,
    VERIFICATION_TOKEN: 3,
    RESET_PASSWORD: 4,
};

module.exports = {
    ROLES,
    TOKEN_TYPE,
    STATUS
};
