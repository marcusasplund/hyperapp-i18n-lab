import {h, app} from 'hyperapp'
import {getStateFromStorage, storeStateInStorage} from './utils/local-storage'
import fetch from 'unfetch'
import './styles/sakura.scss'
/** @jsx h */

const state = getStateFromStorage() || {
  dict: {
    en: {
      phrase: 'Never Gonna Give You Up',
      label: 'Select language',
      french: 'French',
      english: 'English',
      norwegian: 'Norwegian'
    },
    fr: {
      phrase: `Je ne t'abandonnerai jamais`,
      label: 'Choisir la langue',
      french: 'Français',
      english: 'Anglais',
      norwegian: 'Norvégien'
    }
  },
  language: 'en'
}

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
    if (state.dict[langKey]) {
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

const view = (state, actions) => (
  <div>
    <h2>{state.dict[state.language].phrase}</h2>
    <form>
      <p>{state.dict[state.language].label}</p>
      <div>
        <label
          for='french'>
          <input
            onclick={e => actions.changeLanguage(e)}
            checked={state.language === 'fr'}
            type='radio'
            id='french'
            name='language'
            value='fr' />
          {state.dict[state.language].french}
        </label>
        <label
          for='english'>
          <input
            onclick={e => actions.changeLanguage(e)}
            checked={state.language === 'en'}
            type='radio'
            id='english'
            name='language'
            value='en' />
          {state.dict[state.language].english}
        </label>
        <label
          for='norwegian'>
          <input
            onclick={e => actions.changeLanguage(e)}
            checked={state.language === 'no'}
            type='radio'
            id='norwegian'
            name='language'
            value='no' />
          {state.dict[state.language].norwegian} (loads from remote src)
        </label>
      </div>
    </form>
    <pre>
      <code>
        {JSON.stringify(state, null, 2)}
      </code>
    </pre>
  </div>
)

app(state, actions, view, document.body)
