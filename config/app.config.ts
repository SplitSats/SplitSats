import { config as dotenvConfig } from 'dotenv'
import type { ExpoConfig } from 'expo/config'

import { version } from './../package.json'

type AppVariant = 'preview' | 'prod' | 'dev' | undefined

function nodeEnvShort(): 'test' | AppVariant {
	if (!process?.env?.NODE_ENV) {
		process.env.NODE_ENV = 'development'
		return
	}
	if (process?.env?.NODE_ENV === 'production') { return 'prod' }
	if (process?.env?.NODE_ENV === 'development') { return 'dev' }
	if (process?.env?.NODE_ENV === 'test') { return 'test' }
	if (process?.env?.NODE_ENV === 'preview') { return 'preview' }
}

function appVariant(): AppVariant {
	if (!process?.env?.APP_VARIANT) {
		process.env.APP_VARIANT = 'dev'
		return
	}
	if (process?.env?.APP_VARIANT === 'prod') { return 'prod' }
	if (process?.env?.APP_VARIANT === 'dev') { return 'dev' }
	if (process?.env?.APP_VARIANT === 'preview') { return 'preview' }
}

const _appVariant = appVariant() || process?.env?.APP_VARIANT || 'dev'

const _nodeEnvShort = nodeEnvShort()

try {
	dotenvConfig({ path: `.env${_nodeEnvShort === 'prod' ? '' : `.${nodeEnvShort()}`}` })
} catch (e) {
	try {
		dotenvConfig({ path: `envs/.env${_nodeEnvShort === 'prod' ? '' : `.${nodeEnvShort()}`}` })
	} catch (e) { console.log('dotenv error:', e) } // eslint-disable-line no-console
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const IS_DEV = _appVariant === 'dev'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const IS_PREVIEW = _appVariant === 'preview'
const IS_PROD = _appVariant === 'prod'

const cameraPermission = 'Allow splitsats to access camera.'

const config: ExpoConfig = {
	name: `splitsats${!IS_PROD ? ` (${_appVariant})` : ''}`,
	slug: 'splitsats',
	owner: 'splitsats',
	privacy: 'public',
	platforms: [
		'ios',
		'android',
	],
	version: `${version}${!IS_PROD ? `-${_appVariant}` : ''}`,
	scheme: 'cashu',
	orientation: 'portrait',
	icon: './assets/logo/Splitsats_Logo_W.png',
	userInterfaceStyle: 'automatic',
	splash: {
		image: './assets/logo/Splitsats-nobg_B.png',
		resizeMode: 'contain',
		backgroundColor: '#FFFFFF'
	},
	assetBundlePatterns: ['**/*'],
	plugins: [
		'expo-localization',
		['expo-barcode-scanner', { cameraPermission }],
		['expo-camera', { cameraPermission }],
		["expo-image-picker", { "photosPermission": "The app accesses your photos to let you share them with your friends." }],
		'sentry-expo',
		'expo-updates'
	],
	ios: {
		supportsTablet: false,
		infoPlist: {
			LSApplicationQueriesSchemes: ['cashu']
		},
		config: {
			usesNonExemptEncryption: false
		},
		bundleIdentifier: 'com.splitsats.splitsats'
	},
	android: {
		icon: './assets/logo/Splitsats-nobg_B.png',
		adaptiveIcon: {
			foregroundImage: './assets/logo/Splitsats-nobg_B.png',
			backgroundImage: './assets/logo/Splitsats-nobg_B.png'
		},
		package: `com.splitsats.splitsats${!IS_PROD ? `.${_appVariant}` : ''}`
	},
	web: {
		favicon: './assets/favicon.png'
	},
	extra: {
		eas: { projectId: '5816ef53-b3c2-4139-8278-70faaeec8980' },
		DEBUG: process?.env?.DEBUG,
		APP_VARIANT: _appVariant,
		NODE_ENV: process?.env?.NODE_ENV,
		NODE_ENV_SHORT: _nodeEnvShort,
		SENTRY_DSN: process?.env?.SENTRY_DSN,
		SENTRY_ORG: process?.env?.SENTRY_ORG,
		SENTRY_PROJECT: process?.env?.SENTRY_PROJECT
	},
	hooks: {
		postPublish: [
			{
				file: 'sentry-expo/upload-sourcemaps',
				config: {
					organization: process?.env?.SENTRY_ORG,
					project: process?.env?.SENTRY_PROJECT
				}
			}
		]
	},
	updates: {
		enabled: false,
		url: 'https://u.expo.dev/5816ef53-b3c2-4139-8278-70faaeec8980'
	},
	runtimeVersion: {
		policy: 'sdkVersion'
	}
}

export default config