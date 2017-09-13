# Takes a file CSV file called "data.csv" and outputs each row as a YAML file named after first column.
# Data in the first row of the CSV is assumed to be the column heading.
# Original work borrowed from: https://github.com/hfionte/csv_to_yaml

# Import the python library for parsing CSV files.
import csv

# Open our data file in read-mode.
csvfile = open('data.csv', 'r')

# list of valid columns
valid_columns = ['token', 'n_guests', 'comment']

# Save a CSV Reader object.
datareader = csv.reader(csvfile, delimiter=',', quotechar='"')

# Empty array for data headings, which we will fill with the first row from our CSV.
data_headings = []

# Loop through each row...
for row_index, row in enumerate(datareader):

	# If this is the first row, populate our data_headings variable.
	if row_index == 0:
		data_headings = row
		# Compile a line of YAML text from our headings list 
                #   and the text of the current cell, followed by a linebreak.
		# Heading text is converted to lowercase. Spaces are converted 
                #    to underscores and hyphens are removed.
		# In the cell text, line endings are replaced with commas.
		cell_heading = {i:dat_head.lower().replace(" ", "_").replace("-", "_").replace("%", "percent").replace("$", "").replace(",", "") for i,dat_head in enumerate(data_headings) if dat_head in valid_columns}

	# Othrwise, create a YAML file from the data in this row...
	else:
		# Open a new file with filename based on the first column
		filename = row[0].lower().replace(" ", "_") + '.md'
		new_yaml = open('_rsvp/'+ filename, 'w')

		# Empty string that we will fill with YAML formatted text based on data extracted from our CSV.
		yaml_text = ""
		yaml_text += "---\n"
		yaml_text += "layout: rsvp \n"

		# Loop through the headings and parse the current row
		for cell_index,cell_head in cell_heading.items():
			cell = row[cell_index].replace("\n", ", ") 

			# only add frontmatter for nonempty cells (empty strings return false)
			if cell:
				
				# prepend the heading column
				cell_text = cell_head + ": " + cell + "\n"

				# Add this line of text to the current YAML string.
				yaml_text += cell_text

		# Write our YAML string to the new text file and close it.
		new_yaml.write(yaml_text + "---\n")
		new_yaml.close()

# We're done! Close the CSV file.
csvfile.close()
