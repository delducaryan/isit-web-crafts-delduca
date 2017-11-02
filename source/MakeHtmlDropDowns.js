import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import 'whatwg-fetch';

const siteDirs = [];
const destDirs = [];

const styles = {
    customWidth: {
        width: 500,
    },
};

class MakeHtmlDropDowns extends React.Component {

    constructor() {
        super();

        this.state = {
            walk: 'Generate HTML',
            siteDir: 'unknown',
            destDir: 'unknown',
            configSummary: [],
            value: 1
        };
        this.handleSiteDir = this.handleSiteDir.bind(this);
        this.handleDestinationDir = this.handleDestinationDir.bind(this);
    }

    handleSiteDir(event, index, value) {
        this.setState({value: value,
                    siteDir: event.target.innerHTML,
                    destDir: destDirs[value].props.primaryText});
    }

    handleDestinationDir(event, index, value) {
        this.setState({value: value,
                    siteDir: siteDirs[value].props.primaryText});
        destDir: event.target.innerHTML;
    }

    /**
     * @typedef {Object} configSummary
     * @property {Object} siteDirs
     * @property {Object} destinationDirs
     * @property {String} baseDir
     * @property {String} mostRecentDate
     */
    loadConfig() {
        const that = this;
        fetch('/makers/config')
            .then(function(response) {
                return response.json();
            })
            .then(function(configSummary) {
                //console.log('parsed json', JSON.stringify(configSummary, null, 4));
                siteDirs.length = 0;
                destDirs.length = 0;
                configSummary.siteDirs.forEach(function(dir, index) {
                    const showDir = configSummary.baseDir + dir;
                    siteDirs.push(<MenuItem value={index} key={index} primaryText={showDir} />);
                });
                configSummary.destinationDirs.forEach(function(dir, index) {
                    destDirs.push(<MenuItem value={index} key={index} primaryText={dir} />);
                });
            })
            .catch(function(ex) {
                console.log('parsing failed', ex);
            });
    }

    componentDidMount() {
        this.loadConfig();
    }

    render() {
        return <MuiThemeProvider>
            <div>
                <h1>Home Page</h1>
                <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleSiteDir}
                    style={styles.customWidth}
                    autoWidth={false}
                >
                    {siteDirs}
                </DropDownMenu>
                <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleDestinationDir}
                    style={styles.customWidth}
                    autoWidth={false}
                >
                    {destDirs}
                </DropDownMenu>

                <p>This is a DropDown component.</p>
            </div>
        </MuiThemeProvider>;
    };
}

var buttonStyle = {
    margin: '15px'
};

export default MakeHtmlDropDowns;
