module.exports = {
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint",
		"react-hooks"
	],
	"extends": [
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"rules": {
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"react/prop-types": "off",
		"quotes": [
			"error",
			"double"
		],
		"indent": [
			"error",
			"tab",
			{ "SwitchCase": 1 }
		],
		"semi": [
			"error",
			"always"
		],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"react/no-unescaped-entities": "off"
	},
	"settings": {
		"react": {
			"pragma": "React",
			"version": "detect"
		}
	}
};
