import Cookies from "js-cookie";
import { accessTokenCookieName, refreshTokenCookieName } from "../constants/CookiesNames";

const Api_url = 'http://127.0.0.1:3000/api';


const DataFetcher = async ({ method, path, body,absolute }) => {
  let url = ''
  if(absolute){
    url=path
  }else{
    url = Api_url + path;
  }
  
  const accessToken = Cookies.get(accessTokenCookieName)
  const refreshToken = Cookies.get(refreshTokenCookieName)
  const headers = {
    'Content-Type': 'application/json'
  };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  let requestOptions = {
    method: method,
    headers: headers,
  };
  if (body)
    requestOptions.body = JSON.stringify(body)

  try {
    let response = await fetch(url, requestOptions);
    let json = await response.json();
    if (response.status == '403' && json.error == 'accessToken expired') {
      console.log(refreshToken);
      response = await fetch(Api_url + '/users/getnewtoken', { method: 'POST', headers, body: JSON.stringify({ refreshToken }) })
      json = await response.json();
      if (json.error == 'refreshToken expired') {
        Cookies.remove(accessTokenCookieName)
        Cookies.remove(refreshTokenCookieName)
        throw new Error("disconnected");
      }
      if (json.accessToken) {
        console.log('refresh');
        Cookies.set(accessTokenCookieName, json.accessToken)
        requestOptions.headers.Authorization = `Bearer ${json.accessToken}`
        response = await fetch(url, requestOptions)
        json = await response.json();
      }

    }
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return null
  }

};

export default DataFetcher;