const path = require('path');
const fsp = require('fs-promise');

module.exports = (config = {projectFileName: '.dropstack.json', globalFileName: '.settings.json'}) => {
  const projectSettingsFile = path.resolve(process.cwd(), config.projectFileName);
  const globalSettingsFile = path.resolve(__dirname, config.globalFileName);

  process.on('SIGINT', () => process.exit(0));

  return {
    load: data => load(projectSettingsFile, globalSettingsFile, data),
    save: data => save(projectSettingsFile, globalSettingsFile, data),
    remove: () => removeProjectFile(projectSettingsFile),
    removeProjectFile: () => removeProjectFile(projectSettingsFile),
    removeGlobalFile: () => removeGlobalFile(globalSettingsFile),
  };
}

function load(projectFileName, globalSettingsFile, settings = {}) {
  return Promise.all([
      fsp.readJSON(globalSettingsFile).catch(err => {}),
      fsp.readJSON(projectFileName).catch(err => {}),
    ])
    .then(data => data.reduce((state, x) => Object.assign(state, x), Object.assign({}, settings)))
    .then(data => Object.assign(data, settings))
    .catch(console.err);
}

function save(projectFileName, globalSettingsFile, settings = {}) {
  const globalSettings = {username: settings.username, token: settings.token};
  const projectSettings = Object.assign({}, settings);
  delete projectSettings.message;
  delete projectSettings.password;
  delete projectSettings.tarPath;
  delete projectSettings.instances;
  delete projectSettings.token;
  return Promise.all([
      fsp.writeJSON(globalSettingsFile, globalSettings),
      fsp.writeJSON(projectFileName, projectSettings),
    ])
    .catch(_ => settings)
    .then(() => settings)
}

function removeProjectFile(projectFileName) {
  return fsp.remove(projectFileName);
}

function removeGlobalFile(globalFileName) {
  return fsp.remove(globalFileName);
}
