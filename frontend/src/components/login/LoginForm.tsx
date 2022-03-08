import { UseFormReturn } from 'react-hook-form';
import prestone from '../../assets/prestone.png';
import ErrorMessage from '../form/ErrorMessage';
import SubmitButton from '../SubmitButton';

interface Props {
  form: UseFormReturn<LoginFormProps, object>;
  onSubmit: (values: LoginFormProps) => void;
  isLoading: boolean;
  isError: boolean;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

export default function LoginForm({ form, isError, isLoading, onSubmit }: Props) {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-auto w-auto" src={prestone} alt="Workflow" />
        </div>
        <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Ton email"
                {...form.register('email')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Ton password"
                {...form.register('password')}
              />
            </div>
          </div>

          <div>
            <SubmitButton label="S'authentifier" type="Login" isLoading={isLoading} />
            {!isLoading && isError && <ErrorMessage />}
          </div>
        </form>
      </div>
    </div>
  );
}
