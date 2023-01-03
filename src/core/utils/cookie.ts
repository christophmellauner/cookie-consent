/**
 * Creates or edits a cookie with the name 
 * @param name Name of the cookie
 * @param value Value of the cookie
 * @param expiration expiration Date
 */
export const writeCookie = function (name: string, value: string[] | string, expirationAmount: number) {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + expirationAmount)

    const cookie = name + "=" + JSON.stringify(value) + "; path=/;" + "; expires=" + expiration.toUTCString();
    document.cookie = cookie;
}

/**
 * 
 * @param name 
 * @returns 
 */
export const readCookie = function (name: string) {
    let result = document.cookie.match(new RegExp(name + "=([^;]+)"));
    result && (result = JSON.parse(result[1]));
    return result;
}

export const deleteCookie = function (name: string) {
    document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=." + window.location.host.toString().replace("www.", "");
}
