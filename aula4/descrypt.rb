require "digest"

alphabet = 'abcdefghijklmnopqrstuvwxyz'
target_md5 = 'f5a0d7f74b1d2ff848cb14ee8c8b82e6'
max_length = 12

# Função recursiva para tentar combinações
def find_string(current_string, alphabet, target_md5, max_length)
  # Verifica se a hash MD5 da string atual é o alvo
  if Digest::MD5.hexdigest(current_string) == target_md5
    puts "String encontrada: #{current_string}"
    exit
  end

  # Para a recursão se o comprimento máximo for atingido
  return if current_string.length >= max_length

  # Continua gerando combinações adicionando uma letra
  alphabet.chars.each do |letter|
    find_string(current_string + letter, alphabet, target_md5, max_length)
  end
end

threads = []

# Cria uma thread para cada letra inicial
alphabet.chars.each do |letter|
  threads << Thread.new do
    find_string(letter, alphabet, target_md5, max_length)
  end
end

# Espera todas as threads terminarem
threads.each(&:join)

puts "String não encontrada."
