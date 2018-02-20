import {h, app} from 'hyperapp'
import {getStateFromStorage, storeStateInStorage} from './utils/local-storage'
import fetch from 'unfetch'
import './styles/sakura.scss'
/** @jsx h */

const state = getStateFromStorage() || {
  dict: {
    no: {
      name: 'Norsk'
    },
    en: {
      phrase: 'I get around',
      label: 'Select language',
      name: 'English',
      lyrics: `Round round get around, I get around, yeah
        (Get around round round I get around, ooh-ooh) I get around
        Fom town to town (get around round round I get around)
        I'm a real cool head (get around round round I get around)
        I'm makin' real good bread (get around round round I get around)`
    },
    fr: {
      phrase: `Je me déplace`,
      label: 'Choisir la langue',
      name: 'Français',
      lyrics: `Tour rond autour, je me déplace, oui
        (Tourne autour de moi, je me déplace, ooh-ooh) Je me déplace
        Fom ville à la ville (se déplacer autour de ronde je me déplace)
        Je suis une vraie tête froide (contourne-toi autour de moi)
        Je fais du bon pain (fais le tour du rond)`
    }
  },
  language: 'en'
}

const translate = (state, str) => state.dict[state.language][str] || str

const actions = {
  addLanguage: ([key, lang]) => ({ dict }) => ({
    dict: Object.assign({}, dict, { [key]: lang })
  }),
  set: x => x,
  storeState: () => (state, actions) => {
    storeStateInStorage(state)
  },
  changeLanguage: (e) => (state, actions) => {
    let langKey = e.target.value
    if (Object.keys(state.dict[langKey]).length > 1) {
      actions.set({
        language: langKey
      })
      actions.storeState()
    } else {
      fetch(`./${langKey}.json`)
        .then(function (response) {
          return response.json()
        })
        .then(function (lang) {
          actions.set({
            dict: Object.assign({}, state.dict, lang),
            language: langKey
          })
          actions.storeState()
        })
    }
  }
}

const RadioButton = (props) => (
  <label
    for={props.name}>
    <input
      onclick={props.changelang}
      checked={props.checked}
      type='radio'
      id={props.name}
      name='language'
      value={props.lang} />
    {props.name}
  </label>
)

const view = (state, actions) => {
  let t = (str) => translate(state, str)
  return (<div>
    <h2>{t('phrase')}</h2>
    <p>{t('label')}</p>
    <div>
      {
        Object.keys(state.dict)
          .map(key => (
            <RadioButton
              changelang={e => actions.changeLanguage(e)}
              checked={state.language === key}
              name={state.dict[key].name}
              lang={key} />
          ))
      }
    </div>
    <p>{t('lyrics')}</p>
    <pre>
      <code>
        {JSON.stringify(state, null, 2)}
      </code>
    </pre>
  </div>)
}
app(state, actions, view, document.body)
