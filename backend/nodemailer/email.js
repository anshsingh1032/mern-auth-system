import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE
} from "./emailTemplates.js";
import { transporter, sender } from "./nodemailer.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
    });
    console.log("Verification email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};
export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Welcome email",
      html:WELCOME_EMAIL_TEMPLATE.replace("{userName}",name)
    });
    console.log("Welcome email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending Welcome email", error);
    throw new Error(`Error sending Welcome email: ${error}`);
  }
};
export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
    });
    console.log("Password reset email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending Password reset email", error);
    throw new Error(`Error sending Password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Password Reset Successful",
      html:PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Password reset email sent successfully", response.messageId);
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};