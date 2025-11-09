import { useState } from 'react';
import { FormInput } from '../Reusable/FormInput';

export default function FormInputExample() {
  const [value, setValue] = useState('');
  
  return (
    <div className="p-6 max-w-md">
      <FormInput
        id="example"
        label="Email Address"
        type="email"
        value={value}
        onChange={setValue}
        placeholder="you@example.com"
        required
      />
    </div>
  );
}
