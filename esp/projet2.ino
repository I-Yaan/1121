
#include "index.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>

#define ledPin 14

#define led 14

IPAddress local_ip(192, 168, 0, 1);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 255, 0);

ESP8266WebServer  server(80);

void setup() {

  Serial.begin(115200);

  pinMode(led, OUTPUT);

  //
  Serial.println("\n[*] Creating AP");
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(local_ip, gateway, subnet);
  WiFi.softAP("esp", "");
  Serial.print("[+] AP Created with IP Gateway ");
  Serial.println(WiFi.softAPIP());

  //
  digitalWrite(led, HIGH);
  delay(1000);
  digitalWrite(led, LOW);
  delay(1000);
  digitalWrite(led, HIGH);
  delay(1000);
  digitalWrite(led, LOW);
  //

  Serial.println("Connected to WiFi!");
  Serial.println("Adresse IP : ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/off", handleOff);
  server.on("/on", handleOn);
  server.begin();
}

void handleRoot() {
  String message = MAIN_page;
  server.send(200, "text/html", message);
}

void handleOn() {
  Serial.println("Led ON");
  digitalWrite(led, HIGH);

  String message = MAIN_page;
  server.send(200, "text/html", message);
}

void handleOff() {
  Serial.println("Led OFF");
  digitalWrite(led, LOW);

  String message = MAIN_page;
  server.send(200, "text/html", message);
}

void loop() {
  server.handleClient();
}
