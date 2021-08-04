// import { SweetAlertOptions } from 'sweetalert2';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';


console.log("init modal lib");

const modal = {

  inputText(value, title, subtitle, validator) {
    return new Promise(async (resolve, reject) => {
      const options = {
        title: title,
        input: 'text',
        inputLabel: subtitle,
        inputValue: value,
        showCancelButton: true,
        confirmButtonText: "Save",
        customClass: "simplepad-swal2",
        inputValidator: validator,
      };

      const response = await Swal.fire(options);
      resolve(response);
    });
  },

  inputTextWithDelete(value, title, subtitle, validator) {
    return new Promise(async (resolve, reject) => {
      const options = {
        title: title,
        input: 'text',
        inputLabel: subtitle,
        inputValue: value,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: "Delete",
        customClass: "simplepad-swal2",
        inputValidator: validator,
      };

      const response = await Swal.fire(options);
      resolve(response);
    });
  },

  success(title, message) {
    this.show("success", title, message);
  },

  error(title, message) {
    this.show("error", title, message);
  },

  warning(title, message) {
    this.show("warning", title, message);
  },

  info(title, message) {
    this.show("info", title, message);
  },

  show(type, title, message) {
    Swal.fire({
      icon: type,
      title: title,
      text: message,
    });
  }
}

export default modal;
