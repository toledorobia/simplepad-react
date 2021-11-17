// import { SweetAlertOptions } from 'sweetalert2';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const show = (type, title, message) => {
  Swal.fire({
    icon: type,
    title: title,
    text: message,
  });
};

export const modalLoading = (message = "Please wait...", title = "Loading") => {
  const options = {
    title: title,
    text: message,
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
    customClass: "simplepad-swal2",
    didOpen: () => {
      Swal.showLoading();
    },
  };

  Swal.fire(options);
};

export const modalClose = () => {
  Swal.hideLoading();
  Swal.close();
};

export const modalInput = (value, title, subtitle, validator) => {
  return new Promise(async (resolve) => {
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
};

export const modalInputWithDelete = (value, title, subtitle, validator) => {
  return new Promise(async (resolve) => {
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
};

export const modalConfirm = (title, text) => {
  return new Promise(async (resolve) => {
    const options = {
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: "Yes",
      customClass: "simplepad-swal2",
    };

    const response = await Swal.fire(options);
    resolve(response);
  });
};

export const modalSuccess = (title, message) => {
  show("success", title, message);
};

export const modalError = (title, message) => {
  show("error", title, message);
};

export const modalWarning = (title, message) => {
  show("warning", title, message);
};

export const modalInfo = (title, message) => {
  show("info", title, message);
};
