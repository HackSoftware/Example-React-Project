import axios from 'axios';
import { useState } from 'react';

import { BASE_BACKEND_URL } from 'config/urls';
import { getConfig } from 'config/api';

const StandardUploadExample = () => {
  const [message, setMessage] = useState();

  const uploadFile = ({ file }) => {
    const postData = new FormData();

    postData.append('file', file);

    const url = `${BASE_BACKEND_URL}/api/files/upload/standard/`;
    return axios.post(url, postData, getConfig());
  };

  const onInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      uploadFile({ file })
        .then((response) => {
          console.log(response);
          setMessage('File upload completed!');
        })
        .catch((error) => {
          setMessage('File upload failed!');
        });
    }
  };

  return (
    <div>
      <h1>Standard upload example!</h1>
      <div>Select files to upload:</div>

      <input id="input" type="file" onChange={onInputChange} />

      <div>{message}</div>
    </div>
  );
};

export default StandardUploadExample;
