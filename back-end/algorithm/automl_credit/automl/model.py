import copy
import pickle
from tools import timeit, log
from preprocess import pipeline as pp_pipeline
from feature_engineering import pipeline as fe_pipeline
from hyper_train import train, predict
from constant import TARGET


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
            x_test = pp_pipeline(x_test, self.info, train=False)
            x_test = fe_pipeline(x_test, self.info)
            return predict(x_test, self.info)

    @timeit
    def save(self):
        self.x = None
        self.y = None
        self.data = None
        with open('model.txt', 'wb') as f:
            pickle.dump(self, f)


if __name__ == "__main__":
    with open('/Users/xuzhuoer/Project/Citi/util/model.txt', 'rb') as f:
        model = pickle.load(f)
    print('here')
