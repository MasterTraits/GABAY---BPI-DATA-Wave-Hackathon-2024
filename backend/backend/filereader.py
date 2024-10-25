import csv
from PyPDF2 import PdfFileReader

class Filereader():
    def __init__(self):
        self.pdf_file = None
        self.csvfile = None
        self.csv_data = []

    def set_pdf(self, pdf_path):
        self.pdf_file = open(pdf_path, 'rb')
        self.pdf_reader = PdfFileReader(self.pdf_file)

    def set_csv(self, csv_path):
        self.csvfile = csv_path

    def PDFread(self):
        all_text = ""
        for page_num in range(self.pdf_reader.numPages):
            page = self.pdf_reader.getPage(page_num)
            text = page.extractText()
            all_text += text + "\n"
        return all_text

    def CSVread(self):
        with open(self.csvfile, 'r') as file:
            csv_data = list(csv.reader(file))
            self.csv_data = csv_data
        return self.csv_data


reader = Filereader()


pdf_path = "" # Path to the PDF file
csv_path = "" # Path to the CSV file

reader.set_pdf(pdf_path)
reader.set_csv(csv_path)

pdf_content = reader.PDFread()
csv_data = reader.CSVread()

print("PDF Content:")
print(pdf_content)

print("\nCSV Data:")
for row in csv_data:
    print(row)