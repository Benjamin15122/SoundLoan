import json
import uuid
import requests
import base64
import http.client
from config import Config


def get_access_refresh_tokens(auth_code):
    authorization_origin = Config.client_id + ":" + Config.client_secret
    authorization = "Basic " + str(base64.b64encode(authorization_origin.encode('utf-8')), 'utf-8')

    headers = {
        'authorization': authorization,
        'content-type': 'application/x-www-form-urlencoded',
        'accept': "application/json"
    }

    payload = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'redirect_uri': "http://47.103.113.144:6006/CitiAuthCodeRedirect"
    }

    r = requests.post("https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/token/hk/gcb",
                      data=payload,
                      headers=headers)
    access_token = json.loads(str(r.text))['access_token']
    refresh_token = json.loads(str(r.text))['refresh_token']
    return access_token, refresh_token


def create_money_transfer(access_token, loan_amount, src_account, dst_account):
    pass
