from flask import Flask, render_template, jsonify
from sensor_model import VirtualTemperatureSensor

app = Flask(__name__)

# Instancia o "hardware" globalmente
sensor = VirtualTemperatureSensor()

@app.route('/')
def index():
    return render_template('index.html')

# --- API Endpoints (Interface com o Frontend) ---

@app.route('/api/toggle', methods=['POST'])
def toggle_machine():
    """Liga ou desliga a simulação da máquina."""
    if sensor.running:
        sensor.stop_machine()
        state = False
    else:
        sensor.start_machine()
        state = True
    return jsonify({"running": state})

@app.route('/api/readings', methods=['GET'])
def get_readings():
    """Endpoint que o frontend consulta periodicamente."""
    data = sensor.read_data()
    return jsonify(data)

if __name__ == '__main__':
    # Debug=True permite atualização automática ao alterar código
    app.run(debug=True, port=5000)