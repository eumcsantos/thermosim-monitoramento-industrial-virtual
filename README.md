# ThermoSim: Monitoramento Industrial Virtual

> **Disciplina:** Sistemas Embarcados  
> **Status:** Protótipo Funcional (v1.0)

## 📋 Sobre o Projeto

O **ThermoSim** é um sistema web desenvolvido para simular o comportamento térmico de máquinas industriais em tempo real. O projeto aplica o conceito de **Digital Twin** (Gêmeo Digital), onde um módulo de software emula as características físicas de um sensor real (inércia térmica, curvas de aquecimento/resfriamento e ruído de medição), permitindo o desenvolvimento e validação da interface de supervisão sem a necessidade imediata do hardware físico.

Este sistema serve como uma camada de supervisão (SCADA simplificado), permitindo ao operador visualizar o estado da máquina, controlar sua operação e monitorar o histórico de temperatura.

## 🚀 Funcionalidades

* **Simulação Física:** Algoritmo que emula a Lei de Resfriamento de Newton e curvas de aquecimento com ruído estocástico.
* **Monitoramento em Tempo Real:** Atualização dinâmica de gráficos e indicadores numéricos via AJAX.
* **Controle de Atuadores:** Interface para ligar/desligar a máquina virtualmente.
* **Data Logging:** Registro histórico das leituras com timestamp preciso.
* **API REST:** Endpoints desacoplados para comunicação entre Backend e Frontend.

## 🛠 Tecnologias Utilizadas

* **Backend:** Python 3.12+, Flask (Micro-framework).
* **Frontend:** HTML5, Bootstrap 5 (UI), Chart.js (Visualização de Dados).
* **Arquitetura:** Client-Server com comunicação assíncrona (Polling).

## 📂 Estrutura do Projeto

A organização dos arquivos segue o padrão MVC (Model-View-Controller) adaptado para Flask:

```text
/thermosim_project
│
├── app.py                 # (Controller) Servidor Web e Rotas da API
├── sensor_model.py        # (Model) Lógica de simulação física do sensor
├── README.md              # Documentação do projeto
├── requirements.txt       # Lista de dependências
│
├── templates
│   └── index.html         # (View) Interface do Usuário
│
└── static
    ├── css
    │   └── style.css      # Estilos personalizados
    └── js
        └── dashboard.js   # Lógica do Frontend (Gráficos e Requisições)
```
## ⚙️ Instalação e Execução

Pré-requisitos: Python 3 instalado no sistema.

```text
    1. Clonar ou baixar o repositório: Baixe os arquivos para sua máquina local e acesse a pasta via terminal.
    2. Configurar o Ambiente Virtual: Para evitar conflitos com bibliotecas do sistema (PEP 668), utilize um ambiente virtual: 
        python3 -m venv .venv
        source .venv/bin/activate
    3. Instalar Dependências: Com o ambiente ativo (o terminal mostrará (.venv)), instale o Flask: pip install flask
    4. Execute o Servidor: Inicie a aplicação: python app.py
        O terminal exibirá: Running on http://127.0.0.1:5000
    5. Acessar o Sistema: Abra seu navegador preferido e digite o endereço: http://127.0.0.1:5000
```
## 🧠 Detalhes da Implementação (Para Avaliação)

**Modelo de Sensor (sensor_model.py)**
Ao contrário de um gerador de números aleatórios simples, a classe VirtualTemperatureSensor mantém o estado da temperatura atual.

- **Aquecimento:** Incremento gradual com taxa variável (simula resistência elétrica).
- **Resfriamento:** Decremento gradual (dissipação passiva).
- **Ruído:** Pequenas variações aleatórias adicionadas à leitura final para simular imprecisão de sensores reais (ex: LM35 ou DHT22).

**Comunicação (app.py & dashboard.js)**
O frontend não recarrega a página. Ele utiliza fetch() a cada 1 segundo para consultar o endpoint /api/readings. Isso demonstra conhecimento em aplicações assíncronas e reduz o tráfego de rede, atualizando apenas os dados necessários (JSON).

## 👨‍💻 Autor

- **Desenvolvido por:** Matheus C. Santos
- **Curso:** Ciências da Computação
- **Disciplina:** Sistemas Embarcados
- **Semestre:** 5º Semestre