/*

Replace this code in public/index.html to see it in action

<!DOCTYPE html>
<html lang="en">
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.1/js.cookie.min.js"></script>

  <script type="text/javascript">
    function getConfig() {
      const token = window.localStorage.getItem('token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Session ${token}`
        },
        withCredentials: true
      };

      return config;
    }

    function getCSRFConfig() {
      const csrf = Cookies.get('csrftoken');

      const config = getConfig();

      return {
        ...config,
        headers: {
          ...config.headers,
          'X-CSRFToken': csrf
        }
      };
    }

    function fileGeneratePresignedPost({ fileName, fileType }) {
      return axios.post(
        'http://localhost:8000/api/files/private-presigned-post/',
        { file_name: fileName, file_type: fileType },
        getCSRFConfig()
      );
    }

    function uploadFile({ data, file }) {

      const postData = new FormData();

      for (const key in data?.fields) {
        postData.append(key, data.fields[key]);
      }
      postData.append('file', file);


      return axios
        .post(data.url, postData, data.params)
        .then(() => Promise.resolve({ fileId: data.identifier }));
    }

    const verifyUpload = ({data}) => {

      return axios.post(
        `http://localhost:8000/api/files/${data.identifier}/verify-upload/`,
        {},
        getCSRFConfig()
      );
    };

    function onChange(files) {
      const file = files[0];


      if (file) {
        fileGeneratePresignedPost({
          fileName: file.name,
          fileType: file.type
        })
          .then((response) => {

            return uploadFile({ data: response.data, file }).then(() => verifyUpload({data: response.data})).then(() => {
              console.log("File upload completed!")
            })

          })
      }
    }
  </script>
  <body>
    <input id="input" type="file" onchange="onChange(files)" />

    <div id="root"></div>
  </body>
</html>

*/

const FilesUploadJsExample = () => {
  return <div>Upload files using Pure JS.</div>;
};

export default FilesUploadJsExample;
