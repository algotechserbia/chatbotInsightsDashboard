import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import SelectAllIcon from 'material-ui/svg-icons/toggle/check-box';
import SelectNoneIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import TimespanStore from '../../stores/TimespanStore';
import TimespanActions from '../../actions/TimespanActions';

import './style.css';

const styles = {
  channels: {
    width: 'auto',
    display: 'inline-block',
    marginLeft: '20px'
  }
}

class Timespan extends Component {
  // static propTypes = {}
  // static defaultProps = {}

  static getStores() {
    return [TimespanStore];
  }

  static getPropsFromStores() {
    return TimespanStore.getState();
  }

  componentDidMount() {
    TimespanActions.update24Hours();
  }

  onTimespanChange(timespan) {
    switch(timespan) {
      case "1 week":
        return TimespanActions.update1Week();
      case "1 month":
        return TimespanActions.update1Month();
      default:
        return TimespanActions.update24Hours();
    }
  }

  channelChecked(channel) {
    TimespanActions.toggleChannel(channel);
  }

  toggleAllChannel(on) {
    TimespanActions.toggleAllChannel(on);
  }

  render() {
    const { timespan, channels, excluded } = this.props;

    var buttons = ["24 hours", "1 week", "1 month"].map((time, idx) => {
      return <FlatButton key={idx} label={time} primary={time === timespan} onClick={this.onTimespanChange.bind(null, time)} />
    })

    var channelBoxes = channels.map(channel => {
        return <Checkbox
                  key={channel}
                  style={styles.channels}
                  label={channel}
                  checked={!excluded.includes(channel)}
                  onCheck={this.channelChecked.bind(null, channel)} />
    });

    var channelActions = channels.length === 0 ? [] : [
        <IconButton key='sel-all' tooltip="Select all channels" onClick={this.toggleAllChannel.bind(null, true)}>
          `<SelectAllIcon color='#555' />
        </IconButton>,
        <IconButton key='sel-non' tooltip="Select no channels" onClick={this.toggleAllChannel.bind(null, false)}>
          <SelectNoneIcon color='#555' />
        </IconButton>
    ];

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          {buttons}
        </ToolbarGroup>
        <ToolbarGroup>
          {channelActions}
          {channelBoxes}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default connectToStores(Timespan);
