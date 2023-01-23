/**
 * Creates or edits a cookie with the name 
 * @param name Name of the cookie
 * @param value Value of the cookie
 * @param expiration expiration Date
 */
export const writeCookie = function (name: string, value: string[] | string | object, expirationAmount: number) {
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
export const readCookie = function (name: string): any | null {
    let result = document.cookie.match(new RegExp(name + "=([^;]+)"));
    if (!result) {
        return null
    }
    result = JSON.parse(result[1]);
    return result;
}

export const deleteCookie = function (name: string) {
    let host = window.location.host.toString().replace("www.", "")
    document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=." + host.startsWith("localhost") ? "localhost" : host;
}

export const deleteCookies = function (names: string[]) {
    for (let i = 0; i < names.length; i++) {
        deleteCookie(names[i])
        
    }
}
