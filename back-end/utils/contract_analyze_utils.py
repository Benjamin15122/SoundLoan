# -*- coding = utf-8 -*-
from PIL import Image
import base64
import re
import math
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
from tencentcloud.ocr.v20181119 import ocr_client, models


def get_image_base64(path):
    # path = 'C:\\tmp\\test.jpg'
    im = Image.open(path)
    size = im.height, im.width
#    if im.height > 2000:
#        size = 2000, 2000 * (im.width / im.height)
    im.thumbnail(size)
    im.save(path)

    with open(path, 'rb') as f:
        base64_data = base64.b64encode(f.read())
    return base64_data


def text_splitter(text: str, data_type):
    """
    :param text: 需要切分的文字片段
    :param data_type: 文字片段的来源，可能是纯文本，可能是从图片中提取出来的
    :return: 返回切分后的文本list
    """
    if data_type == 'image':
        text = re.split(r'。|；|;|\?', text)
    else:
        text = re.split(r'\n|。|；|;|\?', text)
    text = list(map(lambda s: s.replace('\n', '').replace(' ',  ''), text))
    text = list(filter(lambda x: x != '', text))
    return text


def find_closest_substr(whole_str:str, target:str, sub_strs:list):
    """
    在字符串中找到与target字符串距离最近的sub_strs元素
    :param whole_str: 字符串整体
    :param target: 目标
    :param sub_strs: 其他子串
    :return: 返回sub_strs中距离target最近的字符串
    """
    if len(sub_strs) == 1:
        return sub_strs[0]
    p = re.compile(target)
    target_str = p.findall(whole_str)[0]
    target_index = whole_str.find(target_str)
    distance = [math.fabs(target_index-whole_str.find(each)) for each in sub_strs]
    return sub_strs[distance.index(min(distance))]


def image_to_text(image_base64_data: list):
    """
    使用腾讯云的api，提取图片中的文字
    :param image_base64_data: 用户上传的图片，以base64编码，按顺序放入列表
    :return: 提取出来的图片中的所有文字，str类型
    """
    text = ''
    for image_data in image_base64_data:
        cred = credential.Credential("AKIDqvmSxs0v4QaV9ESpPjqtgBrHTO6c8ugV",
                                     "lMiqZ1IKL7mFXWBZr65pIVWM1RlobGgt")
        httpProfile = HttpProfile()
        httpProfile.endpoint = "ocr.tencentcloudapi.com"

        clientProfile = ClientProfile()
        clientProfile.httpProfile = httpProfile
        client = ocr_client.OcrClient(cred, "ap-shanghai", clientProfile)

        req = models.GeneralBasicOCRRequest()
        params = '{"ImageBase64":"%s"}' % (str(image_data))
        req.from_json_string(params)

        resp = client.GeneralBasicOCR(req)
        for each in resp.TextDetections:
            text += each.DetectedText

    return text
