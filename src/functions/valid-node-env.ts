import { TYPE_NODE_ENV } from '../types';

export function validNodeEnv(input: string): TYPE_NODE_ENV {
  const validNodeEnvs: TYPE_NODE_ENV[] = [
    'production',
    'dev',
    'test',
    'paranoid',
  ];

  if (validNodeEnvs.includes(input as TYPE_NODE_ENV)) {
    return input as TYPE_NODE_ENV;
  } else {
    return 'dev'; // Valeur par défaut si l'entrée n'est pas valide
  }
}
