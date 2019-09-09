from datetime import datetime
import os
from pathlib import Path
import sys
import pandas as pd
from automl.model import Model


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
    data = read_data(dirs['input'], info)

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
