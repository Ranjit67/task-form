import type { NextPage } from "next";

import { Field, FieldProps, Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
// import { useState } from "react";
// import Swal from "sweetalert2";
import * as Yup from "yup";

const Home: NextPage = () => {
  const { push } = useRouter();
  const inputArray = [
    {
      name: "E-Mail",
      key: 1,

      label: `Email *`,
      initialValue: "",
      // options: projectType,
      type: "text",
      // loading: projectLoading,
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string()
        .required("Field is required")
        .email("Email formate is wrong."),
    },
    {
      name: "First Name",
      key: 2,

      label: `First Name *`,
      initialValue: "",
      // options: projectType,
      type: "text",
      // loading: projectLoading,
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 3,
      name: "Last Name",
      label: `Last Name *`,
      initialValue: "",
      // options: projectType,
      type: "text",
      // loading: projectLoading,
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },

    {
      key: 4,
      name: "Country",
      label: `Country *`,
      initialValue: "",
      options: [],
      type: "select",
      // loading: projectLoading,
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 5,
      name: "State",
      label: `State *`,
      initialValue: "",
      options: [],
      type: "select",
      // loading: projectLoading,
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 6,
      name: "City",
      label: `City *`,
      initialValue: "",
      options: [],
      type: "select",
      // loading: projectLoading,
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 7,
      name: "Gender",
      label: `Gender *`,
      initialValue: "",
      options: [
        {
          label: "Male",
          value: "Male",
        },
        {
          label: "Female",
          value: "Female",
        },
      ],
      type: "select",
      // loading: projectLoading,
      // className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 8,
      name: "Date of Birth",
      label: `Date of Birth *`,
      initialValue: "",

      type: "date",
      // loading: projectLoading,
      // className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 9,
      name: "Age",
      label: `Age`,
      initialValue: "",

      type: "text",
      visibility: false,
      // loading: projectLoading,
      // className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
  ];

  const initialValues: { [key: string]: string } = inputArray.reduce(
    (accumulator: { [key: string]: string }, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );

  const validationSchema: { [key: string]: Yup.StringSchema } =
    inputArray.reduce(
      (accumulator: { [key: string]: Yup.StringSchema }, currentValue: any) => {
        accumulator[currentValue.name] = currentValue.validationSchema;
        return accumulator;
      },
      {}
    );
  const handleOperation = async (values: any, props: any) => {
    // Swal.fire(`Info`, `Work in progress`, `info`);
    // return;
    // try {
    //   const res = await change(`bd02/bd02-initiation`, {
    //     body: {
    //       projectId: values?.projectList,
    //     },
    //   });
    //   if (res?.status !== 200)
    //     return Swal.fire(
    //       "Error",
    //       res?.results?.msg || "Unable to Submit",
    //       "error"
    //     );
    //   setId((pre) => pre + 1);
    //   Swal.fire(`Success!`, `Task Created Successfully`, `success`);
    // } catch (error) {
    //   Swal.fire(
    //     `Error`,
    //     error instanceof Error ? error?.message : "Something Went Wrong",
    //     `error`
    //   );
    // }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  // console.log(formik?.touched);

  return (
    <div className="flex items-center justify-center w-full p-4 flex-col ">
      <div className="w-full grid grid-cols-1 mb-6">
        <div className="flex items-center justify-center">
          <h2 className="text-blue-600 text-4xl capitalize">Register form</h2>
        </div>
        <div className="flex items-center justify-center md:justify-end sm:mt-4">
          <button
            onClick={() => {
              push("/view");
            }}
            className="hover:ring-2 hover:ring-theme hover:ring-offset-2 flex items-center justify-center capitalize gap-4 px-4 py-2 font-medium tracking-wide w-32 sm:w-28 text-base btn-class rounded-md shadow-xl bg-theme text-white"
          >
            view
          </button>
        </div>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2"
      >
        {inputArray.map((item) => {
          return (
            <div className="flex flex-col gap-1 w-full" key={item?.key}>
              {item?.type === "select" ? (
                <>
                  <label className="text-themeDarkGray text-sm font-semibold capitalize">
                    {item?.label}
                  </label>
                  <select
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      switch (item?.name) {
                        case "Country": {
                          formik.setFieldValue("State", "1");
                          formik.setFieldValue("City", "1");

                          break;
                        }
                        case "State": {
                          formik.setFieldValue("City", "1");

                          break;
                        }
                        default:
                          break;
                      }
                      formik.handleChange(e);
                    }}
                    name={item?.name}
                    value={formik?.values?.[item?.name]}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:capitalize"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                  {formik?.touched?.[item?.name] &&
                    formik?.errors?.[item?.name] && (
                      <p className="text-red-600 text-sm">
                        {formik?.errors?.[item?.name]}
                      </p>
                    )}
                </>
              ) : (
                <>
                  <label className="text-themeDarkGray text-sm font-semibold capitalize">
                    {item?.label}
                  </label>
                  <input
                    name={item?.name}
                    onBlur={formik.handleBlur}
                    type={item?.type}
                    onChange={formik.handleChange}
                    value={formik?.values?.[item?.name]}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:capitalize"
                    placeholder={item?.label}
                  />
                  {formik?.touched?.[item?.name] &&
                    formik?.errors?.[item?.name] && (
                      <p className="text-red-600 text-sm">
                        {formik?.errors?.[item?.name]}
                      </p>
                    )}
                </>
              )}
            </div>
          );
        })}
        <div className="lg:col-span-3 md:col-span-2 col-span-1  flex items-center justify-center">
          <button
            className=" mt-6 hover:ring-2 hover:ring-theme hover:ring-offset-2 flex items-center justify-center capitalize gap-4 px-4 py-2 font-medium tracking-wide w-32 sm:w-28 text-base btn-class rounded-md shadow-xl bg-theme text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
