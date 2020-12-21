const Account = (() => {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  function anonymize() {
    const chars = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let name = '';
  
    for (let count = 0; count <= 16; count++) {
      name += chars[Math.floor(Math.random() * chars.length)];
    }
  
    return name;
  }

  function isValidPassword(attempt) {
    return attempt === userPassword;
  }

  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      return this;
    },

    reanonymize(pw) {
      if (isValidPassword(pw)) {
        this.displayName = anonymize();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    firstName(pw) {
      if (isValidPassword(pw)) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName(pw) {
      if (isValidPassword(pw)) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },

    email(pw) {
      if (isValidPassword(pw)) {
        return userEmail;
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword(oldPassword, newPassword) {
      if (isValidPassword(oldPassword)) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },
  };
})();

const fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

const displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));                         // returns true
console.log(fooBar.displayName);
console.log(displayName === fooBar.displayName);   // logs false
