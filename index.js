const fetch = require('like-fetch')

const API_DEBANK = 'https://pro-openapi.debank.com/v1'

class Debank {
  constructor (accessKey, opts = {}) {
    this.accessKey = accessKey

    this.chain = Chain.call(this)
    this.protocol = Protocol.call(this)
    this.token = Token.call(this)
    this.user = User.call(this)
    this.collection = Collection.call(this)
    this.wallet = Wallet.call(this)

    this.fetchOptions = {
      timeout: opts.timeout || 60000,
      // responseType: 'json',
      // validateStatus: 200,
      headers: {
        AccessKey: accessKey
      },
      agent: opts.agent
    }
  }

  async api (uri, { method, requestType, params, body } = {}) {
    const url = API_DEBANK + uri + (params ? parseQueryParams(params) : '')
    const options = Object.assign(this.fetchOptions, { method, requestType, body })

    const response = await fetch(url, options)
    if (response.status !== 200) throw this.error(response.status)

    const data = await response.json()
    return data
  }

  error (status) {
    if (status === 400) return new DebankError('Invalid params or body', 'INVALID_PARAMS')
    if (status === 401) return new DebankError('You must authenticate your request with an access key', 'INVALID_ACCESS_KEY')
    if (status === 403) return new DebankError('You have hit your capacity limit', 'CAPACITY_LIMIT')
    if (status === 429) return new DebankError('You have exceeded our ratelimit for API', 'RATE_LIMIT')
    if (status === 500) return new DebankError('We are unable to process your request right now', 'INTERNAL_SERVER_ERROR')
    return new DebankError('Unknown response status: ' + status, 'UNKNOWN_STATUS')
  }
}

function Chain () {
  const chain = (params) => this.api('/chain', { params })
  chain.list = () => this.api('/chain/list')

  return chain
}

function Protocol () {
  const protocol = (params) => this.api('/protocol', { params })
  protocol.list = (params) => this.api('/protocol/list', { params })
  protocol.all_list = (params) => this.api('/protocol/all_list', { params })

  return protocol
}

function Token () {
  const token = (params) => this.api('/token', { params })
  token.list_by_ids = (params) => this.api('/token/list_by_ids', { params })
  token.top_holders = (params) => this.api('/token/top_holders', { params })

  return token
}

function User () {
  const user = () => { throw new Error('API does not exists') }
  user.used_chain_list = (params) => this.api('/user/used_chain_list', { params })
  user.chain_balance = (params) => this.api('/user/chain_balance', { params })
  user.protocol = (params) => this.api('/user/protocol', { params })
  user.complex_protocol_list = (params) => this.api('/user/complex_protocol_list', { params })
  user.all_complex_protocol_list = (params) => this.api('/user/all_complex_protocol_list', { params })
  user.simple_protocol_list = (params) => this.api('/user/simple_protocol_list', { params })
  user.all_simple_protocol_list = (params) => this.api('/user/all_simple_protocol_list', { params })
  user.token = (params) => this.api('/user/token', { params })
  user.token_list = (params) => this.api('/user/token_list', { params })
  user.all_token_list = (params) => this.api('/user/all_token_list', { params })
  user.nft_list = (params) => this.api('/user/nft_list', { params })
  user.all_nft_list = (params) => this.api('/user/all_nft_list', { params })
  user.history_list = (params) => this.api('/user/history_list', { params })
  user.all_history_list = (params) => this.api('/user/all_history_list', { params })
  user.token_authorized_list = (params) => this.api('/user/token_authorized_list', { params })
  user.nft_authorized_list = (params) => this.api('/user/nft_authorized_list', { params })
  user.total_balance = (params) => this.api('/user/total_balance', { params })
  user.chain_net_curve = (params) => this.api('/user/chain_net_curve', { params })
  user.total_net_curve = (params) => this.api('/user/total_net_curve', { params })

  return user
}

function Collection () {
  const collection = () => { throw new Error('API does not exists') }
  collection.nft_list = (params) => this.api('/collection/nft_list', { params })

  return collection
}

function Wallet () {
  const wallet = () => { throw new Error('API does not exists') }
  wallet.gas_market = (params) => this.api('/wallet/gas_market', { params })
  wallet.pre_exec_tx = (body) => this.api('/wallet/pre_exec_tx', { method: 'POST', requestType: 'json', body })
  wallet.explain_tx = (body) => this.api('/wallet/explain_tx', { method: 'POST', requestType: 'json', body })

  return wallet
}

function parseQueryParams (query) {
  if (query && typeof query === 'object') {
    for (const key in query) {
      const value = query[key]

      if (Array.isArray(value)) {
        query[key] = query[key].join(',')
      }
    }
  }

  const qs = new URLSearchParams(query)
  if (!qs) return ''

  return '?' + qs
}

class DebankError extends Error {
  constructor (msg, code) {
    super(code + ': ' + msg)
    this.code = code
  }

  get name () {
    return 'DebankError'
  }
}

module.exports = Debank
