from datetime import datetime, timedelta
import json

with open('db.json', 'r') as f:
    data = json.load(f)

def calcular_data_limite(data_chegada, duracao):
    data_chegada = datetime(data_chegada['ano'], data_chegada['mes'], data_chegada['dia'], data_chegada['hora'], data_chegada['minutos'])
    return data_chegada + timedelta(minutes=duracao)

for service in data['services']:
    service_definition = next((sd for sd in data['service-definitions'] if sd['id'] == service['service-definitionId']), None)
    if service_definition:
        data_limite = calcular_data_limite(service['data-chegada'], service_definition['duração'])
        service['data_limite'] = {
            'dia': data_limite.day,
            'mes': data_limite.month,
            'ano': data_limite.year,
            'hora': data_limite.hour,
            'minutos': data_limite.minute
        }
    else:
        print(f"Definição de serviço não encontrada para o serviço id {service['service-definitionId']}")

for mecanico in data['mecanicos']:
    for service_id in data['vehicle-types'][0]['serviços']: 
        service_definition = next((sd for sd in data['service-definitions'] if sd['id'] == service_id), None)
        if service_definition:
            if mecanico['role'] == 'eletrico' and 'eletrico' in service_definition['id']:
                mecanico['jobs'].append(service_id)
            elif mecanico['role'] == 'combustao' and 'gasolina' in service_definition['id']:
                mecanico['jobs'].append(service_id)
            elif mecanico['role'] == 'geral':
                mecanico['jobs'].append(service_id)
                
with open('db2.json', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
