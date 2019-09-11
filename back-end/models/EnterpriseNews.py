from app import db, app


class EnterpriseNews(db.Model):
    __tablename__ = 'enterprise_news'

    Id = db.Column(db.Integer, primary_key=True)

    EnterpriseName = db.Column(db.String(80))
    NewsTitle = db.Column(db.String(256), nullable=False)
    NewsLink = db.Column(db.String(256))
    DistributionDate = db.Column(db.TIMESTAMP)

    # added columns
    NewsSource = db.Column(db.String(256))
    NewsExtract = db.Column(db.String(256))

    def __init__(self, enterprise_name, news_title, news_link, distribution_date, news_source, news_extract):
        self.EnterpriseName = enterprise_name
        self.NewsTitle = news_title
        self.NewsLink = news_link
        self.DistributionDate = distribution_date

        # added columns
        self.NewsSource = news_source
        self.NewsExtract = news_extract


    def to_dict(self):
        return {
            'enterprise_name': self.EnterpriseName,
            'news_title': self.NewsTitle,
            'news_link': self.NewsLink,
            'distribution_date': self.DistributionDate,

            #added_attributes
            'news_source': self.NewsSource,
            'news_extract': self.NewsExtract
        }