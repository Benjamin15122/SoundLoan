import os
import logging

from app import app, db
from app.models import UserIndividualInfo, UserEnterpriseInfo, LoanRecordInfo, ContractInfo, LoanProductInfo


if __name__ == "__main__":
    host = app.config['HOST']
    port = app.config['PORT']
    app.run(host=host, port=port)
