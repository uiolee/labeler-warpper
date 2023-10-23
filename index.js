// config

const owner = "user_name";
const repo = "repo_name";

// the below settings are same as actions/labeler
const token = "github_token";
const configPath = "./.github/labeler.yml"; // config file of actions/labeler
const syncLabels = false;
const dot = false;
const prNumbers = "33";

const input = {
  token: "repo-token",
  configPath: "configuration-path",
  syncLabels: "sync-labels",
  dot: "dot",
  prNumbers: "pr-number",
};

const core = require("@actions/core");

const setInput = (key, val) => {
  const envKey = `INPUT_${key.replace(/ /g, "_").toUpperCase()}`;
  core.exportVariable(envKey, val);
};

const getInput = (key) => {
  return core.getInput(key);
};

const setEnv = core.exportVariable;

setEnv("GITHUB_REPOSITORY", `${owner}/${repo}`);

core.setSecret(token);
setInput(input.token, String(token));
setInput(input.configPath, String(configPath));
setInput(input.syncLabels, Boolean(syncLabels));
setInput(input.dot, Boolean(dot));
setInput(input.prNumbers, String(prNumbers));

for (const k of Object.values(input)) {
  core.debug(getInput(k));
}

// require("./labeler/lib/main.js");
require("./labeler/dist/index.js");
