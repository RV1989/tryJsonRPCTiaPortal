const jayson =require ('jayson/promise')
const connectionOptions = {}
connectionOptions.host = '192.168.0.1'
connectionOptions.method = 'POST'
connectionOptions.path ='/api/jsonrpc'
connectionOptions.rejectUnauthorized= false

   



const _client = jayson.Client.https(connectionOptions)
const loginInfo = { "user": "RVB",
"password": "RVB" }


const main = async ()=>{

 
    let response = await _client.request('Api.Login',loginInfo)
    connectionOptions.headers = {'X-Auth-Token':`${response.result.token}`}
    
    const _client2  = jayson.Client.https(connectionOptions)
    let test = await _client2.request('PlcProgram.Read',{var:"\"dev\".modeDev"} )
    let test3 = await _client2.request('Api.Ping')
    let test2 = await _client2.request('PlcProgram.Write',{var:"\"dev\".hwID" , value: 20} )
    console.log(test)
    console.log(test2)
    console.log(test3)
        }
      
    
      main()