import {BLOCKED_MODULES} from '../constants/loadingModules';

export const showGlobalLoader = loadingModules => !!BLOCKED_MODULES.find(m => loadingModules[m]);

export const showModuleLoader = (loadingModules, currentModule) =>
    !showGlobalLoader(loadingModules) && !!loadingModules[currentModule];