import numpy as np

TYPE_MAP = {
    'time': str,
    'cat': str,
    'multi-cat': str,
    'num': np.float64
}

CATEGORY_NUM_THRESHOLD = 0.6
TYPE = 'type'
ENCODER = 'encoder'
TIME_TYPE = 'time'
CAT_TYPE = 'cat'
MULTI_CAT_TYPE = 'multi-cat'
NUM_TYPE = 'num'
TARGET = 'sumcreditpoint'
