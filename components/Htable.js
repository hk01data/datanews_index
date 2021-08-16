import React from 'react';
import ReactDOM from 'react-dom';
import { HotTable } from '@handsontable/react';

class HotApp extends React.Component {
  tableRef = React.createRef();

  constructor(props) {
    super(props);
    // this.data = [
    //   ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
    //   ['2019', 10, 11, 12, 13],
    //   ['2020', 20, 11, 14, 13],
    //   ['2021', 30, 15, 12, 13]
    // ];
    this.data = props.data;
  }

  componentDidMount() {
    // console.log('Table ref', this.tableRef.current)
  }

  render() {
    return (<HotTable ref={this.tableRef} data={this.data} colHeaders={true} rowHeaders={true} width="660" />);
  }
}

export default HotApp;
