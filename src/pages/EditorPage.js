import { useState } from "react";
import { Formik, Form, Field } from "formik";

const EditorPage = () => {
  console.log("Editor page");

  const submit = (values) => {
    console.log(values);
  }

  const onKeyDown = (e) => {
    // console.log(e);

    let t = e.target;
    let start = t.selectionStart;
    let end = t.selectionEnd;
    let direction = t.selectionDirection;
    console.log(start, end, t.selectionDirection);

    if (e.which == 9) {
      e.preventDefault();
      if (start == end) {
        t.value = t.value.substring(0, start) + "\t" + t.value.substring(end);
        t.selectionStart = t.selectionEnd = start + 1;
      }
      else {
        let sub = t.value.substring(start, end).replace('\n', '\n\t');
        
        //console.log(t.value.substring(0, start), t.value.substring(start, end), t.value.substring(end));
        t.value = t.value.substring(0, start) + "\t" + sub + t.value.substring(end);
        
        if (direction == 'backward') {
          console.log("set cursor back");
          t.setSelectionRange(start + 1, start + 1);
        }
        else if (direction == 'forward') {
          let newTabs = sub.split('\n').length + end;
          t.setSelectionRange(newTabs, newTabs);
        }
      }
    }
    else if (e.which == 13 && start == end) {
      e.preventDefault();

      console.log(t.value.substring(0, end));

      let indexLastNewLine = t.value.substring(0, end).lastIndexOf('\n');
      let lastLineStartWithTab = false;
      if (indexLastNewLine == -1 && t.value.startsWith('\t')) {
        lastLineStartWithTab = true;
      }
      else if (indexLastNewLine >= 0 && t.value.indexOf('\t', indexLastNewLine) == (indexLastNewLine + 1)) {
        lastLineStartWithTab = true;
      }

      let tabs = 0;
      indexLastNewLine += 1;
      console.log("indexLastNewLine", indexLastNewLine);
      if (lastLineStartWithTab) {
        while (t.value[indexLastNewLine] == '\t') {
          tabs += 1;
          indexLastNewLine += 1;
        }
      }

      console.log("tabs", tabs, 'asdasd' + '\t'.repeat(tabs) + 'asdasd');
      t.value = t.value.substring(0, start) + '\n' + '\t'.repeat(tabs) + t.value.substring(end);
      t.setSelectionRange(start + tabs + 1, end + tabs + 1);
      // t.value += '\n' + '\t'.repeat(tabs);
    }
  }

  return <>
    <Formik
      initialValues={{
        content: 'asdasda\nzxczxczxc\nwerwerw\n456456456',
      }}
      onSubmit={submit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form onKeyDown={onKeyDown}>
          <Field name="content" className="custom-ta" as="textarea" />

          {/* <Field name="content" >
             {({
               field, // { name, value, onChange, onBlur }
               form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
               meta,
             }) => (
               <div>
                 <textarea className="custom-ta" {...field}></textarea>
               </div>
             )}
           </Field> */}

           <input type="submit" />
        </Form>
      )}
    </Formik>
  </>
}

export default EditorPage;