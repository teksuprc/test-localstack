Create a bucket: 

```
aws --endpoint-url=http://localhost:4572 s3 mb s3://demo-bucket
```


Attach an ACL to the bucket so it is readable: 

```
aws --endpoint-url=http://localhost:4572 s3api put-bucket-acl --bucket demo-bucket --acl public-read
```


create kinesis stream for offline-kinesis
```
aws kinesis create-stream --stream-name in_stream --shard-count 1 --endpoint-url http://localhost:4567
```
