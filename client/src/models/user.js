// client/src/models/User.js

class User {
  constructor({ id, username, email, createdAt, updatedAt }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = createdAt ? new Date(createdAt) : null;
    this.updatedAt = updatedAt ? new Date(updatedAt) : null;
  }

  getFormattedCreatedAt() {
    if (!this.createdAt) return 'N/A';
    return this.createdAt.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getDisplayName() {
    return this.username || this.email;
  }
}

export default User;