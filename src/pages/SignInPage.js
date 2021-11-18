import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { signIn } from "../backend/auth";
import { toastError } from "./../libs/toast";

const FormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(5, "5 caracteres minimo").required("Required"),
});

const SignInPage = () => {
  const submit = async(values) => {
    const { email, password, remember } = values;

    try {
      await signIn(email, password, remember);
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

            <Formik initialValues={{ email: "", password: "", remember: false }}
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

                  <div className="form-check mb-3">
                    <Field type="checkbox"
                      className="form-check-input"
                      id="remember"
                      name="remember"
                      disabled={isSubmitting} />
                    <label className="form-check-label"
                      htmlFor="remember">
                      Remember me
                    </label>
                  </div>

                  <button type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={isSubmitting}>
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-2 text-end">
              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <div className="mt-4 text-center">
              Don&quot;t have an account?
              {" "}
              <Link to="/sign-up">
                Sign Up
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
