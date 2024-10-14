import pandas as pd
import json


# Load the Excel file
excel_file = "../data/location-data.xlsx"
sheet_name = 'Map' 

# Read Excel into pandas DataFrame
df = pd.read_excel(excel_file, sheet_name=sheet_name)

print(df)

# Drop the empty columns 
df = df.dropna(axis=1, how='all')

# Drop rows with NaN values
df = df.dropna()

# Rename columns with correct names for overview
df = df.rename(columns={
    'Unnamed: 0': 'name',
    'Airplane': 'flightTime',
    'Unnamed: 3': 'flightEmission',
    'Train': 'trainTime',
    'Unnamed: 6': 'trainEmission',
    'Bus': 'busTime',
    'Unnamed: 9': 'busEmission',
    'Coördinates': 'lat',
    'Unnamed: 12': 'lng',
    'Primary': 'primary'
})

print(df)

# Convert time columns to string format
df['flightTime'] = df['flightTime'].astype(str)
df['trainTime'] = df['trainTime'].astype(str)
df['busTime'] = df['busTime'].astype(str)

# Convert DataFrame to dictionary
data_dict = df.to_dict(orient='records')

# Specify the output JSON file path
output_json_file = '../data/location-data.json'

# Write JSON data to file with formatting
with open(output_json_file, 'w') as f:
    json.dump(data_dict, f, indent=4)

print(f"DataFrame saved to {output_json_file}")