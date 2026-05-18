const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.join(__dirname, '..', 'data');
const loansFile = path.join(dataDir, 'loans.json');

const ensureLoansFile = async () => {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(loansFile);
  } catch (error) {
    await fs.writeFile(loansFile, '[]');
  }
};

const readLoans = async () => {
  await ensureLoansFile();
  const content = await fs.readFile(loansFile, 'utf8');

  try {
    const loans = JSON.parse(content);
    return Array.isArray(loans) ? loans : [];
  } catch (error) {
    return [];
  }
};

const writeLoans = async (loans) => {
  await ensureLoansFile();
  await fs.writeFile(loansFile, JSON.stringify(loans, null, 2));
};

const Loan = {
  async findOne(query) {
    const loans = await readLoans();
    const loan = loans.find((entry) =>
      Object.entries(query).every(([key, value]) => entry[key] === value)
    );

    return loan ? { ...loan } : null;
  },

  async findById(id) {
    const loans = await readLoans();
    const loan = loans.find((entry) => entry._id === id);
    return loan ? { ...loan } : null;
  },

  async find(query = {}) {
    const loans = await readLoans();
    return loans.filter((entry) =>
      Object.entries(query).every(([key, value]) => entry[key] === value)
    );
  },

  async create(loanData) {
    const loans = await readLoans();

    const loan = {
      _id: crypto.randomUUID(),
      ...loanData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    loans.push(loan);
    await writeLoans(loans);

    return loan;
  },
};

module.exports = Loan;
