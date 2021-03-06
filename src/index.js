/** @jsx h */
import { h, app } from 'hyperapp'
import { targetValue } from '@hyperapp/events'
import { Http } from 'hyperapp-fx'
import { getStateFromStorage, storeStateInStorage } from './utils/local-storage'
// import fetch from 'unfetch'
import './styles/sakura.scss'

const InitialState = {
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
        From town to town (get around round round I get around)
        I'm a real cool head (get around round round I get around)
        I'm makin' real good bread (get around round round I get around)`
    },
    fr: {
      phrase: 'Je me déplace',
      label: 'Choisir la langue',
      name: 'Français',
      lyrics: `Tout autour, je me déplace, oui
        (Se déplacer tout autour je me déplace, ooh-ooh) je me déplace
        De ville en ville (je me déplace)
        Je suis une vraie tête froide (je tourne autour de moi)
        Je fais du vrai bon pain (je me déplace)`
    }
  },
  language: 'en'
}

const translate = (state, str) => state.dict[state.language][str] || str

const AddLanguage = (state, response) => {
  console.log(response)
  return { ...state, ...{ dict: { ...state.dict, ...response } } }
}
//  dict: Object.assign({}, dict, { [key]: lang })

const FetchLanguage = (state, value) => [
  { ...state, language: value },
  Http({
    url: `./${value}.json`,
    response: 'json',
    action: AddLanguage
  })
]

const ChangeLanguage = (state, value) => {
  if (Object.keys(state.dict[value]).length > 1) {
    const newState = {
      ...state,
      language: value
    }
    storeStateInStorage(newState)
    return newState
  } else {
    return [FetchLanguage, value]
  }
}

const RadioButton = (props) => (
  <label
    for={props.name}
  >
    <input
      onClick={[ChangeLanguage, targetValue]}
      checked={props.checked}
      type='radio'
      id={props.name}
      name='language'
      value={props.lang}
    />
    {props.name} <small>{props.fetched ? 'local' : 'remote'}</small>
  </label>
)

const View = state => {
  const t = (str) => translate(state, str)
  return (
    <div>
      <h2>{t('phrase')}</h2>
      <p>{t('label')}</p>
      <div>
        {
          Object.keys(state.dict)
            .map(langCode => (
              <RadioButton
                key={langCode}
                checked={state.language === langCode}
                name={state.dict[langCode].name}
                fetched={Object.keys(state.dict[langCode]).length > 1}
                lang={langCode}
              />
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

const getInitialState = () => getStateFromStorage() || InitialState

app({
  init: getInitialState(),
  view: View,
  node: document.querySelector('#app')
})
