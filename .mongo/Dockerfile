FROM mongo:3

ADD ./db.tar.gz .

CMD ["mongod", "--storageEngine", "wiredTiger", "--nojournal"]
