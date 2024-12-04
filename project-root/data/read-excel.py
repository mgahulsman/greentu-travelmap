import pandas as pd
import json
import datetime

# Load the Excel file
excel_file = 'project-root/data/location-data.xlsx'  
sheet_name = 'Map'  

# The name of the output file
output_json_file = 'project-root/data/location-data.json'  

try:
    # Read Excel into pandas DataFrame
    df_begin = pd.read_excel(excel_file, sheet_name=sheet_name)
except FileNotFoundError:
    print(f"Error: File not found: {excel_file}")  
    exit(1)  # Stop the script if the file is not found
except Exception as e:
    print(f"Error reading the Excel file: {e}")  
    exit(1)

try:
    # Drop empty columns and rows
    df = df_begin.dropna(axis=1, how='all').dropna()

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

    # Function to format time
    def format_time(time_series):
        days = time_series.dt.components['days']
        hours = time_series.dt.components['hours']
        minutes = time_series.dt.components['minutes']
        return days.astype(str).str.zfill(2) + ':' + hours.astype(str).str.zfill(2) + ':' + minutes.astype(str).str.zfill(2)

    time_columns = ['flightTime', 'trainTime', 'busTime']  
    for column in time_columns:
        try:
            # Convert datetime.time objects to strings and then to timedeltas
            df[column] = [time_obj.strftime('%H:%M:%S') if isinstance(time_obj, datetime.time) else time_obj for time_obj in df[column]]
            df[column] = pd.to_timedelta(df[column])
            # Apply the format_time function
            df[column] = format_time(df[column]) 
        except Exception as e:
            print(f"Error converting column '{column}': {e}")  
            exit(1)

    df_end = df  

    # Convert DataFrame to dictionary
    data_dict = df_end.to_dict(orient='records')

    # Write JSON data to file with formatting
    with open(output_json_file, 'w') as f:
        json.dump(data_dict, f, indent=4)  

except Exception as e:
    print(f"Error during data processing: {e}")  
    exit(1)

print(
    f"The data looked like this at the beginning:\n\n"
    f"{df_begin}\n\n"  
    f"And after data processing like this:\n\n"
    f"{df_end}\n\n"  
    f"The data has been successfully saved in: {output_json_file}"  
)
