import numpy as np
from scipy.sparse import dok_matrix
import math
from utils.recommendation_userbased_utils import *


class UserItemRelationShip:
    def __init__(self, loan_record_list):
        self.debtor_id_index = dict()
        self.product_id_index = dict()
        self.debtor_index_id, self.product_index_id = [], []
        self.debtor_counter, self.product_counter = 0, 0
        for each in loan_record_list:
            if each[0] not in self.debtor_id_index:
                self.debtor_id_index[each[0]] = self.debtor_counter
                self.debtor_index_id.append(each[0])
                self.debtor_counter += 1
            if each[1] not in self.product_id_index:
                self.product_id_index[each[1]] = self.product_counter
                self.product_index_id.append(each[1])
                self.product_counter += 1

        self.item_users = dict()
        self.user_item = dict()
        for each in loan_record_list:
            debtor, product = self.debtor_id_index[each[0]], self.product_id_index[each[1]]
            if debtor not in self.user_item:
                self.user_item[debtor] = set()
            self.user_item[debtor].add(product)

            if product not in self.item_users:
                self.item_users[product] = set()
            self.item_users[product].add(debtor)
        self.popular_items = [item[0] for item in sorted(self.item_users.items(), key=lambda d:len(d[1]))]

        self.intersection_C = dok_matrix((self.debtor_counter, self.debtor_counter),
                                         dtype=np.uint8)
        for product in self.item_users:
            for v1 in self.item_users[product]:
                for v2 in self.item_users[product]:
                    if v1 == v2:
                        continue
                    else:
                        self.intersection_C[v1, v2] += 1
                        self.intersection_C[v2, v1] += 1

    def get_similar_k_user(self, debtor_id, k_users):
        debtor_index = self.debtor_id_index[debtor_id]
        N_debtor = len(self.user_item[debtor_index])
        similarities = dict()
        for item in self.intersection_C[debtor_index].items():
            ((_, neighbor_index), intersection) = item
            N_neighbor = len(self.user_item[neighbor_index])
            similarity = intersection/math.sqrt(N_debtor*N_neighbor)
            similarities[neighbor_index] = similarity
        similar_users = sort_by_value(similarities)
        return similar_users[:k_users]

    def get_recommendation(self, debtor_id, k_users, k_products):
        # 有可能债务人第一次借款，此时给他推荐热门产品（启动策略）
        if debtor_id not in self.debtor_id_index:
            return self.popular_items[:k_products]

        itemset = self.user_item[self.debtor_id_index[debtor_id]]
        similar_users = self.get_similar_k_user(debtor_id, k_users)
        products_count = dict()
        for user in similar_users:
            products_set = self.user_item[user]
            for each in products_set:
                if each in itemset:
                    continue
                elif each not in products_count:
                    products_count[each] = 1
                else:
                    products_count[each] += 1
        products_sorted = sort_by_value(products_count)

        # 如果推荐数量不够，拿热门商品凑足
        if len(products_sorted) < k_products:
            for each in self.popular_items:
                if len(products_sorted) >= k_products:
                    break
                elif each in products_sorted:
                    continue
                else:
                    products_sorted.append(each)

        return [self.product_index_id[each] for each in products_sorted]
