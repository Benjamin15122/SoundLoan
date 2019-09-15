# import crypt
from datetime import datetime, timedelta
import os
# import pwd
import re
import subprocess
import time
from config import Config
from app import app, db


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


def calc_interest(amount, rate, duration, loan_type):
    # 计算三个值：还款总额，利息总额，每月还款额度
    L, i, n = amount, rate/12, duration
    # 等额本息
    if loan_type == 'EqualPricipalInterest':
        a_n_i = (1-(1+i)**(-n))/i
        P = L/a_n_i
        return n*P, n*P-L, [P for i in range(n)]

    # 等额本金
    elif loan_type == 'EqualPricipal':
        return L+((n+1)*L*i/2), (n+1)*L*i/2, [(L/n)*(1+i*(n+1-j)) for j in range(1, n+1)]

    # 按月付息，到期还本
    elif loan_type == 'MonthlyInterest':
        total = L*(1+n*i)
        interest_total = L*n*i
        return total, interest_total, [L*i if not j == n else L*(1+i) for j in range(1, n+1)]

    elif loan_type == 'QuarterlyInterest':
        total = L*(1+n*i)
        interest_total = L*n*i
        times = int(n/3)
        monthly_pay = [L*3*i if j%3==0 else 0 for j in range(1, n+1)]
        last_pay = total - sum(monthly_pay)
        monthly_pay[-1] += last_pay
        return total, interest_total, monthly_pay

    elif loan_type == 'OneTimeDebt':
        total = L*(1+i*n)
        interest_total = L*i*n
        return total, interest_total, [total if j == n else 0 for j in range(1, n+1)]

    else:
        raise Exception('Invalid loan type. ')
