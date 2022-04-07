import axios from 'axios';
import { useState } from 'react';

import { BASE_BACKEND_URL } from 'config/urls';

const getConfig = () => {
  const token = window.localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  };

  return config;
};

const DirectUploadExample = () => {
  const [message, setMessage] = useState();

  const directUploadStart = ({ fileName, fileType }) => {
    return axios.post(
      `${BASE_BACKEND_URL}/api/files/upload/direct/start/`,
      { file_name: fileName, file_type: fileType },
      getConfig()
    );
  };

  const directUploadDo = ({ data, file }) => {
    console.log(data);

    const postData = new FormData();

    for (const key in data?.fields) {
      postData.append(key, data.fields[key]);
    }

    postData.append('file', file);

    let postParams = getConfig();

    // If we're uploading to S3, detach the authorization cookie.
    // Otherwise, we'll get CORS error from S3
    if (data?.fields) {
      postParams = {};
    }

    return axios
      .post(data.url, postData, postParams)
      .then(() => Promise.resolve({ fileId: data.id }));
  };

  const directUploadFinish = ({ data }) => {
    return axios.post(
      `${BASE_BACKEND_URL}/api/files/upload/direct/finish/`,
      { file_id: data.id },
      getConfig()
    );
  };

  const onInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      directUploadStart({
        fileName: file.name,
        fileType: file.type
      })
        .then((response) =>
          directUploadDo({ data: response.data, file })
            .then(() => directUploadFinish({ data: response.data }))
            .then(() => {
              setMessage('File upload completed!');
            })
        )
        .catch((error) => {
          setMessage('File upload failed!');
        });
    }
  };

  return (
    <div>
      <h1>Direct upload</h1>
      <div>Select files to upload:</div>

      <input id="input" type="file" onChange={onInputChange} />

      <div>{message}</div>
    </div>
  );
};

export default DirectUploadExample;
