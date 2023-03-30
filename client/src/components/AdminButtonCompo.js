import React from 'react'
import InputUnstyled from '@mui/base/InputUnstyled';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { postBtnCompo } from '../service/api';
import axios from 'axios';

const URL = 'http://localhost:8000';
const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#0072E5',
  600: '#00008b',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledTextareaElement = styled('textarea', {
  shouldForwardProp: (prop) =>
    !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
})(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const CustomButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      slots={{ input: StyledInputElement, textarea: StyledTextareaElement }}
      {...props}
      ref={ref}
    />
  );
});

const InitialValues = {
  btnCompo: '',
}

export default function AdminButtonCompo()  {
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`${URL}/buttonComponents`);
      setItems(result.data);
    };
    fetchItems();
  }, []);

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${URL}/buttonComponents/${id}`);
      const updatedItems = items.filter((item) => item._id !== response.data._id);
      setItems(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const [btnCompo, setbtnCompo] = useState(InitialValues);
  
  const postbtnvalue = async () => {
    let response = await postBtnCompo(btnCompo); 
    if(!response) return;
  }
  const onValueChange = (e) => {
    setbtnCompo({ ...btnCompo, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ paddingTop: "55px" }}>
      <div className='container mt-4'>
        <label>Enter Button HTML+CSS</label>
        <CustomInput onChange={(e) => onValueChange(e)} name='btnCompo' aria-label="Demo input" multiline placeholder="Type something…" />
        <CustomButton onClick={() => postbtnvalue()}>Submit</CustomButton>
        <ul>
        {items.map(item => (
          <li key={item._id} style={{paddingRight:30,display: 'inline-block'}}>
            <div style={{margin:10,display: 'inline-block'}} key={item._id} dangerouslySetInnerHTML={{ __html: item.btnCompo }}/>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}