module.exports = (api, options, cwd) => {
  api.assertVersion(7);

  let caller = "";

  api.caller((instance) => {
    if (instance != null) {
      caller = instance.name;
    }

    return true;
  });

  const env = api.env();
  api.cache.using(() =>
    JSON.stringify({
      env,
      caller,
      cwd,
      options,
      NODE_ENV: process.env.NODE_ENV,
      BABEL_ENV: process.env.BABEL_ENV
    })
  );

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          forceAllTransforms: true,
          targets: {
            node: true
          }
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      "add-module-exports",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-object-rest-spread"
    ]
  };
};
