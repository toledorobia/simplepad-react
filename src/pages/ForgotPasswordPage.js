import React from "react";
import { Link, useHistory, } from "react-router-dom";
import { Formik, Form, Field, } from "formik";
import * as Yup from "yup";

import { passwordResetEmail, } from "../backend/auth";
import { toastInfo, toastError, } from "./../libs/toast";

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPasswordPage = () => {
  const history = useHistory();

  const submit = async (values) => {
    const { email, } = values;

    try {
      await passwordResetEmail(email);
      toastInfo('Password reset email sent, check your inbox.');
      history.replace("/");
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-4">
            <Formik initialValues={{ email: "", password: "", remember: false, }}
              validationSchema={FormSchema}
              onSubmit={submit}
            >
              {({ errors, touched, isSubmitting, }) => (
                <Form>
                  <h1 className="text-center mb-5">Simplepad</h1>
                  <p className="text-center">Please enter your email address to request a password reset.</p>

                  <div className="form-floating mb-3">
                    <Field type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      disabled={isSubmitting}
                    />
                    <label htmlFor="email">Email</label>
                    {errors.email && touched.email ? (
                      <div className="form-text text-danger">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>

                  <button type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg w-100"
                  >
                    Reset Password
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-4 text-center">
              <Link to="/sign-up">Back</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
