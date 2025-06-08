// src/models/User.js
export default class User {
  /**
   * @param {Object} params
   * @param {number|string} params.id
   * @param {string} params.name
   * @param {string} params.email
   * @param {string} params.username
   * @param {string} params.password
   * @param {string} params.created_at — timestamp ISO string
   */
  constructor({ id, name, email, username, password, created_at }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;         
    this.createdAt = new Date(created_at);
  }
}
