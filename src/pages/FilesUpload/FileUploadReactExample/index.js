import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

import { BASE_BACKEND_URL } from 'config/urls';

const FileUploadReactExample = () => {
  const [message, setMessage] = useState();

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

  const getCSRFConfig = () => {
    const csrf = Cookies.get('csrftoken');

    const config = getConfig();

    return {
      ...config,
      headers: {
        ...config.headers,
        'X-CSRFToken': csrf
      }
    };
  };

  const fileGeneratePresignedPost = ({ fileName, fileType }) => {
    return axios.post(
      `${BASE_BACKEND_URL}/api/files/upload/pass-thru/start/`,
      { file_name: fileName, file_type: fileType },
      getCSRFConfig()
    );
  };

  const uploadFile = ({ data, file }) => {
    const postData = new FormData();

    for (const key in data?.fields) {
      postData.append(key, data.fields[key]);
    }

    postData.append('file', file);

    let postParams = getCSRFConfig();

    // If we're uploading to S3, detach the authorization cookie.
    if (data?.fields) {
      postParams = {};
    }

    return axios
      .post(data.url, postData, postParams)
      .then(() => Promise.resolve({ fileId: data.id }));
  };

  const verifyUpload = ({ data }) => {
    return axios.post(
      `${BASE_BACKEND_URL}/api/files/upload/pass-thru/finish/`,
      { file_id: data.id },
      getCSRFConfig()
    );
  };

  const onInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      fileGeneratePresignedPost({
        fileName: file.name,
        fileType: file.type
      })
        .then((response) =>
          uploadFile({ data: response.data, file })
            .then(() => verifyUpload({ data: response.data }))
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
      <h1>Pass-thru upload</h1>
      <div>Select files to upload:</div>

      <input id="input" type="file" onChange={onInputChange} />

      <div>{message}</div>
    </div>
  );
};

export default FileUploadReactExample;
