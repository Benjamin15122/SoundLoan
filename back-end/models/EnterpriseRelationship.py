from app import db, app


class EnterpriseRelationship(db.Model):
    __tablename__ = "enterprise_relationships"

    Id = db.Column(db.Integer, primary_key=True)
    enterpriseName = db.Column(db.String(100))

    # 节点名字，如：李紫菲，李紫墨
    NodeName = db.Column(db.String(20))
    # 节点的label标签，如：Company，Human；可能有多个标签，写在一个字符串中
    NodeLabel = db.Column(db.String(100))

    # 关系标签，如：法人，参股，监事; 可能有多个标签，写在一个字符串中
    Properties = db.Column(db.String(100))
    # 关系类型，如：OWN，INVEST_H
    Type = db.Column(db.String(100))

    def __init__(self, enterpriseName,NodeName, NodeLabel, Properties, Type):
        self.enterpriseName=enterpriseName
        self.NodeName = NodeName
        self.NodeLabel = NodeLabel
        self.Properties = Properties
        self.Type = Type

    def to_dict(self):
        return {
            'id': self.Id,
            'enterprise_name': self.enterpriseName,
            'node_name': self.NodeName,
            'node_label': self.NodeLabel,
            'properties': self.Properties,
            'type': self.Type
        }

