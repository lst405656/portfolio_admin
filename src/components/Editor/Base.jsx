import { CKEditor } from "@ckeditor/ckeditor5-react";
import PropTypes from 'prop-types';

const BaseEditor = ({ value, onChange, EditorType }) => {
    return (
        <div>
            <CKEditor
                editor={EditorType}
                data={value}
                onChange={(event, editor) => onChange(editor.getData())}
            />
        </div>
    );
};

BaseEditor.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    EditorType: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default BaseEditor;
