import React, { Component } from 'react';
import { Input, Select, Button } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
import styles from './index.css';

class Example extends Component {

  static defaultProps = {
    selectOptions: [],
    select: false,
    selectDefaultValue: undefined,
    onSearch: () => {},
    onTextChange: () => {},
    onSelectChange: () => {},
    placeholder: '请输入搜索内容',
    inputWidth: '120px',
    buttonType: 'primary',
  }

  state = {
    textValue: "",
    selectValue: "",
  }

  componentDidMount() {
    const { selectDefaultValue, selectOptions } = this.props;
    if (selectOptions.length > 0) {
      this.setState({selectValue: selectOptions[0].value});
    }
  }
  

  onTextChange = e => {
    const value = e.target.value;
    const { onTextChange } = this.props;
    this.setState({textValue: value}, () => {
      onTextChange(value);
    });
  }

  onSelectChange = (value) => {
    const { onSelectChange } = this.props;
    this.setState({selectValue: value}, () => {
      onSelectChange(value);
    })
  }

  renderSelectOptions = (selectOptions) => {
    return selectOptions.map((item, index) => {
      return <Option key={index} value={item.value}>{item.name}</Option>
    })
  }

  render() {
    const { selectOptions, select, selectDefaultValue, onSearch, inputWidth, placeholder, buttonType } = this.props;
    const { textValue, selectValue } = this.state;
    return (
      <div className={styles['inputSearch']}>
        <InputGroup compact>
        {
          select ? 
          <Select defaultValue={selectDefaultValue || (selectOptions.length > 0 ? selectOptions[0].value : undefined)} onChange={this.onSelectChange}>
            {
              this.renderSelectOptions(selectOptions)
            }
          </Select>
          :
          ''
        }
          <Input style={{
            borderRadius: 0,
            width: inputWidth
          }} placeholder={placeholder} onChange={this.onTextChange}/>
        </InputGroup>
        <Button type={buttonType} className={styles['search-btn']} onClick={() => onSearch(textValue, selectValue)}>搜索</Button>
      </div>
    );
  }
};

export default Example;
