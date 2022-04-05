// See FilesUploadJsExample file if you want to have this code in pure html

import DirectUploadExample from './Direct';
import FileUploadReactExample from './FileUploadReactExample';

const UploadFiles = () => {
  return (
    <div>
      {false && <DirectUploadExample />}
      {true && <FileUploadReactExample />}
    </div>
  );
};

export default UploadFiles;
