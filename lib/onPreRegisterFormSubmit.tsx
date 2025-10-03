// TODO: Asegúrate de que estas server actions solo se llamen desde componentes de servidor o formularios con action.
"use server"
import { verify } from 'hcaptcha';

const secretKey = process.env.SECRET_CAPTCHA;

export const onPreRegisterFormSubmit = async (formData: FormData) => {
  try {
    // Obtain the data of deform
    const username = formData.get('username')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    const token = formData.get('captcha')?.toString() || null;
    
    // Check that all fields are present
    if (!username || !email || !password || !token) {
      return { message: 'All fields are required', success: false };
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return { message: 'Invalid email format', success: false };
    }

    if (password.length < 6) {
      return { message: 'Password must be at least 6 characters', success: false };
    }

     // Verify captcha
    const { success } = await verify(secretKey || "", token);
    
    if (!success) {
      return { message: 'Invalid captcha', success: false };
    }

    // If all is valid, you can proceed with the logic of pre-register
    // Here you can add logic for register the user to BBDD

    return { message: 'Registration successful', success: true };
  } catch (error) {
    return { message: 'An error occurred, please try again later.', success: false, error: error };
  }
};