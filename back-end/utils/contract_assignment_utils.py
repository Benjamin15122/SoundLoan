import requests
import json
import hashlib
from config import *


def register(user_name):
    payload = {
        'user_name': user_name
    }
    r = requests.post(Config.signature_server+'/userRegister', data=payload)
    return json.loads(str(r.text))['success']


def get_md5_abstract(contract: str):
    my_md5 = hashlib.md5()
    my_md5.update(contract.encode('utf-8'))
    return my_md5.hexdigest()


def get_signature(user_name, contract):
    payload = {
        'user_name': user_name,
        'hash_data': get_md5_abstract(contract)
    }
    r = requests.post(Config.signature_server+'/signatureGenerate', data=payload)
    data = json.loads(str(r.text))
    return data['content']


def verify_signature(user_name, contract, signature):
    payload = {
        'user_name': user_name,
        'hash_data': get_md5_abstract(contract),
        'signature': signature
    }
    r = requests.post(Config.signature_server+'/signatureVerify', data=payload)
    data = json.loads(str(r.text))
    return data['content']


# if __name__ == '__main__':
#     print(register('mike'))
#     contract = 'loan 1000 yuan. '
#     signature = get_signature('mike', contract)
#     print(signature)
#     print(verify_signature('mike', contract, signature))

