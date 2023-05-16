const inputsData = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      errorMessage: 'Cannot be empty',
      label: 'Name',
      required: true,
    },
    {
      id: 2,
      name: 'bread',
      type: 'text',
      errorMessage: 'Cannot be empty',
      label: 'Bread',
      required: true,
    },
    {
      id: 3,
      name: 'imageUrl',
      type: 'url',
      errorMessage: 'Should be a valid URL',
      label: 'Image URL',
      pattern: '(https://[^"]*?)',
      required: true,
    },
    {
      id: 4,
      name: 'description',
      type: 'text',
      errorMessage: 'Should be at least 50 characters',
      label: 'Description',
      required: true,
    },
  ];
  
  export default inputsData;
  