const fs = require('fs/promises');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const banksFile = path.join(dataDir, 'banks.json');

const readBanks = async () => {
  try {
    const content = await fs.readFile(banksFile, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
};

const Bank = {
  async findAll() {
    return await readBanks();
  },

  async findByLoanType(type) {
    const banks = await readBanks();
    return banks
      .filter(bank => bank.loanTypes[type])
      .map(bank => ({
        _id: bank._id,
        name: bank.name,
        logo: bank.logo,
        details: bank.loanTypes[type]
      }));
  }
};

module.exports = Bank;
