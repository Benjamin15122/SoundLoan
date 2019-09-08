+ 测试人员：明鑫
+ 测试时间：2019.09.07 16:02
+ 测试平台：个人笔记本电脑windows10, python3.6, mysql 8.0.17
+ 接口url: /authen/askForIdCard
+ 测试版本：branchName = demo; commitID = 88acdb04f70a9cd18ebc242e7e8489a3b2e3b1c6
#### 测试样例1
发送的测试数据为：
```python
pic_front=(自己身份证图片正面的base64字符串，字符串太长，此处略去)
pic_back=(自己身份证图片反面的base64字符串，字符串太长，此处略去)
```
response为：
```
{
    "content": {
        "back": {
            "expiryDate": "20290708",
            "issue": "昆山市公安局",
            "issueDate": "20190708"
        },
        "front": {
            "address": "江苏省昆山市玉山镇汇景公寓3幢304室",
            "birthday": "19990127",
            "code": "410703199901273511",
            "name": "明鑫",
            "nation": "汉",
            "sex": "男"
        }
    },
    "message": null,
    "success": true
}
```
该样例返回正常
#### 测试样例2
```python
pic_front=24325325
pic_back=35556
```
返回response为：
```
{
    "content": null,
    "message": null,
    "success": false
}
```
pic_front和pic_back没有采取正确的base64编码，系统无法识别，因此response符合预期。

## 测试发现的问题及改进
暂无
