import './style.scss'

const types = [
    "vanilla",
    "react",
    "vue"
]


const type = types.find(type => type === window.location.pathname.split("/")[1]) || "vanilla"

import(`./${type}/main.ts`)