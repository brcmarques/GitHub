README for project-hash.py and project-hash.html

This project consists of two files, project-hash.py and project-hash.html, that work together to find a password based on a given MD5 checksum and update a web page with the password if it is found.
project-hash.py
Required Libraries

    hashlib
    itertools
    threading
    os
    BeautifulSoup

Usage

    Run the script using the command python project-hash.py
    Enter the MD5 checksum of the password when prompted
    The script will create threads for each possible password length from 1 to 9 and iterate through all combinations of alphanumeric characters until the password is found or all combinations have been tried.
    If the password is found, it will be displayed in the console and the script will update the password on the web page specified by the path variable.
    If the password is not found, the script will remove the password from the web page.

How it Works

    The script starts by prompting the user to enter the MD5 checksum of the password they want to find.
    It then creates threads for each possible password length from 1 to 9 and iterates through all combinations of alphanumeric characters until the password is found or all combinations have been tried.
    If the password is found, the script sets the global variables senha_encontrada and senha to True and the found password, respectively, and displays the password in the console.
    The script then updates the password on the web page specified by the path variable by opening the HTML file, finding the p element with the ID senha, and updating its text with the found password. It then saves the updated HTML file.
    If the password is not found, the script removes the password from the web page by setting the text of the p element with the ID senha to an empty string.

project-hash.html
Usage

The HTML file is a template for displaying the password found by the script. The password is inserted into the p element with the ID senha. The file can be edited to change the style or content of the web page.
How it Works

    The HTML file is a template for displaying the password found by the script.
    The password is inserted into the p element with the ID senha.
    The atualizarSenha JavaScript function updates the text of the p element with the given password.