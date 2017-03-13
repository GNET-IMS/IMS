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
    onChange: () => {},
    placeholder: '请输入搜索内容',
    inputWidth: '120px',
    buttonType: 'primary',
  }

  renderSelectOptions = (selectOptions) => {
    return selectOptions.map((item, index) => {
      return <Option key={index} value={item.value}>{item.name}</Option>
    })
  }

  render() {
    const { selectOptions, select, selectDefaultValue, onSearch, inputWidth, placeholder, buttonType, onChange } = this.props;
    return (
      <div className={styles['inputSearch']}>
        <InputGroup compact>
        {
          select ? 
          <Select defaultValue={selectDefaultValue || (selectOptions.length > 0 ? selectOptions[0].value : undefined)}>
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
          }} placeholder={placeholder} onChange={onChange}/>
        </InputGroup>
        <Button type={buttonType} className={styles['search-btn']} onClick={onSearch}>搜索</Button>
      </div>
    );
  }
};

Example.propTypes = {
};

export default Example;
