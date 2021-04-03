import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'

let editorConfig = {
  toolbar: ['fontfamily', 'fontsize', 'fontcolor', 'bold', 'italic', 'alignment', 'bulletedList', 'indent', 'outdent', 
  'numberedList', 'link', 'blockQuote', 'HtmlEmbed', 'codeblock', 'imageinsert', 'mediaembed', 'undo', 'redo' ],
}

export default function Ckeditor(props) {

  return (
    <div className="Ckeditor">
      <CKEditor
        editor={ ClassicEditor }
        config={ editorConfig }
        onReady={ editor => {
          props.getCKEditor(editor)
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData()
        } }
        onBlur={ ( event, editor ) => {
          console.log( 'Blur.', editor )
        } }
        onFocus={ ( event, editor ) => {
          console.log( 'Focus.', editor )
        } }
      />
    </div>
  )
}