export interface ConsentCookie {
    name: string;
    identifier: string;
    expiration: number;
}

export interface ConsentCookieCategory {
    name: string;
    description?: string;
    cookiesToBlock: ConsentCookie[];
    required: boolean;
    
}

export interface ConsentConfig {
    cookie: {
        domain: string;
        expirationAmount: number;
    }
    possibleCookies: ConsentCookieCategory[];

}