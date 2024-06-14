import json

# Load the JSON file
with open('db.json', 'r') as f:
    data = json.load(f)

# Extract the list of vehicle types
vehicle_types = data['vehicle-types']

# Create a set of services for the first vehicle type
universal_services = set(vehicle_types[0]['serviços'])

# For each subsequent vehicle type, update the set to the intersection of the current set and the set of services for that vehicle type
for vehicle_type in vehicle_types[1:]:
    universal_services &= set(vehicle_type['serviços'])

# For each vehicle type, remove the services in the "universal" category
for vehicle_type in vehicle_types:
    vehicle_type['serviços'] = list(set(vehicle_type['serviços']) - universal_services)

# Create a new "universal" category with the services in the set
universal_category = {
    "id": "universal",
    "serviços": list(universal_services)
}

# Add the universal category to the list of vehicle types
vehicle_types.append(universal_category)

# Save the updated data back to the JSON file
with open('db.json', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)