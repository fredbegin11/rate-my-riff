import { UseFormReturn } from 'react-hook-form';
import { LockClosedIcon } from '@heroicons/react/solid';
import prestone from '../../assets/prestone.png';

interface Props {
  form: UseFormReturn<LoginFormProps, object>;
  onSubmit: (values: LoginFormProps) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

export default function LoginForm({ form, error, isLoading, onSubmit }: Props) {
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
                placeholder="Ton password (ou ben ton NAS)"
                {...form.register('password')}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mb-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
            {!isLoading && error && <span className="pt-6 text-rose-700">{error}</span>}
            {isLoading && <span className="pt-6">Ça load, sera pas long...</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
