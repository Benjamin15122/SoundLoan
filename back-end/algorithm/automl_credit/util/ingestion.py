from datetime import datetime
import os
from pathlib import Path
import sys
import pandas as pd
from model import Model


def m_print(msg):
    """info"""
    cur_time = datetime.now().strftime('%m-%d %H:%M:%S')
    print(f"INFO  [{cur_time}] {msg}")


def read_info(input_path: Path):
    import json
    with open(str((input_path / 'info.json')), 'r') as info_fp:
        info = json.load(info_fp)
    return info


def read_data(input_path: Path, info):
    if input_path.is_file():
        data_path = input_path
    else:
        input_files = [i for i in input_path.iterdir() if 'RRD' in str(i)]
        data_path = input_files[0]
    df = pd.read_excel(data_path)
    df.drop([i for i in df.columns if 'verify' in i] + ['detailinformation'], inplace=True, axis=1)
    return df


def main():
    if len(sys.argv) == 1:
        root_folder = Path(os.getcwd())
        dirs = {
            'input': root_folder / 'input_data',
            'output': root_folder / 'output_data'
        }
    elif len(sys.argv) == 3:
        dirs = {
            'input': Path(sys.argv[1]),
            'output': Path(sys.argv[2])
        }
    else:
        raise ValueError("python ingestion [INPUT_DATA] [OUTPUT_DATA]")

    m_print(f'Read info')
    info = read_info(dirs['input'])

    m_print(f"Read data: {dirs['input']}")
    # amount? failedcount? graduation == eduction? notpaytotalamount? overduetotalamount? totalcount?
    data = read_data(dirs['input'], info)
    data.drop(['availablecredits',
               'borrowtype',
               'creditlevel',
               'description',
               'graduatedyear',
               'graduation',
               'hasothdebt',
               'idno',
               'interest',
               'loanid',
               'loantype',
               'months',
               'officedomain',
               'officescale',
               'officetype',
               'repayabilityinfo',
               'repaysource',
               'repaytype',
               'status',
               'successcount',
               'title',
               'position'
               ],
              axis=1, inplace=True)
    data.rename(columns={
        'gender': 'sex',
        'realname': 'name',
        'alreadypaycount': 'pay_time',
        'carloan': 'vehicle_loan',
        'hascar': 'vehicle_property',
        'hashouse': 'house_property',
        'houseloan': 'house_loan',
        'office': 'work_address',
        'overduecount': 'overdue_time',
        'university': 'school',
        'workyears': 'work_year',
        'hometown': 'residence_address'
    }, inplace=True)
    data['sex'] = data['sex'].apply(lambda each: 'male' if each == '男' else 'female')
    data['marriage'] = data['marriage'].apply(lambda each: 'married' if each == '已婚' else 'single')
    info['sex'] = info['gender']
    info['name'] = info['realname']
    info['pay_time'] = info['alreadypaycount']
    info['vehicle_loan'] = info['carloan']
    info['vehicle_property'] = info['hascar']
    info['house_property'] = info['hashouse']
    info['house_loan'] = info['houseloan']
    info['work_address'] = info['office']
    info['overdue_time'] = info['overduecount']
    info['school'] = info['university']
    info['work_year'] = info['workyears']
    info['residence_address'] = info['hometown']
    # import pickle
    # with open('/Users/xuzhuoer/Project/Citi/util/model.txt', 'rb') as f:
    #     model = pickle.load(f)
    # preds = model.predict(data)
    # m_print(preds[-10:])
    # m_print(data['sumcreditpoint'])
    m_print('Initialize model')
    model = Model(info, data)

    m_print('Start fitting')
    model.fit()

    m_print('Start predict')
    model.predict(None)

    # save model for using
    m_print(f'Save models')
    model.save()

    m_print(f'Done')


if __name__ == '__main__':
    main()
