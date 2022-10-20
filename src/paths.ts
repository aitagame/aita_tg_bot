import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
    '@tools': `${__dirname}/tools`,
    '@handlers': `${__dirname}/handlers`,
    '@templates': `${__dirname}/templates`,
    '@sql': `${__dirname}/sql`,
    '@bot': `${__dirname}/bot`,
    '@src': `${__dirname}/`,
    'types': `${__dirname}/types`,
});