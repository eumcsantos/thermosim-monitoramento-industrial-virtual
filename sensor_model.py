"""
Este módulo simula o comportamento de um sensor físico. Não usaremos números puramente aleatórios (random), pois a temperatura real possui inércia. Usaremos um modelo de "Random Walk" tendencioso para simular o aquecimento de uma máquina.
"""
import random
import time
from datetime import datetime

class VirtualTemperatureSensor:
    def __init__(self, base_temp=25.0, target_temp=80.0):
        """
        Inicializa o sensor virtual.
        :param base_temp: Temperatura inicial ambiente.
        :param target_temp: Temperatura de operação da máquina (setpoint).
        """
        self.current_temp = base_temp
        self.target_temp = target_temp
        self.running = False
    
    def start_machine(self):
        self.running = True

    def stop_machine(self):
        self.running = False
        
    def read_data(self):
        """
        Simula a leitura do sensor com inércia térmica e ruído estocástico.
        Retorna um dicionário com timestamp e valor.
        """
        timestamp = datetime.now().strftime("%H:%M:%S")
        
        if self.running:
            # Lógica de aquecimento: tende a subir até o target_temp
            if self.current_temp < self.target_temp:
                self.current_temp += random.uniform(0.5, 1.5) # Taxa de aquecimento
            
            # Adiciona ruído branco (vibração/erro do sensor)
            noise = random.uniform(-0.5, 0.5)
        else:
            # Lógica de resfriamento (Lei de resfriamento de Newton simplificada)
            if self.current_temp > 25.0:
                self.current_temp -= random.uniform(0.2, 0.8)
            noise = random.uniform(-0.2, 0.2)

        final_temp = round(self.current_temp + noise, 2)

        return {
            "timestamp": timestamp,
            "temperature": final_temp,
            "status": "OPERANDO" if self.running else "PARADO"
        }