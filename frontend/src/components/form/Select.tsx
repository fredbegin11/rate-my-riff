import { UseFormReturn } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface Props {
  id: string;
  placeholder: string;
  name: string;
  label: string;
  form: UseFormReturn<any>;
  options: Option[];
  required?: boolean;
}

const Select = ({ id, placeholder, name, form, options, required }: Props) => (
  <>
    <select
      id={id}
      className="mt-2 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder={placeholder}
      required={required}
      {...form.register(name)}
    >
      <option disabled selected hidden value="">
        {placeholder}
      </option>
      {options.map(({ label, value }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-2">
      <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </>
);

export default Select;
