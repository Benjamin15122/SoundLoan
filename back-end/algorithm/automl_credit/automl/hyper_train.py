from typing import Dict, List

import datetime
import hyperopt
import lightgbm as lgb
import numpy as np
import pandas as pd
from hyperopt import STATUS_OK, Trials, hp, space_eval, tpe
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import KFold, train_test_split


from automl.tools import log, timeit


def get_random_seed():
    return int((datetime.datetime.now() - datetime.datetime(1970, 1, 1)).microseconds)


@timeit
def train(X: pd.DataFrame, y: pd.Series, config):
    train_lightgbm(X, y, config)


@timeit
def predict(X: pd.DataFrame, config) -> List:
    preds = predict_lightgbm(X, config)
    return preds


@timeit
def validate(preds, y_path) -> np.float64:
    score = roc_auc_score(pd.read_csv(y_path)['label'].values, preds)
    log("Score: {:0.4f}".format(score))
    return score


@timeit
def train_lightgbm(X: pd.DataFrame, y: pd.Series, config):
    params = {
        'boosting_type': 'gbdt',
        'objective': 'regression',
        'metric': {'l2', 'l1'},
        'verbose': -1
    }

    start_time = datetime.datetime.now()
    hyperparams = hyperopt_lightgbm(X, y, params, config)
    end_time = datetime.datetime.now()
    log(f"Hyperopt time: {end_time - start_time}")

    X_train, X_val , y_train, y_val = data_split(X, y, 0.1)
    train_data = lgb.Dataset(X_train, label=y_train)
    valid_data = lgb.Dataset(X_val, label=y_val, reference=train_data)

    config["model"] = lgb.train({**params, **hyperparams},
                                train_data,
                                500,
                                valid_data,
                                early_stopping_rounds=30,
                                verbose_eval=100
                                )


@timeit
def predict_lightgbm(X: pd.DataFrame, config) -> List:
    return config["model"].predict(X)


@timeit
def hyperopt_lightgbm(X: pd.DataFrame, y: pd.Series, params: Dict, config):
    space = {
        "learning_rate": hp.loguniform("learning_rate", np.log(0.05), np.log(0.2)),
        "max_depth": hp.choice("max_depth", [4, 5, 6, 7, 8]),
        "num_leaves": hp.choice("num_leaves", np.linspace(10, 210, 50, dtype=int)),
        "num_boost_round": hp.choice("num_boost_round", [50, 100, 150, 200, 250]),
        "feature_fraction": hp.choice("feature_fraction", [0.8, 0.9]),
        "bagging_fraction": hp.choice("bagging_fraction", [0.8]),
        "bagging_freq": hp.choice("bagging_freq", np.linspace(0, 50, 10, dtype=int)),
        "reg_alpha": hp.uniform("reg_alpha", 0, 2),
        "reg_lambda": hp.uniform("reg_lambda", 0, 2),
        "min_child_weight": hp.uniform('min_child_weight', 0.5, 10),
    }

    spliter = KFold(n_splits=4)

    def objective(hyperparams):
        w_score_sum = 0
        i = 1
        # k-fold calcuate loss
        for train_index, valid_index in spliter.split(X):
            X_train, X_val = X.iloc[train_index], X.iloc[valid_index]
            y_train, y_val = y[train_index], y[valid_index]
            train_data = lgb.Dataset(X_train, y_train)
            valid_data = lgb.Dataset(X_val, y_val, reference=train_data)
            model = lgb.train({**params, **hyperparams},
                              train_set=train_data,
                              valid_sets=valid_data,
                              early_stopping_rounds=30,
                              verbose_eval=0)
            score = model.best_score["valid_0"]['l2']
            w_score_sum = w_score_sum + i * score
            i = i * 2
        # in regression, less is better
        return {'loss': w_score_sum, 'status': STATUS_OK}

    trials = Trials()
    best = hyperopt.fmin(fn=objective, space=space, trials=trials,
                         algo=tpe.suggest, max_evals=100, verbose=1,
                         rstate=np.random.RandomState(1))

    hyperparams = space_eval(space, best)
    log(f"auc = {-trials.best_trial['result']['loss']:0.4f} {hyperparams}")
    return hyperparams


def data_split(X: pd.DataFrame, y: pd.Series, test_size: float=0.2):
    return train_test_split(X, y, test_size=test_size)


def data_sample(X: pd.DataFrame, y: pd.Series, frac):
    X_sample = X.sample(frac=frac, random_state=1)
    y_sample = y[X_sample.index]
    return X_sample, y_sample
