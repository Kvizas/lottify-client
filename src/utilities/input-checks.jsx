export const checkUsername = username => {
    if (!/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(username)) return "Username can only contain letters, numbers, underscore, hyphen. It has to start & end with letter or number.";
    if (username.length < 4 || username.length > 32) return "Username has to be between 4 and 32 characters long."
    return true;
}

export const checkEmail = email => {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return "Email format is incorrect";
    return true;
}

export const checkPassword = pass => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,64}$/.test(pass)) return "Password must contain minimum eight characters (maximum 64), at least one uppercase letter, one lowercase letter and one number";
    return true;
}