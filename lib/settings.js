const path = require('path');
const fse = require('fs-extra');
const os = require('os');

module.exports = projectFileName => {
  process.on('SIGINT', () => process.exit(0));

  projectFileName = projectFileName || '.dropstack.json';
  const globalFileName = '.settings.json';
  const projectSettingsFile = path.resolve(process.cwd(), projectFileName);
  const globalSettingsFile = path.resolve(os.userInfo().homedir, globalFileName);

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
      fse.readJson(globalSettingsFile).catch(err => {}),
      fse.readJson(projectFileName).catch(err => {}),
    ])
    .then(data => data.reduce((state, x) => Object.assign(state, x), Object.assign({}, settings)))
    .then(data => {
      data.variables = Array.isArray(data.variables) ? data.variables.join(',') : data.variables;
      settings.variables = Array.isArray(settings.variables) ? settings.variables.join(',') : settings.variables;
      if(settings.alias) data.alias = settings.alias;
      if(settings.domain) data.domain = settings.domain;
      if(settings.instances) data.instances = settings.instances;
      if(settings.variables) data.variables = settings.variables;
      if(settings.https) data.https = settings.https;
      if(settings.aliveEndpoint) data.aliveEndpoint = settings.aliveEndpoint;
      if(settings.type) data.type = settings.type;
      if(settings.url) data.url = settings.url;
      if(settings.stateful) data.stateful = settings.stateful;
      if(settings.mappings) data.mappings = settings.mappings;
      if(settings.excludes && settings.excludes.length > 0) data.excludes = settings.excludes;
      if(!data.url) data.url = `https://api.cloud.dropstack.run`;
      return data;
    })
    .catch(err => console.error(err.message));
}

function save(projectFileName, globalSettingsFile, settings = {}) {
  const globalSettings = {username: settings.username, token: settings.token, url: settings.url, version: settings.version, 'support-stateful': settings['support-stateful']};
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
  delete projectSettings.signedUpAt;
  delete projectSettings.version;
  delete projectSettings['support-stateful'];

  return Promise.all([
      fse.writeJson(globalSettingsFile, globalSettings),
      fse.writeJson(projectFileName, projectSettings),
    ])
    .catch(_ => settings)
    .then(() => settings)
}

function removeProjectFile(projectFileName) {
  return fse.remove(projectFileName);
}

function removeGlobalFile(globalFileName) {
  return fse.remove(globalFileName);
}
