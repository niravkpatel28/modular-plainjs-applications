type Config = {
  prefix: string;
};

const generateUniqueId: (config: Config) => string = (
  config: Config = { prefix: "" },
) => {
  const { prefix } = config;
  if (prefix) {
    return prefix + "-" + Math.random().toString(36).substring(2);
  }
  return Math.random().toString(36).substring(2);
};

export { generateUniqueId };
