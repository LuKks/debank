# debank

API for [cloud.debank.com](https://cloud.debank.com)

```
npm i debank
```

## Usage
```javascript
const Debank = require('debank')

const debank = new Debank('<access key>')

const used = await debank.user.used_chain_list({
  id: '0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5'
})
console.log(used)
```

## API

#### `const debank = new Debank(accessKey, [options])`

Available `options`:
```js
{
  timeout: 60000,
  agent: null
}
```

For example:
```javascript
const { SocksProxyAgent } = require('socks-proxy-agent')

const debank = new Debank('<access key>', {
  agent: new SocksProxyAgent('socks://127.0.0.1:1080')
})
```

#### Requests
API reference is here: https://docs.open.debank.com/en/reference/api-pro-reference

Let's take `Get top holders of token` as an example:
```sh
GET /v1/token/top_holders/?{chain_id,id,start,limit}
```

The equivalent JavaScript call is like so:
```js
const holders = await debank.token.top_holders({ chain_id, id, start, limit })
```

#### Errors
If Debank fails, then based on the status code it throws an error code:
- 400 `INVALID_PARAMS`
- 401 `INVALID_ACCESS_KEY`
- 403 `CAPACITY_LIMIT`
- 429 `RATE_LIMIT`
- 500 `INTERNAL_SERVER_ERROR`
- Or `UNKNOWN_STATUS`

For example:
```js
const debank = new Debank('wrong-access-key')

try {
  await debank.chain.list()
} catch (error) {
  console.log(error.name) // => 'DebankError'
  console.log(error.code) // => 'INVALID_ACCESS_KEY'
  console.log(error.message) // => 'You must authenticate your request with an access key'
}
```

#### Chain
#### `const chain = await debank.chain({ id })`
#### `const list = await debank.chain.list()`

#### Protocol
#### `const protocol = await debank.protocol({ id: 'compound' }))`
#### `const list = await debank.protocol.list({ chain_id: 'eth' }))`
#### `const all = await debank.protocol.all_list({ chain_ids: ['eth', 'bsc'] }))`

#### Token
#### `const token = await debank.token({ chain_id: 'eth', id: '0xdac17f958d2ee523a2206206994597c13d831ec7' }))`
#### `const list = await debank.token.list_by_ids({ chain_id: 'eth', ids: ['0xdac17f958d2ee523a2206206994597c13d831ec7', '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'] }))`
#### `const holders = await debank.token.top_holders({ chain_id: 'celo', id: 'celo', start: 2, limit: 1 }))`

#### User
#### `const used = await debank.user.used_chain_list({ id: '0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5' }))`
#### `const balance = await debank.user.chain_balance({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const protocol = await debank.user.protocol({ protocol_id: 'bsc_pancakeswap', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const list = await debank.user.complex_protocol_list({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const all = await debank.user.all_complex_protocol_list({ chain_ids: ['eth', 'bsc'], id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const simpleList = await debank.user.simple_protocol_list({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const simpleAll = await debank.user.all_simple_protocol_list({ chain_ids: ['eth', 'bsc'], id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const token = await debank.user.token({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85', token_id: '0xdac17f958d2ee523a2206206994597c13d831ec7' }))`
#### `const list = await debank.user.token_list({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85', is_all: true }))`
#### `const all = await debank.user.all_token_list({ id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85', is_all: true }))`
#### `const nfts = await debank.user.nft_list({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85', is_all: true }))`
#### `const allNfts = await debank.user.all_nft_list({ chain_ids: ['eth', 'bsc'], id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85', is_all: true }))`
#### `const history = await debank.user.history_list({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const history = await debank.user.history_list({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85', token_id: '0xdac17f958d2ee523a2206206994597c13d831ec7', page_count: 20 }))`
#### `const allHistory = await debank.user.all_history_list({ chain_ids: ['eth', 'bsc'], id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const allHistory = await debank.user.all_history_list({ chain_ids: ['eth', 'bsc'], id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85', token_id: '0xdac17f958d2ee523a2206206994597c13d831ec7', page_count: 20 }))`
#### `const authorizedList = await debank.user.token_authorized_list({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const authorizedList = await debank.user.nft_authorized_list({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const balance = await debank.user.total_balance({ id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const curve = await debank.user.chain_net_curve({ chain_id: 'eth', id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`
#### `const totalCurve = await debank.user.total_net_curve({ chain_ids: ['eth', 'bsc'], id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85' }))`

#### Collection
#### `const list = await debank.collection.nft_list({ id: '0x495f947276749ce646f68ac8c248420045cb7b5e', chain_id: 'eth', start: 1000, limit: 1 })`

#### Wallet
#### `const gas = await debank.wallet.gas_market({ chain_id: 'eth' })`
#### `const exec = await debank.wallet.pre_exec_tx({ tx: { chainId, from, to, value, data, gas, maxFeePerGas, maxPriorityFeePerGas, nonce }, pending_tx_list })`
#### `const explain = await debank.wallet.explain_tx({ tx: { chainId, from, to, value, data, gas, maxFeePerGas, maxPriorityFeePerGas, nonce } })`

## License
MIT
