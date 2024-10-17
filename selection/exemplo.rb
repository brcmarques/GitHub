require "digest"

alphabet = 'abcdefghijklmnopqrstuvwxyz'
string_to_try = ''

alphabet.chars.each do |letter1|
  string_to_try = letter1
  puts "String: #{string_to_try} MD5: #{Digest::MD5.hexdigest(string_to_try)}"

  alphabet.chars.each do |letter2|
    string_to_try = letter1 + letter2
    puts "String: #{string_to_try} MD5: #{Digest::MD5.hexdigest(string_to_try)}"

    alphabet.chars.each do |letter3|
      string_to_try = letter1 + letter2 + letter3
      puts "String: #{string_to_try} MD5: #{Digest::MD5.hexdigest(string_to_try)}"

      alphabet.chars.each do |letter4|
        string_to_try = letter1 + letter2 + letter3 + letter4
        puts "String: #{string_to_try} MD5: #{Digest::MD5.hexdigest(string_to_try)}"

        alphabet.chars.each do |letter5|
          string_to_try = letter1 + letter2 + letter3 + letter4 + letter5
          
          md5_hash = Digest::MD5.hexdigest(string_to_try)

          # Corrigindo a condição if
          if md5_hash == '5cbdf2270c4c43e0840e9a4dc6aeb28d'
            puts 'Achei!'
            puts "String encontrada: #{string_to_try}"
            exit
          else
            puts "String: #{string_to_try} MD5: #{md5_hash}"
          end
        end
      end
    end 
  end
end
