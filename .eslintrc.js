module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "google"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-inner-declarations": "off",
        "no-extra-boolean-cast": "off",
        "max-len": [2, 130],
        "valid-jsdoc": "off",
        "camelcase": "off",
        "linebreak-style": ["error","windows"],
        "indent": ["error",4]
    }
};