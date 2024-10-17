import hashlib
import itertools
import time

caracteres = 'abcdefghijklmnopqrstuvwxyz'
checksum = "aa7f2fbbd15b59d2cd6be3e3cf3bc2f5"

# Medindo o tempo de execução
start_time = time.time()

for tamanho in range(1, 10):
    for comb in itertools.product(caracteres, repeat=tamanho):
        senha = ''.join(comb)
        hash_md5 = hashlib.md5()
        hash_md5.update(senha.encode('utf-8'))
        hash_md5_senha = hash_md5.hexdigest()
        
        if hash_md5_senha == checksum:
            print(f"Senha encontrada: {senha}")
            print(f"Tempo total de execução: {time.time() - start_time:.2f} segundos")
            break
    else:
        continue  # Este continua para o próximo tamanho se a senha não for encontrada
    break  # Este quebra o loop se a senha foi encontrada
else:
    print("Senha não encontrada.")
