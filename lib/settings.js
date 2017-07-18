const path = require('path');
const fsp = require('fs-promise');
const os = require('os');

module.exports = projectFileName => {
  projectFileName = projectFileName || '.dropstack.json';
  const globalFileName = '.settings.json';
  const projectSettingsFile = path.resolve(process.cwd(), projectFileName);
  const globalSettingsFile = path.resolve(os.userInfo().homedir, globalFileName);

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
    .then(data => {
      data.variables = Array.isArray(data.variables) ? data.variables.join(',') : data.variables;
      settings.variables = Array.isArray(settings.variables) ? settings.variables.join(',') : settings.variables;
      if(settings.alias) data.alias = settings.alias;
      if(settings.instances) data.instances = settings.instances;
      if(settings.variables) data.variables = settings.variables;
      if(settings.https) data.https = settings.https;
      if(settings.aliveEndpoint) data.aliveEndpoint = settings.aliveEndpoint;
      if(settings.type) data.type = settings.type;
      if(settings.url) data.url = settings.url;
      if(!data.url) data.url = `https://api.cloud.dropstack.run`;
      return data;
    })
    .catch(console.err);
}

function save(projectFileName, globalSettingsFile, settings = {}) {
  const globalSettings = {username: settings.username, token: settings.token, url: settings.url};
  const projectSettings = Object.assign({}, settings, {variables: Array.isArray(settings.variables) ? settings.variables.join(',') : settings.variables});

  delete projectSettings.message;
  delete projectSettings.password;
  delete projectSettings.tarPath;
  delete projectSettings.token;
  delete projectSettings.url;
  delete projectSettings.username;
  delete projectSettings.id;
  delete projectSettings.metadata;
  delete projectSettings.login;
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
