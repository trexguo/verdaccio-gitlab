// @flow

import type { VerdaccioGitlabConfig } from './gitlab';
import VerdaccioGitLab from './gitlab';
import type { PluginOptions } from '@verdaccio/types';

export default function (config: VerdaccioGitlabConfig, options: PluginOptions) {
  return new VerdaccioGitLab(config, options);
}
