export const mockProviderDids = {
    aquafinance_capital: {
      get uri() {
        return 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y'
      },
      get name() {
        return 'AquaFinance Capital'
        },
        get offertypes() {
          return ['GHS to USDC','NGN to KES','KES to USD','USD to KES']  
      }
    },
    flowback_financial: {
      get uri() {
        return 'did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy'
      },
      get name() {
        return 'Flowback Financial'
        }, 
    get offertypes() {
            return ['USD to EUR','EUR to USD','USD to GBP','USD to BTC']  
        }
    },
     }