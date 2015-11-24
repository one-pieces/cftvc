/// <reference path='../../node_modules/node-shared-typescript-defs/requirejs/require.d.ts' />

(() => {
    requirejs.onError = function(err: any) {
        console.error(err && (err.stack || err.message || err.toString()) || err);
        throw err;
    };

    require.config({
        baseUrl: './',
        paths: {
            shared_require_config: 'config/shared_require_config'
        }
    });

    require(['shared_require_config']);
})();