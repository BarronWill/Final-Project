def process_location(location):
  # Ensure the input is a string before processing
  location_str = str(location)
  if location_str == 'n/a, n/a, n/a':
    return None
  parts = [part.strip() for part in location_str.split(',')]
  valid_parts = [part for part in parts if part != 'n/a']
  if not valid_parts:
    return None
  elif len(valid_parts) == 1:
    return valid_parts[0]
  else:
    return valid_parts[-1]