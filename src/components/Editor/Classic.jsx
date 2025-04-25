import React, { useState } from "react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BaseEditor from "./Base";

const ClassicEditorWrapper = ({ value, onChange }) => {

  return (
    <div>
      <BaseEditor
        value={value}
        onChange={onChange}
        EditorType={ClassicEditor}
      />
    </div>
  );
};

export default ClassicEditorWrapper;