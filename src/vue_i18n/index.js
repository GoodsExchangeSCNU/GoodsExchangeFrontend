import {createI18n} from 'vue-i18n'
import home_en from './home/en.json' assert {type: "json"}
import home_zh from './home/zh.json' assert {type: "json"}
import login_en from './login/en.json' assert {type: "json"}
import login_zh from './login/zh.json' assert {type: "json"}
import other_en from './other/en.json' assert {type: "json"}
import other_zh from './other/zh.json' assert {type: "json"}

const messages = {
    en: {
        home: home_en,
        login: login_en,
        other: other_en,
    },
    zh: {
        home: home_zh,
        login: login_zh,
        other: other_zh,
    }
}

const i18n = createI18n({
    locale: 'en', // 使用的语言，这里默认为zh中文
    legacy: false,
    messages,
})

export default i18n