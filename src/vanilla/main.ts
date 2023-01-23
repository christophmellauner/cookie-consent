import { Consent } from '../core/consent'
import config from '../testconfigs/basic.json'

window.consent = new Consent(config)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="cookieconsent" class="cookieconsent cookieconsent__position--right">
        <div class="cookieconsent__container">
            <div class="cookieconsent__header">
                <h3>${config.general.headline}</h3>
                <p>${config.general.description}</p>
            </div>
            <form id="cookieconsent__form">
                <div class="cookieconsent__form__categories">
                
                </div>
                <div class="cookieconsent__form__buttons">
                    <button>
                        Speichern
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
`


const categories = config.possibleCookies.map(category => {
    const categoryStatus = window.consent.getStatus(category)
    return `
        <div class="cookieconsent__form__category">
            <label class="cookieconsent__form__category__heading">
                ${category.name}
                <div class="cookieconsent__form__category__switch">
                    <input name="category_${category.id}" type="checkbox" ${category.required ? 'checked="true" disabled' : (categoryStatus ? 'checked="true"': '')} />
                </div>
            </label>
            <div class="cookieconsent__form__category__details">
                ${category.description}
            </div>
        </div>
    `
})

document.querySelector<HTMLDivElement>('.cookieconsent__form__categories')!.innerHTML = categories.join("");



const formElement = document.querySelector<HTMLFormElement>('#cookieconsent__form')
formElement?.addEventListener("submit", function (e: Event) {
    e.preventDefault();
    e.stopPropagation();
    config.possibleCookies.forEach(category => {
        const checkbox = formElement!.elements.namedItem("category_" + category.id) as HTMLInputElement
        console.log(checkbox.checked)
        if (checkbox && checkbox.checked) {
            window.consent.accept(category)
        } else {
            window.consent.deny(category)
        }

    })
})