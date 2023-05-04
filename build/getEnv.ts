// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};
  for (const envName in envConf) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') realName = Number(realName);
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
  }
  return ret;
}
