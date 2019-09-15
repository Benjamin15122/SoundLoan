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
    search_word = company_name + " 信用"
    driver.find_element_by_id('contentKey').send_keys(search_word)
    driver.find_element_by_name('search').click()
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "result_list"))
    )
    time.sleep(5)
    for i in range(1, 21):
        result_row = {}
        a_element = driver.find_element_by_css_selector(
            '#result_list > table:nth-child(3) > tbody > tr:nth-child(%d) > td > a:nth-child(1)' % i)
        href = a_element.get_attribute('href')
        title = a_element.text
        if 'wap' in href:
            continue
        driver.get(href)
        news_source = driver.find_element_by_css_selector(
            'body > div.wrap > div.mbox02.overh.mb30 > div.Rbox.f-l > div > div.tag > span:nth-child(3)')
        distribution_date = driver.find_element_by_css_selector(
            'body > div.wrap > div.mbox02.overh.mb30 > div.Rbox.f-l > div > div.tag > span:nth-child(4)')
        extract = driver.find_element_by_css_selector(
            'body > div.wrap > div.mbox02.overh.mb30 > div.Rbox.f-l > div > div.des')
        result_row['link'] = href
        result_row['news_title'] = title.split(' - ')[0]
        result_row['news_source'] = news_source.text
        result_row['distribution_date'] = distribution_date.text
        result_row['news_extract'] = extract.text
        results.append(result_row)
        driver.get(Config.COURT_URL_TEMPLATE)
        time.sleep(1)
        driver.find_element_by_id('contentKey').send_keys(search_word)
        driver.find_element_by_name('search').click()
        time.sleep(1)
    driver.close()
    return results


def update_news():
    all_enterprises = [instance.Name for instance in EnterpriseUser.query.all()]
    all_news = []
    for enterprise_name in all_enterprises:
        exist_news = EnterpriseNews.query.filter(EnterpriseNews.EnterpriseName == enterprise_name).all()
        for news in exist_news:
            db.session.delete(news)
        db.session.commit()
        crawled_news = get_search_results(enterprise_name)
        for news in crawled_news:
            # enterprise_news = EnterpriseNews(enterprise_name, news['reportee'], news['link'], news['distribution_date'])
            enterprise_news = EnterpriseNews(enterprise_name, news['news_title'],
                                             news['link'], news['distribution_date'],
                                             news['news_source'], news['news_extract'])
            all_news.append(enterprise_news)
    db.session.add_all(all_news)
    db.session.commit()
    print('all news collected!')







