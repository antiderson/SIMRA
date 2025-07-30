# 🌊 SIMRA - Sistema de Monitoramento Remoto de Aquário

**SIMRA** É um sistema de automação e monitormento inteligente para aquários,
desenvolvido como um Trabalho de Conclusão de Curso (TCC). Ele permite acompanhar remotamente parâmetros essenciais da qualidade da água, promovendo  o bem-estar dos organismos aquáticos e facilitando a rotina dos aquaristas, utilizando tecnologias de Internet das Coisas (IoT) e um aplicativo móvel integrado.

---

## 📌 Funcionalidades


- Monitoramento Remoto em tempo real via app mobile
- Coleta de dados ambientais:
    - 🌡️ temperatura
    - 💡 luminosidade
- Envio automatizado dos dados para o Firebase Realtime Database
- Visualização gráfica no aplicativo (VictoryPie)
- Arquitetura modular e expansivel
- Comunicação via módulo Wi-Fi (ESP8266 com comandos AT)

---

## 🔁 Fluxo de comunicação

**Fluxo completo dos dados desde o SIMRA até o app**


*aqui vai o diagrama de fluxo*

---
## 📱 Aplicativo Mobile

O app foi desenvolvido com **React-Native (Expo)** e utiliza a biblioteca **Victory Native** para a exibição dos dados monitorados em tempo real.


### Recursos:

- Tela inicial com gráficos interativos
- Integração com Firebase Realtime Database
- Atualizações dinâmicas dos sensores
- Interface leve, moderna e responsiva

---

## 🧠 Stacks Utilizadas

- **Hardware:**
    - Arduino UNO
    - Sensor de temperatura DS18B20
    - Sensor de Luminosidade BH1750FVI
    - Módulo Wi-Fi ESP8266
    - Adaptador Wi-Fi para ESP8266 RoboCore
    - Capsula protetora impermeável (impedindo contato direto com os circuitos)

- **Backend:**
    - Servidor intermediário (Node.js/Express) hospedado na Railway
    - Firebase Realtime Database para armazenamento dos dados

- **Frontend:**
    - React Native (Expo)
    - Biblioteca Victory Native para gráficos interativos

---

## 🗂️ Estrutura do projeto

---

## 🔮 Futuras Expansões

- Monitoramento de: 
    - 💧 pH
    - 🫧 Oxigênio dissolvido
    - 🌫️ Turbidez
    - 🧪 Amônia e Nitrito
- Automação da alimentação de peixes
- Alertas inteligentes no app
- Dashboard Web
- Histórico de dados com exportação

---

## 👨🏼‍💻 Autor
- [Anderson Daniel] ([Linkedin](https://www.linkedin.com/in/anderson-daniel-850a53202/))
- [Enzo Akira] ([Linkedin](https://github.com/EnzoAkiraInoue))

---