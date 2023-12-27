const generateVerification = (length) => {
    return new Promise((resolve, reject) => {
      const code = Math.floor(
        Math.pow(10, length - 1) +
          Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
      );
      resolve(code);
    });
  }

module.exports = generateVerification;