import { ProxyOptions } from 'vite';

/**
 * Generate proxy
 * @params list
 */
type ProxyItem = [string, string];
type ProxyList = ProxyItem[];
type ProxyTargetList = Record<string, ProxyOptions>;

export function createProxy(list: ProxyList = []) {
  let ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(`/^${prefix}/`, ''),
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
