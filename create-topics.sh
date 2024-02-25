#/bin/bash

/opt/bitnami/kafka/bin/kafka-topics.sh --create --topic push_notifications --bootstrap-server kafka:9092
/opt/bitnami/kafka/bin/kafka-topics.sh --create --topic sms_notificaitons --bootstrap-server kafka:9092
/opt/bitnami/kafka/bin/kafka-topics.sh --create --topic email_notifications --bootstrap-server kafka:9092
/opt/bitnami/kafka/bin/kafka-topics.sh --create --topic marketing_notifications --bootstrap-server kafka:9092
/opt/bitnami/kafka/bin/kafka-topics.sh --create --topic otp_notifications --bootstrap-server kafka:9092
/opt/bitnami/kafka/bin/kafka-topics.sh --create --topic misc_notifications --bootstrap-server kafka:9092
/opt/bitnami/kafka/bin/kafka-topics.sh --create --topic transaction_notifications --bootstrap-server kafka:9092
echo "topic $TEST_TOPIC_NAME was create"
