import { Select } from 'antd';
import styled from 'styled-components';
// import 'antd/dist/reset.css';

const { Option } = Select;

export const StyledSelect = styled(Select)`
  width: 7rem;
  height: 3rem;
  padding: 0 1rem;
  border-radius: 0.3rem;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.5rem;
`;