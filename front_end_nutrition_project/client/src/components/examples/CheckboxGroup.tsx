import { useState } from 'react';
import { CheckboxGroup } from '../Reusable/CheckboxGroup';

export default function CheckboxGroupExample() {
  const [selected, setSelected] = useState<string[]>([]);
  
  return (
    <div className="p-6 max-w-md">
      <CheckboxGroup
        label="Select your allergens"
        options={['Dairy', 'Eggs', 'Gluten', 'Nuts']}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
}
