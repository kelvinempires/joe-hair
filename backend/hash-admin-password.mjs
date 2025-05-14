import bcrypt from "bcrypt";

const password = "999999999";

bcrypt.hash(password, 10).then((hash) => {
  console.log("ADMIN_PASSWORD_HASH:", hash);
});

