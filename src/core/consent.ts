import { ConsentConfig, ConsentCookieCategory } from "./config"
import { deleteCookie, deleteCookies, readCookie, writeCookie } from "./utils/cookie";


export class Consent {
    cookieName: string = "CookieConsent_V0.1"
    element?: any;
    acceptedCategories: ConsentCookieCategory[] = [];
    config: ConsentConfig;


    acceptedEvent?: CustomEvent;
    allAcceptedEvent?: CustomEvent;
    allDeniedEvent?: CustomEvent;

    constructor(elementName: string, config: ConsentConfig) {
        this.config = config

        
        document.addEventListener("DOMContentLoaded", () => {
            this.element = document.querySelector(elementName)
            this.filterAcceptedCookieCategories()
            this.initEvents()
        })
    }

    filterAcceptedCookieCategories() {

        this.config.possibleCookies.forEach(category => {
            if (readCookie(this.cookieName + "_" + category.name)) {
                this.accept(category)
            } else {
                this.deny(category)
            }
        })
        
    }
    updateCookie(){
    }
    
    initEvents() {
        this.allAcceptedEvent = new CustomEvent("ConsentAcceptedAll")
        this.allDeniedEvent = new CustomEvent("ConsentAllDenied")
    }

    acceptAll() {
        this.element?.dispatchEvent(this.allAcceptedEvent)

        this.config.possibleCookies.forEach(category => {
            this.accept(category)
        })
    }
    denyAll() {
        this.element?.dispatchEvent(this.allDeniedEvent)

        this.config.possibleCookies.forEach(category => {
            this.deny(category)
        })
    }

    getStatus(category: ConsentCookieCategory): boolean | null {
        return readCookie(category.name)?.accepted
    }

    accept(category: ConsentCookieCategory) {
        const index = this.acceptedCategories.findIndex(acceptedCategory => acceptedCategory.name === category.name) 
        if (index < 0) {
            this.acceptedCategories.push(category)
        } else {
            this.acceptedCategories.splice(index, 1, category)
        }

        writeCookie(this.cookieName + "_" + category.name, {accepted: true}, this.config.cookie.expirationAmount);


        const event = new CustomEvent("ConsentAccepted", {
            detail: category.name
        })

        this.element?.dispatchEvent(event)
    }

    deny(category: ConsentCookieCategory) {
        const index = this.acceptedCategories.findIndex(acceptedCategory => acceptedCategory.name === category.name) 
        if (index > -1) {
            this.acceptedCategories.splice(index, 1)
        }

        console.log(category)
        deleteCookie(this.cookieName + "_" + category.name);

        category.cookiesToBlock.forEach(cookie => {
            deleteCookies(cookie.identifiers)
        })
        const event = new CustomEvent("ConsentDenied", {
            detail: category.name
        })
        this.element?.dispatchEvent(event)
    }
}