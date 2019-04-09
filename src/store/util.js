import createRequest  from 'create-request-api'

const CODE_NOT_LOGIN = '1002'

export async function get(path, params) {
  const { code, message, data } = await createRequest.get(path, params)
  if (code === '0000') return data
  if (code === CODE_NOT_LOGIN) return redirectToLoginPage()
  return Promise.reject(code + ' - ' + message)
}

export async function post(path, params) {
  const { code, message, data } = await createRequest.post(path, params)
  if (code === '0000') return data
  if (code === CODE_NOT_LOGIN) {
    redirectToLoginPage()
  }
  return Promise.reject(code + ' - ' + message)
}

function redirectToLoginPage() {
  if (window.confirm('未登录或登录态失效，是否前往登录认证？')) {
    location.reload()
  }
  return null
}