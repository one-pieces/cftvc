import modelsModule = require('./models/models-module');
export var moduleName = modelsModule.name;

export import actor = require('./models/actor/actor-model');
export import creator = require('./models/creator/creator-model');
export import user = require('./models/user/user-model');
export import work = require('./models/work/work-model');