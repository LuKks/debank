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
  id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85'
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
```js
const chain = await debank.chain({ id })
const list = await debank.chain.list()
```

#### Protocol
```js
const protocol = await debank.protocol({ id: 'compound' })
const list = await debank.protocol.list({ chain_id: 'eth' })
const all = await debank.protocol.all_list({ chain_ids: ['eth', 'bsc'] })
```

#### Token
```js
const token = await debank.token({ chain_id: 'eth', id: '<token>' })
const list = await debank.token.list_by_ids({ chain_id: 'eth', ids: ['<token1>', '<token2>'] })
const holders = await debank.token.top_holders({ chain_id: 'celo', id: 'celo', start: 2, limit: 1 })
```

#### User
```js
const used = await debank.user.used_chain_list({ id: '<user>' })
const balance = await debank.user.chain_balance({ chain_id: 'eth', id: '<user>' })

const protocol = await debank.user.protocol({ protocol_id: 'bsc_pancakeswap', id: '<user>' })
const list = await debank.user.complex_protocol_list({ chain_id: 'eth', id: '<user>' })
const all = await debank.user.all_complex_protocol_list({ chain_ids: ['eth', 'bsc'], id: '<user>' })
const simpleList = await debank.user.simple_protocol_list({ chain_id: 'eth', id: '<user>' })
const simpleAll = await debank.user.all_simple_protocol_list({ chain_ids: ['eth', 'bsc'], id: '<user>' })

const token = await debank.user.token({ chain_id: 'eth', id: '<user>', token_id: '<token>' })
const list = await debank.user.token_list({ chain_id: 'eth', id: '<user>', is_all: true })
const all = await debank.user.all_token_list({ id: '<user>', is_all: true })

const nfts = await debank.user.nft_list({ chain_id: 'eth', id: '<user>', is_all: true })
const allNfts = await debank.user.all_nft_list({ chain_ids: ['eth', 'bsc'], id: '<user>', is_all: true })

const history = await debank.user.history_list({ chain_id: 'eth', id: '<user>' })
const history = await debank.user.history_list({ chain_id: 'eth', id: '<user>', token_id: '<token>', page_count: 20 })
const allHistory = await debank.user.all_history_list({ chain_ids: ['eth', 'bsc'], id: '<user>' })
const allHistory = await debank.user.all_history_list({ chain_ids: ['eth', 'bsc'], id: '<user>', token_id: '<token>', page_count: 20 })

const authorizedList = await debank.user.token_authorized_list({ chain_id: 'eth', id: '<user>' })
const authorizedList = await debank.user.nft_authorized_list({ chain_id: 'eth', id: '<user>' })

const balance = await debank.user.total_balance({ id: '<user>' })

const curve = await debank.user.chain_net_curve({ chain_id: 'eth', id: '<user>' })
const totalCurve = await debank.user.total_net_curve({ chain_ids: ['eth', 'bsc'], id: '<user>' })
```

#### Collection
```js
const list = await debank.collection.nft_list({ id: '<user>', chain_id: 'eth', start: 1000, limit: 1 })`
```

#### Wallet
```js
const gas = await debank.wallet.gas_market({ chain_id: 'eth' })
const exec = await debank.wallet.pre_exec_tx({ tx: { chainId, from, to, value, data, gas, maxFeePerGas, maxPriorityFeePerGas, nonce }, pending_tx_list })
const explain = await debank.wallet.explain_tx({ tx: { chainId, from, to, value, data, gas, maxFeePerGas, maxPriorityFeePerGas, nonce } })
```

## License
MIT
