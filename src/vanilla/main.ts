import { Consent } from '../core/consent'
import BasicConfig from '../testconfigs/basic.json'

window.consent = new Consent("cookieconsent", BasicConfig)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="cookieconsent" class="cookieconsent cookieconsent__position--right">
        <div class="cookieconsent__container">
            <form id="cookieconsent__form">
                <div class="cookieconsent__form__categories">
                
                </div>
                <div class="cookieconsent__form__buttons">
                    <button>
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
`


const categories = BasicConfig.possibleCookies.map(category => {
    const categoryStatus = window.consent.getStatus(category)
    return `
        <div class="cookieconsent__form__category">
            <div class="cookieconsent__form__category__heading">
                ${category.name}
                <div class="cookieconsent__form__category__switch">
                    <input name="category_${category.name}" type="checkbox" ${category.required ? 'checked="true" disabled' : (categoryStatus ? 'checked="true"': '')} />
                </div>
            </div>
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
    BasicConfig.possibleCookies.forEach(category => {
        const checkbox = formElement!.elements.namedItem("category_" + category.name) as HTMLInputElement
        console.log(checkbox.checked)
        if (checkbox && checkbox.checked) {
            window.consent.accept(category)
        } else {
            window.consent.deny(category)
        }

    })
})