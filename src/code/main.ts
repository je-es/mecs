#!/usr/bin/env node

/**
 * @name                                    main.ts
 * @description                             the main file (entry point)
 * @author                                  Maysara Elshewhey
 * @repo                                    https://github.com/je-es/mecs
 *
 * @note                                    This script follows the `MECS` code style
*/


/* ---------------------------------------- PACK ----------------------------------------  */

    import { cli }                          from '@je-es/cli';
    import { exec }                         from 'child_process';
    import { join }                         from 'path';
    import { moveRemove }                   from 'rimraf';

    const asyncExec = (cmd : string) => new Promise((resolve, reject) => exec(cmd, (err) => err ? reject(err) : resolve('done')));

    cli
    ({
        info:
        {
            name            : 'mecs',
            description     : 'packDesc',
            version         : '0.0.0',
        },

        actions:
        {
            create:
            {
                flag        : '-c',
                alias       : '--create',
                args        : ['name'],
                required    : ['as'],
                callback    : async ({ name, type }) =>
                {
                    try
                    {
                        // check for name and type
                        {
                            if(typeof name !== 'string' || name.length < 1)
                            throw new Error('name must be a not empty string');

                            if(typeof type !== 'string' || type.length < 1)
                            throw new Error('type must be a not empty string');
                        }

                        // cloning project
                        {
                            const reopURL = `https://github.com/maysara-elshewehy/${type === 'npm' ? 'mecs-npm-package' : 'mecs-electron-app'}`;

                            const res = await asyncExec(`git clone ${reopURL} ${name}`);

                            if(res !== 'done')
                            throw new Error('Failed to clone project');

                            // Use rimraf to remove .git folder
                            moveRemove(join(process.cwd(), name, '.git'));

                            console.log(`\nCloned project: [${name}] as [${type}] in [${process.cwd()}]\n`);
                        }
                    }

                    catch (error)
                    {
                        console.error(`Create Callback Throwed: ${error}`);
                    }
                }
            },

            as: { args : ['type'] }
        }
    });

/* ---------------------------------------- ---- ----------------------------------------  */