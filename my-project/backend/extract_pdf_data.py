import pdfplumber
import re
import sys
import json

def extract_pdf_data(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()

        # Extract data using regular expressions
        company_name = re.search(r'Company: (.*)', text)
        due_date = re.search(r'Due Date: (\d{2}/\d{2}/\d{4})', text)
        amount_due = re.search(r'Amount Due: (\d+)', text)

        return {
            "companyName": company_name.group(1) if company_name else "Unknown Company",
            "dueDate": due_date.group(1) if due_date else "Unknown Date",
            "amountDue": float(amount_due.group(1)) if amount_due else 0.0
        }

if __name__ == '__main__':
    pdf_path = sys.argv[1]
    extracted_data = extract_pdf_data(pdf_path)
    print(json.dumps(extracted_data))  # Output to stdout for Node.js to capture
