export default url => {
  if (
    url ===
    "https://gist.github.com/weirdpattern/ce54fdb1e5621b5966e146026995b974.json"
  ) {
    return JSON.stringify(require("./1.json"));
  } else if (
    url ===
    "https://gist.github.com/weirdpattern/ce54fdb1e5621b5966e146026995b974.json?file=syntax.text"
  ) {
    return JSON.stringify(require("./2.json"));
  } else if (
    url ===
    "https://gist.github.com/weirdpattern/ce54fdb1e5621b5966e146026995b974.json?file=example.sh"
  ) {
    return JSON.stringify(require("./3.json"));
  }
  return false;
};
