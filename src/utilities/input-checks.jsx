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
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&£\-\\\/\{\}\[\]\(\)]{8,64}$/.test(pass)) return "Password must contain minimum eight characters (maximum 64), at each uppercase and lowercase letter and one number. Otherwise symbols used are unallowed."; // eslint-disable-line
    return true;
}

export const checkName = name => {
    if (!/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(name))
        return "You first (or last) name has prohibited letter.";
    return true;
}

export const checkPhone = phone => {
    if (!/(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/.test(phone))  // eslint-disable-line
        return "Your phone number has incorrect format.";
    return true;
}

export const checkCard = card => {
    //Visa, MasterCard, American Express, Diners Club, Discover, and JCB
    if (!/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(card))
        return "Card number is invalid.";
    return true;
}

export const checkCVV = cvv => {
    if (!/^[0-9]{3,4}$/.test(cvv))
        return "Card security number is invalid.";
    return true;
}