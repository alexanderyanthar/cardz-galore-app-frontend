import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { toast } from 'react-toastify';



const SignupForm = () => {
    let navigate = useNavigate();

    const handleSignup = async (formData) => {
        const { username, password } = formData;
        
        // Regex requirements for username and password
        const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+"';\[\]])[A-Za-z\d!@#$%^&*()_+"';\[\]]{8,}$/;



        if (!usernameRegex.test(username)) {
            toast.error('Username must be 4-16 characters long and can only contain letters, numbers, and underscores')
            return;
        }

        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character.');
            return;
        }

        try {
            const response = await axios.post('https://cardz-galore-app-backend-cb5253dcc4a1.herokuapp.com/api/signup', { username, password });

            if (response.status === 201) {
                navigate('/login');

                toast.success("Signup successful! Please log in.")
            }

        } catch (err) {
            console.error('Error signing up:', err);
            if (err.response && err.response.status === 400 && err.response.data === 'Username already taken') {
                toast.error('Username is already taken. Please choose a different username.');
            } else {
                toast.error('An error occurred while signing up. Please try again later.');
            }
        }
    };

    const signupFields = [
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Password', name: 'password', type: 'password' },
    ]

  return (
    <AuthForm fields={signupFields} onSubmit={handleSignup} buttonLabel='Signup' />
  )
}

export default SignupForm