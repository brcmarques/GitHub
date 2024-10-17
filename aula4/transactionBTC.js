class TransactionBTC {
    constructor(hash, createdAt, position, value,  from = null, to = null) {
        this.hash = hash;
        this.createdAt = createdAt;
        this.position = position;
        this.value = value;
        this.from = from;
        this.to = to;

        if (this.from) {
            this.from.to = this;
        }
    }
}

const bitcoin1 = new TransactionBTC("5d41402abc4b2a76b9719d911017c592", "oct 9", 001, "R$ 5.130,00", null, null);
const bitcoin2 = new TransactionBTC("7d793037a0760186574b0282f2f25718", "oct 10", 002, "R$ 7.090,00", bitcoin1, null);
const bitcoin3 = new TransactionBTC("f957c0b74f80b9b20d5f8232e97c7e8f", "oct 11", 003, "R$ 1.050,00", bitcoin2, null);
const bitcoin4 = new TransactionBTC("1f0e3bdd5f3c8d0e30e26e83b2b5b0a3", "oct 12", 004, "R$ 9.580,00", bitcoin3, null);

console.log(`Hash: ${bitcoin4.from.to.from.to.hash}, Position: ${bitcoin3.to.position}, Value: ${bitcoin2.to.to.value}`);
//console.log(bitcoin3.position);