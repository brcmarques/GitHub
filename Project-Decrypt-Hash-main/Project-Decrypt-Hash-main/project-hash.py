import hashlib
import itertools
import threading
import os
from bs4 import BeautifulSoup

caracteres = 'abcdefghijklmnopqrstuvwxyz'
checksum = input("Digite o checksum: ")
senha_encontrada = False
senha = ''
lock = threading.Lock()

def encontrar_senha(tamanho):
    global senha_encontrada, senha
    for comb in itertools.product(caracteres, repeat=tamanho):
        if senha_encontrada:
            break
        tentativa_senha = ''.join(comb)
        hash_md5 = hashlib.md5()
        hash_md5.update(tentativa_senha.encode('utf-8'))
        hash_md5_senha = hash_md5.hexdigest()
        if hash_md5_senha == checksum:
            with lock:
                senha_encontrada = True
                senha = tentativa_senha
                print(f"Senha encontrada: {senha}")
            break
    print(f"Thread para tamanho {tamanho} feita.")

#irá criar uma nova thread para cada tamanho possível de senha
threads = [] #lista vazia para armazenar as threads
for tamanho in range(1, 10):
    thread = threading.Thread(target=encontrar_senha, args=(tamanho,)) 
    threads.append(thread)
    thread.start()

# Esperar até que todas as threads terminem
for thread in threads:
    thread.join()

# caminho  do arquivo html
path = '/var/www/html/index.nginx-debian.html'

# verificar se a senha foi encontrada
if senha_encontrada:
    # abrir o arquivo html
    with open(path, 'r') as file:
        # ler o conteúdo do arquivo
        content = file.read()
        # atualizar a senha no conteúdo do arquivo
        soup = BeautifulSoup(content, 'html.parser') # elemento a ser mudado é html
        p = soup.find(id='senha') 
        p.string = senha
        content = str(soup)
        print(f"Conteúdo atualizado: {content}")
    # sobrescrever o arquivo html com o conteúdo atualizado
    with open(path, 'w') as file:
        file.write(content)
else:
    # se a senha não foi encontrada, remover a senha do arquivo html
    with open(path, 'r') as file:
        # ler o conteúdo do arquivo
        content = file.read()
        # atualizar a senha no conteúdo do arquivo
        soup = BeautifulSoup(content, 'html.parser')
        p = soup.find(id='senha')
        p.string = ''
        content = str(soup)
    # sobrescrever o arquivo html com o conteúdo atualizado
    with open(path, 'w') as file:
        file.write(content)

        


