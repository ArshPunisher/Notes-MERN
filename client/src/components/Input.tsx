
interface Props {
  name: string;
  label: string;
  value: string;
  onChange: () => void;
}

const InputPassword = ({ name, label, value, onChange }: Props) => {

  return (
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    </div>
  );
};

export default InputPassword;
