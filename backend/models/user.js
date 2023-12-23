const db = require('../util/database');

module.exports = class User {
  constructor(firstName,lastName, email, password,phone,adresse,image) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.adresse = adresse
    this.image = image
  }


  
  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static async save(user) {
    try {
      const result = await db.execute('SELECT * FROM users WHERE email = ?', [user.email]);
        // Check if there are any records with the specified email
      const rowsWithData = result[0] || [];
      if (rowsWithData.length === 0) {
        // The email doesn't exist, so we can proceed with the insertion

        console.log("here is the user" , user)
        return db.execute(
          'INSERT INTO users (firstName,lastName, email, password,phone,adresse,image) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [user.firstName, user.lastName, user.email, user.password,user.phone,user.adresse,user.image]
        );
      } else {
        // The email already exists, so throw an error
        throw new Error('User with the provided email already exists.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  
};
