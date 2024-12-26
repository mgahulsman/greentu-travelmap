import pandas as pd
import json
import datetime
import numpy as np

# Load the Excel file
excel_file = 'data/location-data.xlsx'  
sheet_name = 'Map'  

# The name of the output file
output_json_file = 'data/location-data.json'  

# Read Excel into pandas DataFrame
df_begin = pd.read_excel(excel_file, sheet_name=sheet_name)

# Drop empty columns and rows
df = df_begin.dropna(axis=1, how='all')

# Rename columns for clarity
df = df.rename(columns={
    'Unnamed: 0': 'name',
    'Airplane': 'flightTime',
    'Unnamed: 3': 'flightEmission',
    'Train': 'trainTime',
    'Unnamed: 6': 'trainEmission',
    'Bus': 'busTime',
    'Unnamed: 9': 'busEmission',
    'Coordinates': 'lat',
    'Unnamed: 12': 'lng',
    'Primary': 'primary'
})

# Create conditions for each set of columns
flight_filled = df['flightTime'].notna() & df['flightEmission'].notna()
train_filled = df['trainTime'].notna() & df['trainEmission'].notna()
bus_filled = df['busTime'].notna() & df['busEmission'].notna()

# Combine the conditions and filter the DataFrame
df_filtered = df[flight_filled | train_filled | bus_filled]

# Drop rows if 'name', 'lat', 'lng', or 'primary' is empty
df = df_filtered.dropna(subset=['name', 'lat', 'lng', 'primary'])

# Function to format time
def format_time(time_series):
    days = time_series.dt.components['days']
    hours = time_series.dt.components['hours']
    minutes = time_series.dt.components['minutes']
    return days.astype(str).str.zfill(2) + ':' + hours.astype(str).str.zfill(2) + ':' + minutes.astype(str).str.zfill(2)

time_columns = ['flightTime', 'trainTime', 'busTime']  
for column in time_columns:
    df[column] = df[column].fillna("00:00:00")
    print(df[column])
    # Convert datetime.time objects to strings and then to timedeltas
    df[column] = [time_obj.strftime('%H:%M:%S') if isinstance(time_obj, datetime.time) else time_obj for time_obj in df[column]]
    print(df[column])
    df[column] = pd.to_timedelta(df[column])
    # Apply the format_time function
    df[column] = format_time(df[column]) 

df.replace(np.nan, 0, inplace=True)
df_end = df

# Convert DataFrame to dictionary
data_dict = df_end.to_dict(orient='records')

# Write JSON data to file with formatting
with open(output_json_file, 'w') as f:
    json.dump(data_dict, f, indent=4)  

print(
    f"The data looked like this at the beginning:\n\n"
    f"{df_begin.head(10)}\n\n"  
    f"And after data processing like this:\n\n"
    f"{df_end.head(10)}\n\n"  
    f"The data has been successfully saved in: {output_json_file}"  
)