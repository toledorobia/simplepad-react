import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { signUp } from "../backend/auth";
import { toastError, toastSuccess } from "./../libs/toast";

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(5, "5 chars minimum").required("Required"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUpPage = () => {
  const submit = async(values) => {
    const { email, password } = values;

    try {
      await signUp(email, password);
      toastSuccess("Sign up successfully. You need to verify your email address first.");
    }
    catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-4">
            <h1 className="text-center mb-5">
              Simplepad
            </h1>

            <Formik initialValues={{ email: "", password: "", passwordConfirmation: "" }}
              validationSchema={FormSchema}
              onSubmit={submit}>
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="form-floating mb-3">
                    <Field type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="name@example.com"
                      disabled={isSubmitting} />
                    <label htmlFor="email">
                      Email
                    </label>
                    {errors.email && touched.email ? (
                      <div className="form-text text-danger">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      disabled={isSubmitting} />
                    <label htmlFor="password">
                      Password
                    </label>
                    {errors.password && touched.password ? (
                      <div className="form-text text-danger">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-floating mb-3">
                    <Field type="password"
                      name="passwordConfirmation"
                      className="form-control"
                      placeholder="Password confirmation"
                      disabled={isSubmitting} />
                    <label htmlFor="passwordConfirmation">
                      Password Confirmation
                    </label>
                    {errors.passwordConfirmation && touched.passwordConfirmation ? (
                      <div className="form-text text-danger">
                        {errors.passwordConfirmation}
                      </div>
                    ) : null}
                  </div>

                  <button type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={isSubmitting}>
                    Sign Up
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-4 text-center">
              Already have an account?
              {" "}
              <Link to="/">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
