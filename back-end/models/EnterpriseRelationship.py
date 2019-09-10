from app import db, app


class EnterpriseRelationship(db.Model):
    __tablename__ = "enterprise_changes"

    Id = db.Column(db.Integer, primary_key=True)
    EnterpriseId = db.Column(db.Integer, db.foreignKey('user_enterprise.Id'))

    # 节点名字，如：李紫菲，李紫墨
    NodeName = db.Column(db.String(20))
    # 节点的label标签，如：Company，Human；可能有多个标签，写在一个字符串中
    NodeLabel = db.Column(db.String(100))

    # 关系标签，如：法人，参股，监事; 可能有多个标签，写在一个字符串中
    Properties = db.Column(db.String(100))
    # 关系类型，如：OWN，INVEST_H
    Type = db.Column(db.String(10))

    def __init__(self, NodeName, NodeLabel, Properties, Type):
        self.NodeName = NodeName
        self.NodeLabel = NodeLabel
        self.Properties = Properties
        self.Type = Type

    def to_dict(self):
        return {
            'id': self.Id,
            'enterprise_id': self.EnterpriseId,
            'node_name': self.NodeName,
            'node_label': self.NodeLabel,
            'properties': self.Properties,
            'type': self.Type
        }

