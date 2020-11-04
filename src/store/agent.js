import superagent from 'superagent'

export const yanjak = 'https://yanjak.gorontalokota.go.id'
export const rootYapay = `${yanjak}/yapay/public`
export const rootApi = `${rootYapay}/api`

const Requ = {
  get: url =>
    superagent.get(url),
  post: url =>
    superagent.post(url)
}

const Api = {
  checkNikKswp: () =>
    Requ.post(`${rootApi}/check-kswp`)
      .accept('application/json'),
  checkTunggakkan: () =>
    Requ.get(`${rootApi}/check-kswp-tung`)
      .accept('application/json'),
  callNik: () =>
    Requ.get(`${rootApi}/call-nik`)
      .accept('application/json'),
  callNikCap: () =>
    Requ.get(`${rootApi}/call-nik-cap`)
      .accept('application/json'),
  login: () =>
    Requ.post(`${rootApi}/login-kswp`)
      .accept('application/json')
}

export default {
  Api
}
