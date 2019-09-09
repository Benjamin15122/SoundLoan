import time
from typing import Any
import numpy as np
import random

nesting_level = 0


def log(entry: Any):
    global nesting_level
    space = "-" * (4 * nesting_level)
    print(f"{space}{entry}")


def timeit(method, start_log=None):
    def timed(*args, **kw):
        global nesting_level

        log(f"Start [{method.__name__}]:" + (start_log if start_log else ""))
        nesting_level += 1

        start_time = time.time()
        result = method(*args, **kw)
        end_time = time.time()

        nesting_level -= 1
        log(f"End   [{method.__name__}]. Time elapsed: {end_time - start_time:0.2f} sec.")
        return result

    return timed


def sample_indices(y):
    pos_index = np.where(y.ravel() == 1)[0].tolist()
    neg_index = np.where(y.ravel() == 0)[0].tolist()

    sample_num = min(len(pos_index), len(neg_index))
    sample_num = min(sample_num, 1000)
    p_indics = random.sample(pos_index, sample_num)
    n_indics = random.sample(neg_index, sample_num)
    return p_indics + n_indics

