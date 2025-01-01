import bcrypt from 'bcryptjs';

const passwordUtil = () => ({
  generateHash: (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),

  validatePassword: (password: string, toCompare: string) =>
    bcrypt.compareSync(password, toCompare),

  generateRandomString: () => {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  generateRandomString2: () => {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 50; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
});

export default passwordUtil;
