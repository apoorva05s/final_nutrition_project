import { useState } from 'react';
import { SelectDropdown } from '../Reusable/SelectDropdown';

export default function SelectDropdownExample() {
  const [value, setValue] = useState('');
  
  return (
    <div className="p-6 max-w-md">
      <SelectDropdown
        id="diet"
        label="Dietary Preference"
        options={['Vegetarian', 'Vegan', 'Pescatarian', 'No restrictions']}
        value={value}
        onChange={setValue}
        placeholder="Choose your diet"
        required
      />
    </div>
  );
}
