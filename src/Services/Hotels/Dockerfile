FROM maven:alpine
WORKDIR /usr/src/app
COPY pom.xml .
RUN mvn -B -e -C -T 1C org.apache.maven.plugins:maven-dependency-plugin:3.0.2:go-offline
COPY . .
RUN mvn -B -e -o -T 1C verify

FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8080

COPY --from=0 /usr/src/app/target/*.jar ./

ENV JAVA_OPTS=""
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /hotels.api-1.0.0.jar