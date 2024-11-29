import csv

# the source of the csv file used in order to make the 
# word - definition database is 
# https://www.bragitoff.com/2016/03/english-dictionary-in-csv-format/

def write_words_and_definitions(csv_file, output_file):
    with open(csv_file, 'r') as csvfile, open(output_file, 'w') as outfile:
        reader = csv.reader(csvfile) 
        for row in reader:
            word, definition = row[0], row[2]
            definition = definition.replace('"', '')
            definition = definition.replace('`', '')
            definition = definition.replace("'", '')

            outfile.write(f'("{word}", "{definition}"),\n')

if __name__ == "__main__":
    csv_file = "dictionary.csv"  
    output_file = "output.txt"  
    write_words_and_definitions(csv_file, output_file)