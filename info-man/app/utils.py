# import crypt
from datetime import datetime, timedelta
import os
# import pwd
import re
import subprocess
import time

from app import app

def to_dict(columns, results):
    datas = []
    col_num = len(columns)
    for result in results:
        data = {}
        for i in range(col_num):
            data[columns[i]] = result[i]
        datas.append(data)
    return datas


def str_to_bool(bool_str):
    """Transfer bool string to bool."""
    if isinstance(bool_str, bool):
        return bool_str
    return True if bool_str.lower() == 'true' else False


def execute_cmd(cmd, timeout=2):
    """Execute a bash command and return its execution result.

        Args:
            cmd: A bash command to execute
            timeout: Execution timeout

        Returns:
            code: Return 0 if success, otherwise other numbers
            output: Execution result
    """
    sub = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if timeout:
        dead_time = datetime.now() + timedelta(seconds=timeout)
    while sub.poll() is None:
        time.sleep(0.1)
        if timeout:
            if dead_time <= datetime.now():
                break
    output = sub.stdout.read()
    if output:
        try:
            output = output.decode('utf-8').strip()
        except:
            output = ''
    return sub.returncode, output if output else ''



def extend_to_16(text):
    """Extend text to a multiple of 16 as type of bytes"""
    while len(text) % 16 != 0:
        text += '\0'
    return str.encode(text)
