/// <reference path='../../../app.d.ts' />
/// <amd-dependency path='restmod' />
import angular = require('angular');
import config = require('config');


export var moduleName = config.appName + '.model.utilities';
export var factoryName = config.appName + '.model.utilities.Utilities';

export interface IUtilities {

}

var _$q: ng.IQService; //Need to store this into a variable to be able to access it in a function provided to a config block

angular.module(moduleName, ['restmod'])
    .factory(factoryName, ['$http', '$q', ($http: ng.IHttpProvider, $q: ng.IQService) => {
        var utilities = {};
        return utilities;
    }])
    .config(['restmodProvider', (restmodProvider: ng.restmod.IRestmodProvider) => {
        function getChangedKeys(previousVersion: any, currentVersion: any) {
            var differentKeys = Object.create(null);
            Object.keys(previousVersion).forEach(key => {
                if (key[0] === '$') {
                    return;
                }
                var value = previousVersion[key];
                if (!angular.equals(value, currentVersion[key])) {
                    differentKeys[key] = currentVersion[key];
                }
            });

            Object.keys(currentVersion).forEach(key => {
                if (key[0] === '$') {
                    return;
                }
                if (differentKeys[key]) {
                    return; //We already know these keys don't match, no need to compare again
                }
                var value = currentVersion[key];
                if(!angular.equals(value, previousVersion[key])) {
                    differentKeys[key] = value;
                }
            });
            return toParamArray(differentKeys, '');
        }

        //restmod patch band-aid
        function toParamArray(objectToConvert: any, prefix: string) {
            var paramArray = Object.keys(objectToConvert);
            var resParamArray = new Array;
            var fullname: string;
            for (var i = 0; i < paramArray.length; ++i) {
                if (prefix) {
                    fullname = prefix + '.' + paramArray[i];
                } else {
                    fullname = paramArray[i];
                }
                resParamArray.push(fullname);

                if (paramArray[i].charAt(0) !== '$' && objectToConvert[paramArray[i]] && typeof objectToConvert[paramArray[i]] === 'object'
                    && !angular.isArray(objectToConvert[paramArray[i]])) {
                    resParamArray = resParamArray.concat(toParamArray(objectToConvert[paramArray[i]], fullname));
                }
            }
            return resParamArray;
        }

        //Custom unpacker to retain paging information and use the "results" property of collections
        restmodProvider.rebase({
            /**
            * Reverts the current state of the object to the specified version, if no previous version is provided, the
            * $_ultra_previous_version property is used instead
            */
            'Record.$revert': function(previousVersion: any) {
                var snapshot = previousVersion || this.$_op_previous_version;
                var changedKeys = getChangedKeys(snapshot, this.$encode('U'));
                //the snapshot data is not decoded, so we need to use $buildRaw to trigger the decoding.
                //We want to have apples-to-apples when we put it back into 'this'
                //e.g. without this a date field would be a string and then $patch/$save is called it would try and encode it
                //again and fail
                var snapshotModel = this.constructor.$buildRaw(snapshot);

                changedKeys.forEach(key => {
                    this[key] = snapshotModel[key];
                });
                return this;
            },

            /** Records the current state of the object. This does not need to be called directly in most cases. */
            'Record.$snapshot': function() {
                this.$_op_previous_version = this.$encode('U');
                return this.$_op_previous_version;
            },

            /** Issues a $save request (PATCH) with only new or updated fields since the last $snapshot */
            'Record.$patch': function(alwaysSaveKeys?: string[]) {
                var changedKeys = getChangedKeys(this.$_op_previous_version || {}, this.$encode('U'));
                if (alwaysSaveKeys && alwaysSaveKeys.length > 0) {
                    alwaysSaveKeys.forEach(key => {
                        if (changedKeys.indexOf(key) === -1) {
                            changedKeys.push(key);
                        }
                    });
                }

                if (changedKeys.length > 0) {
                    // This code is taking a copy of the object we're trying to save and the list of keys we want to save out of it
                    // and registers a hook so that we can then update the actual data being posted when restmod does the final
                    // save.  This is required to handle scenarios where we are saving the same object multiple times in a row
                    // with different changes.  Restmod will update the one instance of the object with the response from the first
                    // call before it then finally kicks off the subsequent call.  Since we're getting back the full object from the first
                    // call, our second call would merely patch the same values instead of the ones that were asked to be saved originally.
                    // hence - this ugly code here, updating the _req.data directly, before it gets posted.
                    this.$_op_patchHolder = {
                        data: this.$encode('U'),
                        changedKeys: changedKeys
                    };
                    var handler = function(_req: any) {
                        var changedKeys: string[];
                        var placeholder: any;
                        changedKeys = this.$_op_patchHolder.changedKeys;
                        placeholder = this.$_op_patchHolder.data;
                        changedKeys.forEach(key => {
                            _req.data[key] = placeholder[key];
                        });
                        this.$off('before-update', handler);
                    };
                    this.$on('before-update', handler);
                    this.$save(changedKeys);
                }
                return this;
            },

            $hooks: {
                'after-feed': function() {
                    this.$snapshot();
                }
            }
        });
    }]).run(['$q', ($q: ng.IQService) => {
        _$q = $q;
    }]);