import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InfoDropdown from './InfoDropdown';
import { find, get, has, replace } from 'lodash';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const styles = {
  humanName: {
    'display': 'flex',
    'flex-direction': 'row',
    'align-items': 'baseline',
    'justify-content': 'space-between'
  },
  humanNamePanel: {
    'display': 'flex',
    'align-items': 'center'
  },
  humanNameLabel: {
    'font-family': 'Helvetica',
    'font-size': '48px',
    "font-style": "normal",
    "font-weight": 400,
    "color": "rgb(36, 59, 83)",
    "& p": {
      "margin-top":0,
      right:0,
    }
  },
  humanNameMenuHeader: {
    'font-family': 'Helvetica',
    'font-size': '20px',
    'color': '#243B53',
    'margin-left': '5%',
    'margin-bottom': '3%'
  },
  humanNameField: {
    'display': 'flex',
    'flex-direction': 'row',
    'text-transform': 'capitalize'
  },
  humanNameTableLabel: {
    'font-family': 'Source Sans Pro',
    'font-size': '16px',
    'color': '#486581',
    'margin-left': '15px',
    'min-width': '80px'
  },
  humanNameDetails: {
    'display': 'flex',
    'flex-direction': 'column',
    'text-transform': 'capitalize'
  },
  humanNameTableName: {
    'font-family': 'Helvetica',
    'font-size': '16px',
    'font-weight': 'bold',
    'color': '#243B53'
  },
  humanNameTablePeriod: {
    'font-family': 'Source Sans Pro',
    'font-size': '14px',
    'color': '#829AB1',
  },
  iconInfo: {
    'color': '#D3D3D3' // Be nice if we could use some preprocessor to render variables real soon. 
  }
};

class HumanName extends PureComponent {
    constructor(props) {
      super(props);
      this.patientName = find(get(this.props, 'humanName'), name => name.use === 'usual').text || find(get(this.props, 'humanName'), name => name.use === 'official').text;
      this.fullNames = get(this.props, 'humanName').map(nameRecord => nameRecord.text || this.nameConcatenator(nameRecord));
    };
    
    nameConcatenator(nameRecord) {
        return (replace(get(nameRecord, 'prefix', []), /,/g, ' ') + ' ' + 
        replace(get(nameRecord, 'given', []), /,/g, ' ') + ' ' +
        get(nameRecord, 'family', '') + ' ' +
        replace(get(nameRecord, 'suffix', []), /,/g, ' ')).trim();
    }

    menuGenerator(nameRecords) {
      const menuList = nameRecords.map((nameRecord, index) => 
        <div key={'humanName' + index} className={this.props.classes.humanNameField}>
          <div className={this.props.classes.humanNameTableLabel}>
            {get(nameRecord, 'use', 'N/A')}
          </div>
          <div className={this.props.classes.humanNameDetails}>
            <div className={this.props.classes.humanNameTableName}>
              {this.fullNames[index]}
            </div>
            <div className={this.props.classes.humanNameTablePeriod}>
              {moment(get(nameRecord, 'period.start')).format('MM/DD/YYYY')} to {has(nameRecord, 'period.end') ?
                moment(get(nameRecord, 'period.end')).format('MM/DD/YYYY') :
                'Present'}
            </div>
          </div>
        </div>); 
        menuList.unshift(
          <div className={this.props.classes.humanNameMenuHeader}
            key='additionalNames'>
            Additional Names
          </div>);
        return menuList;
    }
    
    render() {
      return(
        <div className={this.props.classes.humanName}>
            <div className={this.props.classes.humanNamePanel}>
              <label className={this.props.classes.humanNameLabel}>
                  {this.patientName}
              </label>
              <InfoDropdown>
                {this.menuGenerator(get(this.props, 'humanName'))}
              </InfoDropdown>
            </div>
            <FontAwesomeIcon icon={faInfoCircle} className={this.props.classes.iconInfo + ' fas fa-info-circle fa-2x fa icon-info'} title={get(this.props, 'nameInfo')}/>
        </div>
      );
    }
  }

  HumanName.propTypes = {
    humanName: PropTypes.array,
    nameInfo: PropTypes.string,
}
  
export default withStyles(styles)(HumanName);