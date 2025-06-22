import { useState } from 'react';
import styles from './style.module.scss';
import { EyeOff, Eye } from 'lucide-react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'sonner';

const LoginForm = () => {


    const [passInpType, setPassInpType] = useState('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register, login } = useAuth();

    const { mode } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || `/todos`;

    const entrance = async (e) => {
        e.preventDefault();
        try {
            if(mode === 'register') {
                await register(email, password);
            } else {
                await login(email, password);
            };
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        };
    };


    const toggleInputType = () => {
        const type = passInpType === 'password' ? 'text' : 'password';
        setPassInpType(type);
    };

    return (
        <div className={styles.container}>
            <div className={styles.forTitle}>
                <h1 className={styles.title}>{mode === 'register' ? 'REGISTRATION' : 'SIGN IN'}</h1>
            </div>
            <form className={styles.form}>
                <input 
                    className={styles.email}
                    type='text' 
                    placeholder='Your Email' 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className={styles.pass}>
                    <input 
                        type={passInpType}
                        placeholder='Your password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div 
                        className={styles.forIcon}
                        onClick={toggleInputType}
                    >
                        {
                            passInpType === 'text' ? <EyeOff size={22}/> : <Eye size={22} />
                        }
                    </div>
                </div>
                <button 
                    className={styles.submit}
                    onClick={(e) => entrance(e)}
                >
                    {mode === 'register' ? 'Register' : 'Sign In'}
                </button>
                <p>
                    {mode === 'register' ? 'Already have an account? ' : "Don't have an account yet? "} 
                    <Link to={mode === 'register' ? '/auth/login' : '/auth/register'}>
                        {mode === 'register' ? 'Sign in here' : 'Sign up'}
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;