#include <Wire.h>
#include <BH1750.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <SoftwareSerial.h>

// === DEFINIÇÕES GERAIS ===
#define ONE_WIRE_BUS 12
BH1750 lightMeter;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// Serial do ESP8266
SoftwareSerial EspSerial(10, 11);

// Wi-Fi
String ssid = "*rede wifi*";
String senha = "*senha wi-fi*";

// === SETUP ===
void setup() {
  Serial.begin(9600);
  EspSerial.begin(9600);

  Wire.begin();
  lightMeter.begin();
  sensors.begin();

  delay(1500); // Tempo para estabilizar hardware
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

    bool temperaturaValida = temperatura > -100 && temperatura < 100;
    bool luzValido = luz > 0;

    if (luzValido && temperaturaValida) {
      Serial.println("✅ Dados válidos detectados.");
      Serial.print("📤 Enviando dados -> Temperatura: ");
      Serial.print(temperatura, 2);
      Serial.print(" °C | Lux: ");
      Serial.println(lux);
      enviarParaWebhook(temperatura, lux);
    } else {
      Serial.println("⚠️ Dados inválidos detectados.");
    }
  }
}

// === FUNÇÕES AUXILIARES ===
void conectarWiFi() {
  Serial.println("🔌 Inicializando ESP8266...");

  enviarComando("AT", 800);
  enviarComando("AT+RST", 2500);
  delay(1500); // 👈 ESP reinicia e precisa de tempo

  enviarComando("AT+CWMODE=1", 800);
  enviarComando("AT+CWJAP=\"" + ssid + "\",\"" + senha + "\"", 9000); // 👈 Mais tempo para conectar no Wi-Fi
  delay(2000); // 👈 *importantíssimo*
  
  enviarComando("AT+CIPMUX=0", 1000);
}

void enviarParaWebhook(float temperatura, uint16_t luz) {
  String host = "webhook.site";
  String caminho = "/7a73eca8-e6d8-403c-a316-c8f86f06454d";

  String dados = "{\"temperatura\":" + String(temperatura, 2) + ",\"luz\":" + String(luz) + "}";

  Serial.println("📦 Payload JSON:");
  Serial.println(dados);

  String requisicao =
    "POST " + caminho + " HTTP/1.1\r\n" +
    "Host: " + host + "\r\n" +
    "Content-Type: application/json\r\n" +
    "Content-Length: " + String(dados.length()) + "\r\n\r\n" +
    dados;

  if (!enviarComandoEEsperar("AT+CIPSTART=\"TCP\",\"" + host + "\",80", "Linked", 6000)) {
    Serial.println("❌ Erro ao conectar ao Webhook");
    return;
  }

  delay(1200); // dá tempo para o servidor abrir a conexão

  if (!enviarComandoEEsperar("AT+CIPSEND=" + String(requisicao.length()), ">", 4000)) {
    Serial.println("❌ Erro ao iniciar envio de dados");
    return;
  }

  EspSerial.print(requisicao);
  delay(1800);

  enviarComando("AT+CIPCLOSE", 1200);
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