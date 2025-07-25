
#include <Wire.h>
#include <BH1750.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <SoftwareSerial.h>

// === DEFINIÇÕES GERAIS ===
#define ONE_WIRE_BUS 12  // Pino do DS18B20 (temperatura)
BH1750 lightMeter;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// Serial do ESP8266 (pinos 10 e 11)
SoftwareSerial EspSerial(10, 11);

// Wi-Fi
String ssid = "";
String senha = "";

// === SETUP ===
void setup() {
  Serial.begin(9600);
  EspSerial.begin(9600);

  Wire.begin();
  lightMeter.begin();
  sensors.begin();

  conectarWiFi();
}

// === LOOP ===
void loop() {
  static unsigned long lastUpdate = 0;
  if (millis() - lastUpdate > 5000) {
    lastUpdate = millis();

    // Leitura dos sensores
    uint16_t luz = lightMeter.readLightLevel();
    sensors.requestTemperatures();
    float temperatura = sensors.getTempCByIndex(0);

    // Filtro de valores inválidos
    bool temperaturaValida = temperatura > -100 && temperatura < 100;
    bool luzValido = luz > 0;

    if (temperaturaValida && luzValido) {
      Serial.println("Dados válidos. Enviando...");
      enviarParaWebhook(temperatura, luz);
    } else {
      Serial.println("⚠️ Dados inválidos detectados. Temperatura ou luz fora do intervalo esperado.");
      Serial.print("Temp: "); Serial.println(temperatura);
      Serial.print("Luz: "); Serial.println(luz);
    }
  }
}

// === FUNÇÕES AUXILIARES ===
void conectarWiFi() {
  Serial.println("Inicializando ESP8266...");

  enviarComando("AT", 1000);
  enviarComando("AT+RST", 2000);
  enviarComando("AT+CWMODE=1", 1000);
  enviarComando("AT+CWJAP=\"" + ssid + "\",\"" + senha + "\"", 6000);
  enviarComando("AT+CIPMUX=0", 1000);
}

void enviarParaWebhook(float temperatura, uint16_t lux) {
  String host = "webhook.site";
  String caminho = "/*token*"; // Substitua com seu token atual

  String dados = "{\"temperatura\":" + String(temperatura, 2) + ",\"luz\":" + String(luz) + "}";

  String requisicao =
    "POST " + caminho + " HTTP/1.1\r\n" +
    "Host: " + host + "\r\n" +
    "Content-Type: application/json\r\n" +
    "Content-Length: " + String(dados.length()) + "\r\n\r\n" +
    dados;

  if (!enviarComandoEEsperar("AT+CIPSTART=\"TCP\",\"" + host + "\",80", "Linked", 5000)) {
    Serial.println("Erro ao conectar ao Webhook");
    return;
  }

  delay(100);

  if (!enviarComandoEEsperar("AT+CIPSEND=" + String(requisicao.length()), ">", 3000)) {
    Serial.println("Erro ao iniciar envio de dados");
    return;
  }

  EspSerial.print(requisicao);
  delay(2000);
  enviarComando("AT+CIPCLOSE", 1000);
}

bool enviarComandoEEsperar(String cmd, String esperado, int tempoLimite) {
  EspSerial.println(cmd);
  long t0 = millis();
  String resposta = "";

  while (millis() - t0 < tempoLimite) {
    while (EspSerial.available()) {
      char c = EspSerial.read();
      resposta += c;
      Serial.write(c);
      if (resposta.indexOf(esperado) != -1) {
        return true;
      }
    }
  }
  return false;
}

void enviarComando(String cmd, int tempo) {
  EspSerial.println(cmd);
  long t = millis();
  while (millis() - t < tempo) {
    while (EspSerial.available()) {
      Serial.write(EspSerial.read());
    }
  }
}