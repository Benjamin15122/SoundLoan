import copy
from automl.tools import timeit, log
from automl.preprocess import pipeline as pp_pipeline
from automl.feature_engineering import pipeline as fe_pipeline
from automl.hyper_train import train, predict
from util.constant import TARGET


class Model:
    def __init__(self, info, data):
        self.info = info
        self.data = copy.deepcopy(data)
        self.x = self.data[[x for x in self.data.columns if x != TARGET]]
        self.y = self.data[TARGET]

    @timeit
    def fit(self):
        # preprocess
        self.x = pp_pipeline(self.x, self.info)
        # feature engineering
        self.x = fe_pipeline(self.x, self.info)
        # train model by hyper_opt
        train(self.x, self.y, self.info)

    @timeit
    def predict(self, x_test):
        if x_test is None:
            preds = predict(self.x, self.info)
            log(preds)
        else:
            return predict(x_test, self.info)

    @timeit
    def save(self):
        self.info["model"].save_model("lgbm.txt")


if __name__ == "__main__":
    pass
