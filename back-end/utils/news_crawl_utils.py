from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
from config import *
from models.EnterpriseNews import EnterpriseNews
from models.EnterpriseUser import EnterpriseUser
from app import app, db


def get_search_results(company_name):
    results = []
    try:
        driver = webdriver.PhantomJS()
    except:
        driver = webdriver.Chrome()

    driver.get(Config.COURT_URL_TEMPLATE)
    driver.find_element_by_id('rmfy-form').send_keys(company_name)
    driver.find_element_by_id('searchButton').click()
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "oddd"))
    )
    time.sleep(2)
    for i in range(1, 16):
        result_row = {}
        row = driver.find_elements_by_css_selector('#gg-list > tr:nth-child(%d) > td > a' % i)
        result_row['reporter'] = row[0].get_attribute('title')
        result_row['reportee'] = row[1].get_attribute('title')
        result_row['link'] = row[0].get_attribute('href')
        result_row['distribution_date'] = row[3].text
        results.append(result_row)
    return results


def update_news():
    all_enterprises = [instance.Name for instance in EnterpriseUser.query.all()]
    all_news = []
    for enterprise_name in all_enterprises:
        crawled_news = get_search_results(enterprise_name)
        for news in crawled_news:
            enterprise_news = EnterpriseNews(enterprise_name, news['reportee'], news['link'], news['distribution_date'])
            all_news.append(enterprise_news)
    db.session.add_all(all_news)
    db.session.commit()
    print('all news collected.')




