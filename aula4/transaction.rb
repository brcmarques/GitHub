class Transaction
  attr_accessor :amount, :created_at, :from, :to

  def initialize(amount, created_at, from, to)
    @amount = amount
    @created_at = created_at
    @from = from
    @to = to

    if @from
    @from.to = self
    end
  end
end

transaction1 = Transaction.new(100, "oct 9", nil, nil)
transaction2 = Transaction.new(200, "oct 10", transaction1, nil)
transaction3 = Transaction.new(300, "oct 11", transaction2, nil)
transaction4 = Transaction.new(150, "oct 12", transaction3, nil)

puts transaction3.from.to.from.from.to.created_at


