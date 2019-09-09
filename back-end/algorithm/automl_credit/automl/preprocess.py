from automl.tools import timeit, log
import datetime
from pandas import DataFrame
from sklearn.preprocessing import LabelEncoder
from util.constant import *

@timeit
def clean_df(df, info):
    fill_na(df, info)


@timeit
def fill_na(df, info):
    for c in [c for c in df if info[c][TYPE] == NUM_TYPE]:
        df[c].fillna(-1, inplace=True)

    for c in [c for c in df if info[c][TYPE] == CAT_TYPE]:
        df[c].fillna("0", inplace=True)

    for c in [c for c in df if info[c][TYPE] == TIME_TYPE]:
        df[c].fillna(datetime.datetime(1970, 1, 1).timestamp() / 1000, inplace=True)

    for c in [c for c in df if info[c][TYPE] == MULTI_CAT_TYPE]:
        df[c].fillna("0", inplace=True)
    return df


@timeit
def multi_cat_split(df: DataFrame, info):
    # 对multi category进行拆分，搜索分隔符(',' ':'等)，拆分为cat类型添加到info中
    multi_cat_cols = [c for c in df if info[c][TYPE] == MULTI_CAT_TYPE]
    for c in multi_cat_cols:
        # 拆分
        cols = df[c].str.split(r'[:，,]', expand=True)
        cols.columns = [f'{c}_{each}'for each in cols.columns]
        # 添加
        for each in cols.columns:
            info[each] = {TYPE: CAT_TYPE}
        df = df.join(cols)
        df.drop(c, axis=1, inplace=True)
    return df


@timeit
def time_translate(df: DataFrame, info):
    time_cols = [c for c in df if info[c][TYPE] == TIME_TYPE]
    for time_col in time_cols:
        df[time_col] = df[time_col].apply(lambda x: datetime.datetime.fromtimestamp(x / 1000))
        df.drop(time_col, axis=1, inplace=True)
    return df


@timeit
def cat_encode(df: DataFrame, info):
    # 对category类型进行编码
    cat_cols = [c for c in df if info[c][TYPE] == CAT_TYPE]
    threshold = df.shape[0] * CATEGORY_NUM_THRESHOLD
    for cat in cat_cols:
        if df[cat].value_counts().size < threshold:
            # 使用LabelEncoder防止生成过多列
            enc = LabelEncoder()
            log(f'Encode {cat}')
            df[cat] = enc.fit_transform(df[cat].values)
            info[cat][ENCODER] = enc
        else:
            df.drop(cat, axis=1, inplace=True)
    return df


@timeit
def pipeline(df, info):
    df = fill_na(df, info)
    df = time_translate(df, info)
    df = multi_cat_split(df, info)
    df = fill_na(df, info)
    df = cat_encode(df, info)
    return df
