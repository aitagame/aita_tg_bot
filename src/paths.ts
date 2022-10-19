import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
    '@tools': `${__dirname}/tools`,
    '@handlers': `${__dirname}/handlers`,
    '@templates': `${__dirname}/templates`,
});