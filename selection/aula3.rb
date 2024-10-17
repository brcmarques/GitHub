require "digest"

alphabet = 'abcdefghijklmnopqrstvwxyz'
string_to_try = ''

alphabet.chars.each do |letter|
    string_to_try = letter

    puts Digest::MD5.hexdigest(string_to_try)
  
end