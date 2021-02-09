import { getIn } from "formik";
import React from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";

const onDrop = (files) => {
    let formData = new FormData();
    const config = {
        header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])

    Axios.post('/api/product/uploadImage', config)
}

function fileUpload() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop multiple maxSize>
        {({ getRootProps, getInputProps }) => (
          <div style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: 'scroll'
        }}>

        <div onClick>
            <img></img>
        </div>
      </div>
    </div>
  );
}

export default fileUpload;
