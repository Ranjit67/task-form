import type { NextPage } from "next";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { BASE_URL, calculateAge } from "../utils";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { push } = useRouter();
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(`${BASE_URL}/country`);
        const res = await result.json();

        setCountry(res?.success?.data?.results);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {};
  }, []);

  const inputArray = [
    {
      name: "email",
      key: 1,
      label: `Email *`,
      initialValue: "",
      type: "text",
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string()
        .required("Field is required")
        .email("Email formate is wrong."),
    },
    {
      name: "firstName",
      key: 2,
      label: `First Name *`,
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 3,
      name: "lastName",
      label: `Last Name *`,
      initialValue: "",
      type: "text",
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },

    {
      key: 4,
      name: "country",
      label: `Country *`,
      initialValue: "",
      options: [
        {
          label: "--select--",
          value: "",
        },
        ...country?.map((item: any) => ({
          label: item?.title,
          value: item?._id,
        })),
      ],
      type: "select",
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 5,
      name: "state",
      label: `State *`,
      initialValue: "",
      options: [
        {
          label: "--select--",
          value: "",
        },
        ...state?.map((item: any) => ({
          label: item?.title,
          value: item?._id,
        })),
      ],

      type: "select",
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 6,
      name: "city",
      label: `City *`,
      initialValue: "",
      options: [
        {
          label: "--select--",
          value: "",
        },
        ...(city?.map((item: any) => ({
          label: item?.title,
          value: item?._id,
        })) || []),
      ],

      type: "select",
      className: "col-span-12 lg:col-span-12",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 7,
      name: "gender",
      label: `Gender *`,
      initialValue: "",
      options: [
        {
          label: "--select--",
          value: "",
        },
        {
          label: "Male",
          value: "MALE",
        },
        {
          label: "Female",
          value: "FEMALE",
        },
      ],
      type: "select",
      validationSchema: Yup.string().required("Field is required"),
    },
    {
      key: 8,
      name: "dateOfBirth",
      label: `Date of Birth *`,
      initialValue: "",

      type: "date",
      validationSchema: Yup.date()
        .required("Field is required")
        .max(
          new Date(
            new Date().getFullYear() - 14,
            new Date().getMonth(),
            new Date().getDate()
          ),
          "Date of birth Must be older than 14 years"
        )
        .min(
          new Date(
            new Date().getFullYear() - 99,
            new Date().getMonth(),
            new Date().getDate()
          ),
          "Date of birth Less than 99 years"
        )
        .test("is-valid-date", "Invalid date format", function (value) {
          return !isNaN(new Date(value).getTime());
        }),
    },
    {
      key: 9,
      name: "age",
      label: `Age`,
      initialValue: "",

      type: "text",
      visibility: false,
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

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values: any, rest) => {
      try {
        console.log(values);
        values.state = (
          state?.find((item: any) => item?._id == values?.state) as any
        )?.title;
        values.city = (
          city?.find((item: any) => item?._id == values?.city) as any
        )?.title;
        values.country = (
          country?.find((item: any) => item?._id == values?.country) as any
        )?.title;

        const result = await fetch(`${BASE_URL}/user/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const res = await result.json();
        if (result.status !== 200) throw new Error(res.error?.message);
        Swal.fire(`success`, res?.message, `success`);
        rest.resetForm();
      } catch (error: any) {
        Swal.fire(`error`, error?.message, `error`);
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(`${BASE_URL}/country`);
        const res = await result.json();

        setCountry(res?.success?.data?.results);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {};
  }, []);

  useEffect(() => {
    (async () => {
      if (!formik?.values?.country) return;
      try {
        const result = await fetch(
          `${BASE_URL}/state?countryId=${formik?.values?.country}`
        );
        const res = await result.json();

        setState(res?.success?.data?.results);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {};
  }, [formik?.values?.country]);
  useEffect(() => {
    (async () => {
      if (!formik?.values?.state) return;
      try {
        const result = await fetch(
          `${BASE_URL}/city?stateId=${formik?.values?.state}`
        );
        const res = await result.json();

        setCity(res?.success?.data?.results);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {};
  }, [formik?.values?.state]);

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

                      formik.setFieldValue(item?.name, e.target?.value);
                    }}
                    name={item?.name}
                    value={formik?.values?.[item?.name]}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:capitalize"
                  >
                    {item?.options?.map((option) => (
                      <option key={option?.label} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                  {formik?.touched?.[item?.name] &&
                    formik?.errors?.[item?.name] && (
                      <p className="text-red-600 text-sm">
                        {formik?.errors?.[item?.name] as string}
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
                    max={new Date().toDateString()}
                    disabled={Boolean(item?.name == "age")}
                    onChange={(e) => {
                      if (item?.name == "dateOfBirth") {
                        const age = calculateAge(new Date(e?.target?.value));
                        formik.setFieldValue("age", age);
                      }

                      formik.handleChange(e);
                    }}
                    value={formik?.values?.[item?.name]}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:capitalize"
                    placeholder={item?.label}
                  />
                  {formik?.touched?.[item?.name] &&
                    formik?.errors?.[item?.name] && (
                      <p className="text-red-600 text-sm">
                        {formik?.errors?.[item?.name] as string}
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
