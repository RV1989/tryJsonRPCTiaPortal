import { Client, HttpsClientOptions, RequestParamsLike } from 'jayson/promise'
import * as cheerio from 'cheerio'
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import https from 'https'


const connectionOptions: HttpsClientOptions = {}
connectionOptions.host = '192.168.0.1'
connectionOptions.method = 'POST'
connectionOptions.path = '/api/jsonrpc'
connectionOptions.rejectUnauthorized = false





const _client: Client = Client.https(connectionOptions)
const loginInfo = {
  "user": "RVB",
  "password": "RVB"
}

const nullParam: RequestParamsLike = undefined

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
const main = async () => {


  let response = await _client.request('Api.Login', loginInfo)
  connectionOptions.headers = { 'X-Auth-Token': `${response.result.token}` }

  const _client2: Client = Client.https(connectionOptions)
  let test = await _client2.request('PlcProgram.Read', { var: "\"dev\".modeDev" })
  let test3 = await _client2.request('Api.Browse', nullParam)
  let test2 = await _client2.request('PlcProgram.Write', { var: "\"dev\".hwID", value: 20 })

  const agent = new https.Agent({
    rejectUnauthorized: false,

  });

  let token = response.result.token
  let _headers = {
    'X-Auth-Token': token,

    Cookie: 'siemens_automation_language=en; siemens_ad_session=UA8tqanox0mC9Tvaj8+XHltExbzDcvUCSxnQuSsJjYzDoX/TAQABAA==; siemens_ad_secure_session=HrhqZesCNv0Ov0x6+T2sQ9RXD8OwNKoJoY0It7rd5V3DoX/TAQABAA==',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  }
  let html = await axios.get('https://192.168.0.1/ClientArea/AlarmTable.mwsl?Start=1&End=50', { httpsAgent: agent, headers: _headers })

  let test9 = html.data
  let $ = cheerio.load(html.data)
  $('tr[class =table_row]').each((i, element) => {
    let test55 = $(element).text().trim().split("\n")
    let test56 = test55.map((x) => {
      return x.trim()
    })
    console.log(test56)
  })

}


main()