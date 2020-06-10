import React, { Component, Fragment } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import packageJson from '../../package.json';

import './App.css';
import 'react-toggle/style.css';
import 'react-tabs/style/react-tabs.css';

import Header from './components/Header.jsx';
import MainPage from './components/MainPage.jsx';
import SettingsPage from './components/SettingsPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import TranslationQueue from './components/TranslationRequest.jsx';
import ToolsPage from './components/ToolsPage.jsx';

import { determineState, popupOpened, detectSite, checkLoadedLanguages, changeUILanguage, switchAppDesign } from '../actions';

const mapStateToProps = function(state) {
  return {...state};
}

const MainPageView = connect(mapStateToProps)(MainPage);
const SettingsPageView = connect(mapStateToProps)(SettingsPage);
const ErrorPageView = connect(mapStateToProps)(ErrorPage);
const ToolsPageView = connect(mapStateToProps)(ToolsPage);

class App extends Component {
  _onUILanguageSelectChanged(e) {
    this.props.dispatch(changeUILanguage(e.target.value));
  }

  _onTabSelected(tabIndex) {
    this.props.dispatch({
      type: 'CHANGE_CURRENT_TAB',
      payload: tabIndex
    });
  }

  render() {
    const { t, dispatch } = this.props;
    const showToolsPage = this.props.loadedLanguages.length > 0;
    return (
      <Fragment>
        <TranslationQueue/>
        <Header/>
        <Tabs selectedIndex={this.props.currentTab} onSelect={this._onTabSelected.bind(this)}>
          <TabList>
            <Tab>{t('main')}</Tab>
            <Tab>{t('settings')}</Tab>
            {showToolsPage && (
              <Tab>{t('tools')}</Tab>
            )}
          </TabList>
          <TabPanel>
            <MainPageView/>
          </TabPanel>
          <TabPanel>
            <SettingsPageView/>
          </TabPanel>
          {showToolsPage && (
            <TabPanel>
              <ToolsPageView/>
            </TabPanel>
          )}
        </Tabs>
        <ErrorPageView/>
        <div>
          <br/>
          <div className='new-link' onClick={() => dispatch(switchAppDesign(true))}>Try the redesigned layout!</div>
        </div>
        <div className='footer'>
          <div>
            <div className='ui-icon'/>
            <select value={this.props.uiLanguage} onChange={this._onUILanguageSelectChanged.bind(this)}>
              <option value='en'>English</option>
              <option value='fr'>Français</option>
              <option value='zh-tw'>中文 (繁體)</option>
            </select>
          </div>
          <div>
            <a
              href='https://chrome.google.com/webstore/detail/two-captions-for-youtube/lpeonmjfimoijceaalocpgjjchocbiap'
              rel='noopener noreferrer'
              target='_blank'>
              {t('leave-feedback')}
            </a>
            <a
              href='https://github.com/mikesteele/dual-captions/issues'
              rel='noopener noreferrer'
              target='_blank'>
              {t('report-a-bug')}
            </a>
            <a
              href='https://github.com/mikesteele/dual-captions/'
              rel='noopener noreferrer'
              target='_blank'>
              {t('view-on-github')}
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default translate()(connect(mapStateToProps)(App));