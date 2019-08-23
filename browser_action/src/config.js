import { default as secondLanguages } from './languages';

const config = {
  defaultSettings: {
    extraSpace: false,
    customColorsEnabled: false,
    customTextColor: '#FFFFFF'
  },
  defaultSecondLanguage: 'none',
  defaultUILanguage: 'en',
  secondLanguages: secondLanguages,
  supportedSites: {
    YouTube: 'stable',
    Netflix: 'beta'
  }
}

export default config;
