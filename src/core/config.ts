export interface ConsentCookie {
    name: string;
    identifiers: string[];
    expiration: number;
}

export interface ConsentCookieCategory {
    id: string;
    name: string;
    description?: string;
    cookiesToBlock: ConsentCookie[];
    required: boolean;
    
}

export interface ConsentConfig {
    general: {
        headline: string;
        description: string;
    }
    cookie: {
        domain: string;
        expirationAmount: number;
    }
    possibleCookies: ConsentCookieCategory[];

}