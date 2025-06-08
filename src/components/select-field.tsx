import React from "react";

interface Option {
  id: string | number;
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

const PLACE_HOLDER_VALUE = "PLACE_HOLDER";

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  placeholder,
  options,
  onChange,
  className,
}) => {
  const handleOnChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <div className={className}>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <div className="border rounded-md mt-1">
        <select
          required
          name={id}
          id={id}
          className="w-full px-2 py-3 border-r-12 border-r-transparent rounded-md"
          defaultValue={PLACE_HOLDER_VALUE}
          onChange={handleOnChange}
        >
          <option value={PLACE_HOLDER_VALUE} hidden disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
