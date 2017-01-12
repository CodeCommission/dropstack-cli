const path = require('path');
const fsp = require('fs-promise');

module.exports = (config = {projectFileName: '.dropstack.json', globalFileName: '.settings.json'}) => {
  const projectSettingsFile = path.resolve(process.cwd(), config.projectFileName);
  const globalSettingsFile = path.resolve(__dirname, config.globalFileName);

  return {
    load: data => load(projectSettingsFile, globalSettingsFile, data),
    save: data => save(projectSettingsFile, globalSettingsFile, data),
  };
}

function load(projectFileName, globalSettingsFile, settings = {}) {
  return Promise.all([
      fsp.readJSON(globalSettingsFile).catch(err => {}),
      fsp.readJSON(projectFileName).catch(err => {}),
    ])
    .then(data => {
      return data.reduce((state, x) => {
        Object.assign(state, x)
        return state;
      }, settings);
    })
    .catch(console.err);
}

function save(projectFileName, globalSettingsFile, settings = {}) {
  const globalSettings = {username: settings.username, token: settings.token};
  const projectSettings = Object.assign({}, settings);
  delete projectSettings.message;
  delete projectSettings.password;
  delete projectSettings.tarPath;
  return Promise.all([
      fsp.writeJSON(globalSettingsFile, globalSettings),
      fsp.writeJSON(projectFileName, projectSettings),
    ])
    .catch(_ => settings)
    .then(() => settings)
}
