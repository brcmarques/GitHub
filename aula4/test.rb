class Copo
  attr_accessor :volume, :material, :cor, :peso, :formato

  def initialize(volume, material, cor, peso, formato)
    @volume = volume
    @material = material
    @cor = cor
    @peso = peso
    @formato = formato
  end
end



copo1 = Copo.new(208, "vidro", "transparente", 100, "cilindrico")

copo2 = Copo.new(500, "plastico", "vermelho", 50, "conico")

puts copo1.material
puts copo2.material