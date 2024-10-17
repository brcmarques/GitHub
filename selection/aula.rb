require "digest"

alphabet = 'abcdefghijklmnopqrstuvwxyz'
string_to_try = ''

alphabet.chars.each do |letter1|
  string_to_try = letter1
  puts "string " + string_to_try + " MD5: " + Digest::MD5.hexdigest(string_to_try)

  alphabet.chars.each do |letter2|
    string_to_try = letter1 + letter2
    puts "string " + string_to_try + " MD5: " + Digest::MD5.hexdigest(string_to_try)

    alphabet.chars.each do |letter3|
      string_to_try = letter1 + letter2 + letter3
      puts "string " + string_to_try + " MD5: " + Digest::MD5.hexdigest(string_to_try)

      alphabet.chars.each do |letter4|
        string_to_try = letter1 + letter2 + letter3 + letter4
        puts "string " + string_to_try + " MD5: " + Digest::MD5.hexdigest(string_to_try)

        alphabet.chars.each do |letter5|
          string_to_try = letter1 + letter2 + letter3 + letter4 + letter5
          
          md5_hash = Digest::MD5.hexdigest(string_to_try)

          if md5_hash == '5d41402abc4b2a76b9719d911017c592'
            puts 'achei'
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