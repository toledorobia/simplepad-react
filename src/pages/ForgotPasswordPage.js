import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../providers/AuthProvider";

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPasswordPage = (props) => {
  const { forgotPassword } = useContext(AuthContext);
  const history = useHistory();

  const submit = async (values) => {
    try {
      await forgotPassword(values.email);
      alert('Password reset email sent, check your inbox.');
      

      history.replace("/");

    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-4">
            <Formik
              initialValues={{
                email: "",
                password: "",
                remember: false
              }}
              validationSchema={FormSchema}
              onSubmit={submit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form autoComplete="off">
                  <h1 class="text-center mb-5">Simplepad</h1>
                  <p className="text-center">Please enter your email address to request a password reset.</p>
                  
                  <div className="form-floating mb-3">
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="email">Email</label>
                    {errors.email && touched.email ? (
                      <div className="form-text text-danger">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
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
