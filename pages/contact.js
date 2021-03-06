// Next Modules
import Head from "next/head";

// Components
import Header from "@components/Header";
import Footer from "@components/Footer";

// Hooks
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

// Styles
import styles from "@styles/pages/Contact.module.css";

export async function getStaticProps() {
  // Preview Deployments
  var url = `https://${process.env.VERCEL_URL}`;

  // Production
  if (process.env.VERCEL_ENV == "production") {
    url = "https://www.redwilliams.dev";
  }

  // Development
  else if (process.env.NODE_ENV === "development") {
    url = "http://localhost:3000";
  }

  return { props: { url: url } };
}

/**
 * Sets the color for the form button
 * @param {boolean} success The current state of the button (true, false, or undefined)
 * @returns Green if the form was submitted successfully, Red if not, and it's default state, white
 */
function getButtonColor(success) {
  if (success) {
    return "#7eff7e";
  } else if (success === false) {
    return "#ff7e7e";
  }
  return "#f4f4f4";
}

// Message to show when there is a server error
const serverErrorMessage = "Sorry, your message could not be sent";

// Initial state of the Ref object
const initialNullState = {
  name: false,
  email: false,
  subject: false,
  message: false,
};

export default function Contact({ url }) {
  // Is used to determine the state of the asterisks between renders
  const nullFields = useRef(initialNullState);

  // Updates the state when there are null fields, showing the asterisks
  const [hasErrors, setErrors] = useState(false);

  // Sets the success of the submission. Undefined by default
  const [sendSuccessful, setSendSuccessful] = useState();

  // Form hook
  const { register, handleSubmit } = useForm();

  /**
   * Submits the form
   * @param {object} data Form data
   */
  const onSubmit = async (data) => {
    // Reset the null state. On next render, any asterisks will be removed
    nullFields.current = initialNullState;

    // Send the email
    const response = await fetch(`${url}/api/contact`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((data) => {
        // Return the status of the response, message isn't really needed
        return data.ok;
      })
      .catch((error) => console.log(error));

    // Sets the success of the request
    setSendSuccessful(response);
  };

  return (
    <div>
      <Head>
        <title>Contact | Red Williams</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Red Williams, Engineering/Computer Science student based in Blacksburg, Virginia"
        />
        <meta
          name="keywords"
          content="Red Williams,CS,Computer Science,Virginia Tech,Java,Python,HTML,JavaScript,Web Developer"
        />
        <meta name="author" content="Red Williams" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main>
        <Header />
        <div>
          <div className={styles["contact-container"]}>
            <div className={styles["left-col"]}></div>
            <div className={styles["right-col"]}>
              <form
                className={styles["form"]}
                onSubmit={handleSubmit((data) => {
                  if (hasErrors) setErrors(false);
                  var hasMissingFields = false;

                  // Iterate through each field of the null fields
                  Object.keys(nullFields.current).forEach((field) => {
                    // If the form data is missing the field
                    if (!data[`${field}`]) {
                      // Set boolean flag
                      hasMissingFields = true;
                      // Mark field as null
                      nullFields.current[`${field}`] = true;
                    } else {
                      // Mark field as not null
                      nullFields.current[`${field}`] = false;
                    }
                  });

                  // If there were any missing fields
                  if (hasMissingFields) {
                    // Set errors as true, triggering a rerender to show the asterisks
                    setErrors(true);
                    return; // And don't submit the form
                  }
                  onSubmit(data);
                })}
              >
                <div className={styles["form-group"]}>
                  <p
                    className={styles["asterisk"]}
                    style={{
                      visibility: nullFields.current.name
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    *
                  </p>
                  <label className={styles["label"]}>Full Name</label>
                  <input
                    className={styles["input"]}
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    autoComplete="off"
                    {...register("name")}
                  />
                </div>
                <div className={styles["form-group"]}>
                  <p
                    className={styles["asterisk"]}
                    style={{
                      visibility: nullFields.current.email
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    *
                  </p>
                  <label className={styles["label"]}>Email Address</label>
                  <input
                    className={styles["input"]}
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    autoComplete="off"
                    {...register("email", {
                      validate: (email) => {
                        return email.indexOf("@") >= 1;
                      },
                    })}
                  />
                </div>
                <div className={styles["form-group"]}>
                  <p
                    className={styles["asterisk"]}
                    style={{
                      visibility: nullFields.current.subject
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    *
                  </p>
                  <label className={styles["label"]}>Subject</label>
                  <input
                    className={styles["input"]}
                    type="subject"
                    name="subject"
                    placeholder="The Email Subject"
                    autoComplete="off"
                    {...register("subject")}
                  />
                </div>
                <div className={styles["form-group"]}>
                  <p
                    className={styles["asterisk"]}
                    style={{
                      visibility: nullFields.current.message
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    *
                  </p>
                  <label className={styles["label"]}>Message</label>
                  <textarea
                    className={styles[("input", "textarea")]}
                    name="message"
                    placeholder="Your Message"
                    rows="6"
                    {...register("message")}
                  />
                </div>
                <div className={styles["submit"]}>
                  <button
                    className={styles["button"]}
                    style={{ color: getButtonColor(sendSuccessful) }}
                    type="submit"
                    value="Submit"
                    disabled={sendSuccessful}
                  >
                    {sendSuccessful ? "Sent" : "Send"}
                  </button>
                  <div
                    className={styles["confirm-message"]}
                    style={{
                      visibility:
                        sendSuccessful !== false ? "hidden" : "visible",
                    }}
                  >
                    <p>{serverErrorMessage}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
