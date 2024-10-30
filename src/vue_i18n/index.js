import {createI18n} from 'vue-i18n'
import home_en from './home/en.json' assert {type: "json"}
import home_zh from './home/zh.json' assert {type: "json"}
import login_en from './login/en.json' assert {type: "json"}
import login_zh from './login/zh.json' assert {type: "json"}
import other_en from './other/en.json' assert {type: "json"}
import other_zh from './other/zh.json' assert {type: "json"}
import navigator_en from './navigator/en.json' assert {type: "json"}
import navigator_zh from './navigator/zh.json' assert {type: "json"}
import axios_client_en from './axios_client/en.json' assert {type: "json"}
import axios_client_zh from './axios_client/zh.json' assert {type: "json"}
import profile_en from './profile/en.json' assert {type: "json"}
import profile_zh from './profile/zh.json' assert {type: "json"}
import saleInfo_en from './saleInfo/en.json' assert {type: "json"}
import saleInfo_zh from './saleInfo/zh.json' assert {type: "json"}

const messages = {
    en: {
        home: home_en,
        login: login_en,
        other: other_en,
        navigator: navigator_en,
        axios_client: axios_client_en,
        profile: profile_en,
        saleInfo: saleInfo_en
    },
    zh: {
        home: home_zh,
        login: login_zh,
        other: other_zh,
        navigator: navigator_zh,
        axios_client: axios_client_zh,
        profile: profile_zh,
        saleInfo: saleInfo_zh
    }
}

const i18n = createI18n({
    locale: 'en', // 使用的语言，这里默认为en英文
    legacy: false,
    messages,
})

export default i18n