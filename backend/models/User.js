const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const dataDir = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.json');

const ensureUsersFile = async () => {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(usersFile);
  } catch (error) {
    await fs.writeFile(usersFile, '[]');
  }
};

const readUsers = async () => {
  await ensureUsersFile();
  const content = await fs.readFile(usersFile, 'utf8');

  try {
    const users = JSON.parse(content);
    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
};

const writeUsers = async (users) => {
  await ensureUsersFile();
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
};

class UserRecord {
  constructor(user) {
    Object.assign(this, user);
    this._id = user._id;
  }

  async matchPassword(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  }
}

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;
  return safeUser;
};

const User = {
  async findOne(query) {
    const users = await readUsers();
    const user = users.find((entry) =>
      Object.entries(query).every(([key, value]) => entry[key] === value)
    );

    return user ? new UserRecord(user) : null;
  },

  async create({ name, email, password }) {
    const users = await readUsers();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      _id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(user);
    await writeUsers(users);

    return new UserRecord(user);
  },

  async findById(id) {
    const users = await readUsers();
    const user = users.find((entry) => entry._id === id);

    return {
      select(field) {
        if (field === '-password') {
          return sanitizeUser(user);
        }

        return user ? { ...user } : null;
      },
    };
  },
};

module.exports = User;
