import {Client,HttpsClientOptions, RequestParamsLike} from 'jayson/promise'


const connectionOptions : HttpsClientOptions = {}
connectionOptions.host = '192.168.0.1'
connectionOptions.method = 'POST'
connectionOptions.path ='/api/jsonrpc'
connectionOptions.rejectUnauthorized= false

   



const _client : Client = Client.https(connectionOptions)
const loginInfo = { "user": "RVB",
"password": "RVB" }

const nullParam : RequestParamsLike =undefined

/**
 * 
GET /api/jsonrpc HTTP/1.1
Host: 192.168.0.1
Port: 80

GET /ClientArea/AlarmTable.mwsl?Start=1&End=50
Host: 192.168.0.1
Port:443

GET /ClientArea/AlarmDetail.mwsl
Host: 192.168.0.1
Port:443

 * 

POST /api/jsonrpc HTTP/1.1
Host: 192.168.0.1
Port: 80
Content-Type: application/json
Content-Length: 92

[{"jsonrpc":"2.0","method":"Api.Login","params":{"user":"RVB","pas
sword":"RVB"},"id":999}]
 */
const main = async ()=>{

 
let response = await _client.request('Api.Login',loginInfo)
connectionOptions.headers = {'X-Auth-Token':`${response.result.token}`}

const _client2 : Client = Client.https(connectionOptions)
let test = await _client2.request('PlcProgram.Read',{var:"\"dev\".modeDev"} )
let test3 = await _client2.request('Api.Browse',nullParam)
let test2 = await _client2.request('PlcProgram.Write',{var:"\"dev\".hwID" , value: 20} )
console.log(test)
console.log(test2)
console.log(test3)
    }
  

  main()